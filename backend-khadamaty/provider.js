import { ServiceProvider, Service, Request } from "./schemas.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

async function sendOTP(otp, email) {
    console.log("Sending OTP to", otp, email);
    try {
        const mailOptions = {
            from: `"Khadamaty" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your OTP from Khadamaty (Provider)",
            html: ` <div style="font-family: sans-serif; background-color: #f7f8fc; padding: 40px; text-align: center;">
                <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 24px; box-shadow: 0 20px 60px rgba(15, 27, 64, 0.08);">
                    <h1 style="color: #2a4dd0; margin-bottom: 24px; font-family: sans-serif;">Khadamaty</h1>
                    <p style="color: #4b5563; font-size: 16px; margin-bottom: 32px; line-height: 1.5;">
                        Use the following One-Time Password (OTP) to complete your verification.<br>
                        This code will expire in 1 minute.
                    </p>
                    <div style="background-color: #eef2ff; padding: 20px; border-radius: 12px; display: inline-block; margin-bottom: 32px;">
                        <span style="font-size: 32px; font-weight: bold; color: #2a4dd0; letter-spacing: 4px;">${otp}</span>
                    </div>
                    <p style="color: #6b7280; font-size: 14px; margin-top: 24px;">
                        If you didn't request this code, please ignore this email.
                    </p>
                    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e4e8f3;">
                        <p style="color: #9ca3af; font-size: 12px;">&copy; ${new Date().getFullYear()} Khadamaty. All rights reserved.</p>
                    </div>
                </div>
            </div>`
        };
        await transporter.sendMail(mailOptions);
        return true;
    } catch (err) {
        console.error("Error sending provider OTP email", err);
        return false;
    }
}

export async function handleProviderSignup(req, res) {
    try {
        const { name, email, password, phone, nationalID } = req.body;
        const found = await ServiceProvider.findOne({ email });
        if (found) {
            return res.status(400).json({ message: "This email is already registered" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minute expiry to allow for email delays
        const provider = new ServiceProvider({ name, email, password: hashedPassword, phone, nationalID, otp, otpExpiry, isVerified: false });
        await provider.save();

        // Respond immediately so the frontend can navigate, then attempt to send the email in the background
        res.status(201).json({ message: "Provider created. Check email for OTP.", providerId: provider._id });

        // Fire-and-forget OTP email; log failures but don't block the client
        sendOTP(otp, email).catch((err) => {
            console.error("Error sending provider OTP email", err);
        });
    } catch (err) {
        console.error("Provider signup error", err);
        res.status(500).json({ message: "Error signing up provider" });
    }
}

export async function verifyProviderOtp(req, res) {
    try {
        const { id, otp } = req.body;
        const provider = await ServiceProvider.findOne({ _id: id, otp, otpExpiry: { $gt: Date.now() } });
        if (!provider) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }
        provider.isVerified = true;
        provider.otp = null;
        provider.otpExpiry = null;
        await provider.save();
        res.status(200).json({ message: "Provider verified", provider: provider });
    } catch (err) {
        res.status(500).json({ message: "Error verifying OTP" });
    }
}

export async function handleProviderSignin(req, res) {
    try {
        const { email, password } = req.body;
        // Don't filter by isApproved: true in the query immediately, find the user first
        const provider = await ServiceProvider.findOne({ email });

        if (!provider) return res.status(400).json({ message: "Invalid email" });

        const isPasswordValid = await bcrypt.compare(password, provider.password);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid password" });

        if (!provider.isVerified) return res.status(403).json({ message: "Provider not verified yet" });

        // New Approval Check
        if (!provider.isApproved) {
            return res.status(403).json({
                message: "Provider not approved yet",
                code: "NOT_APPROVED"
            });
        }

        if (provider.isRejected) {
            return res.status(403).json({
                message: "Provider rejected",
                code: "REJECTED"
            });
        }

        res.status(200).json({ message: "Provider signed in successfully", providerId: provider._id, provider });
    } catch (err) {
        res.status(500).json({ message: "Error signing in provider" });
    }
}

// CRUD for provider's services
export async function getProviderServices(req, res) {
    try {
        const { providerId } = req.query;
        if (!providerId) return res.status(400).json({ message: "providerId required" });
        const services = await Service.find({ providerId });
        res.status(200).json({ services });
    } catch (err) {
        res.status(500).json({ message: "Error fetching provider services" });
    }
}

export async function createProviderService(req, res) {
    try {
        const { providerId } = req.query;
        const { name, category, description, price, priceType, image } = req.body;
        if (!providerId) return res.status(400).json({ message: "providerId required" });
        const service = new Service({ name, category, description, price, priceType, image, providerId });
        await service.save();
        res.status(201).json({ message: "Service created", service });
    } catch (err) {
        res.status(500).json({ message: "Error creating service" });
    }
}

export async function updateProviderService(req, res) {
    try {
        const { serviceId } = req.params;
        const { name, category, description, price, priceType, image } = req.body;
        const service = await Service.findByIdAndUpdate(
            serviceId,
            { name, category, description, price, priceType, image, updatedAt: Date.now() },
            { new: true }
        );
        if (!service) return res.status(404).json({ message: "Service not found" });
        res.status(200).json({ message: "Service updated", service });
    } catch (err) {
        res.status(500).json({ message: "Error updating service" });
    }
}

export async function deleteProviderService(req, res) {
    try {
        const { serviceId } = req.params;
        const result = await Service.findByIdAndDelete(serviceId);
        if (!result) return res.status(404).json({ message: "Service not found" });
        res.status(200).json({ message: "Service deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting service" });
    }
}

// Provider requests/jobs management
export async function getProviderRequests(req, res) {
    try {
        const { providerId, status } = req.query;
        if (!providerId) return res.status(400).json({ message: "providerId required" });
        // Find all provider services
        const services = await Service.find({ providerId }, { _id: 1 });
        if (!services.length) return res.status(200).json({ requests: [] });
        const serviceIds = services.map(s => s._id);
        // Find requests for those services
        const statusFilter = status ? { status } : {};
        const requests = await Request.find({ serviceId: { $in: serviceIds }, ...statusFilter });
        res.status(200).json({ requests });
    } catch (err) {
        res.status(500).json({ message: "Error fetching provider requests" });
    }
}

export const getPendingRequests = async (req, res) => {
    try {
        const { providerId } = req.query;
        if (!providerId) {
            return res.status(400).json({ message: "providerId required" });
        }

        const services = await Service.find({ providerId }, { _id: 1 });
        const requests = [];

        for (const service of services) {
            const found = await Request.find({
                serviceId: service._id,
                status: "pending",
            });
            requests.push(...found); // spread so it's a flat array
        }

        console.log(requests);
        res.status(200).json({ requests });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching pending requests" });
    }
};

export const getActiveRequestsSP = async (req, res) => {
    try {
        const { providerId } = req.query;
        if (!providerId) {
            return res.status(400).json({ message: "providerId required" });
        }

        const services = await Service.find({ providerId }, { _id: 1 });
        const requests = [];

        for (const service of services) {
            const found = await Request.find({
                serviceId: service._id,
                status: { $in: ["active", "in progress"] },
            });
            requests.push(...found); // spread so it's a flat array
        }

        console.log(requests);
        res.status(200).json({ requests });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching pending requests" });
    }
};

export const getPastRequestsSP = async (req, res) => {
    try {
        const { providerId } = req.query;
        if (!providerId) {
            return res.status(400).json({ message: "providerId required" });
        }

        const services = await Service.find({ providerId }, { _id: 1 });
        const requests = [];

        for (const service of services) {
            const found = await Request.find({
                serviceId: service._id,
                status: { $in: ["cancelled", "completed"] },
            });
            requests.push(...found); // spread so it's a flat array
        }

        console.log(requests);
        res.status(200).json({ requests });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching pending requests" });
    }
};





export async function getProviderServiceById(req, res) {
    try {
        const { serviceId } = req.params;
        const service = await Service.findById(serviceId);
        if (!service) return res.status(404).json({ message: "Service not found" });
        res.status(200).json({ service });
    } catch (err) {
        res.status(500).json({ message: "Error fetching service" });
    }
}

export async function updateProviderRequestStatus(req, res) {
    try {
        const { requestId } = req.params;
        const { status } = req.body;
        const requestObj = await Request.findByIdAndUpdate(requestId, { status, updatedAt: Date.now() }, { new: true });
        if (!requestObj) return res.status(404).json({ message: "Request not found" });
        res.status(200).json({ message: "Request status updated", request: requestObj });
    } catch (err) {
        res.status(500).json({ message: "Error updating request status" });
    }
}
