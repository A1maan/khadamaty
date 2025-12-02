import { Customer } from "./schemas.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { Service } from "./schemas.js";
import dotenv from "dotenv";
import { Request } from "./schemas.js";
import { request } from "express";
import { SavedService } from "./schemas.js";

dotenv.config();
export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});



export async function handleSignup(req, res) {
    try {
        const { name, email, password, phone } = req.body;
        const found = await Customer.findOne({ email: email });
        if (found) {
            return res.status(400).json({
                success: false,
                message: "This email is already registered",
                data: null
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 60 * 1000); // 1 minute expiry
        const customer = new Customer({ name, email, password: hashedPassword, phone, otp, otpExpiry });
        await customer.save();
        console.log("DEV MODE - Generated OTP:", otp);
        res.status(201).json({ message: "Customer created successfully", customerId: customer._id });
        await sendOTP(customer.otp, customer.email); // Call the sendOTP function
    } catch (error) {
        console.error("Error creating customer:", error);
        res.status(500).json({ message: "Error creating customer" });
    }
}

export async function handleSigniIn(req, res) {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email: email });
    if (!customer) {
        return res.status(400).json({ message: "Invalid email" });
    }
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
    }
    res.status(200).json({ message: "Customer signed in successfully" });
}


function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

export async function sendOTP(otp, email) {
    try {
        const mailOptions = {
            from: `"Khadamaty" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your OTP from Khadamaty",
            html: `
            <div style="font-family: sans-serif; background-color: #f7f8fc; padding: 40px; text-align: center;">
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
            </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.messageId);

        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
}

export async function verifyOtp(req, res) {
    try {
        const { id, otp } = req.body;
        const customer = await Customer.findOne({ _id: id, otp: otp, otpExpiry: { $gt: Date.now() } });
        if (!customer) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }
        customer.isVerified = true;
        customer.otp = null;
        customer.otpExpiry = null;
        await customer.save();
        res.status(200).json({
            message: "Customer verified successfully",
            customer: customer,
            customerId: customer._id
        });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ message: "Error verifying OTP" });
    }
}

export async function getServices(req, res) {
    try {
        const { category } = req.query;
        const filter = category && category !== "all" ? { category } : {};
        const services = await Service.find(filter);
        res.status(200).json({ message: "Services fetched successfully", services: services });
    } catch (error) {
        console.error("Error fetching services:", error);
        res.status(500).json({ message: "Error fetching services" });
    }
}


export async function requestService(req, res) {
    try {
        const customerId = req.query.id;
        if (!customerId) {
            return res.status(400).json({ message: "Customer ID is required" });
        }
        const { serviceId, datetime, notes } = req.body;
        const newRequest = new Request({ serviceId, datetime, notes, customerId })
        await newRequest.save();
        res.status(201).json({
            success: true,
            message: "Booking successful",
            data: newRequest,
        });
    }
    catch (error) {
        console.error("Error fetching services:", error);
        res.status(500).json({ message: "Error fetching services: check console" });
    }
}

export async function getActiveRequests(req, res) {
    try {
        const { customerId } = req.query;
        if (!customerId) {
            return res.status(400).json({ message: "Customer ID is required" });
        }
        const requests = await Request.find({ customerId: customerId, status: "active" });
        if (!requests || requests.length === 0) {
            return res.status(404).json({ message: "No active requests found" });
        }
        res.status(200).json({ message: "Requests fetched successfully", requests: requests });
    } catch (error) {
        console.error("Error fetching requests:", error);
        res.status(500).json({ message: "Error fetching requests" });
    }
}
export async function getPastRequests(req, res) {
    try {
        const { customerId } = req.query;
        if (!customerId) {
            return res.status(400).json({ message: "Customer ID is required" });
        }
        const requests = await Request.find({ customerId: customerId, status: { $in: ["completed", "cancelled"] } });
        if (!requests || requests.length === 0) {
            return res.status(404).json({ message: "No past requests found" });
        }
        res.status(200).json({ message: "Requests fetched successfully", requests: requests });
    } catch (error) {
        console.error("Error fetching requests:", error);
        res.status(500).json({ message: "Error fetching requests" });
    }
}


export async function saveService(req, res) {
    try {
        const { customerId, serviceId } = req.body;
        const savedService = new SavedService({ customerId, serviceId });
        await savedService.save();
        res.status(201).json({ message: "Service saved successfully" });
    } catch (error) {
        console.error("Error saving service:", error);
        res.status(500).json({ message: "Error saving service" });
    }
}

export async function getSavedServices(req, res) {
    try {
        const customerId = req.query.id;
        const services = await SavedService.find({ customerId: id })
        if (!services) {
            request.status(201).json({ success: true, message: "No  saved services found!", data: null });
            return;
        }
        request.json(201).json({ success: true, message: "Saved services fetched successfully", data: services });
    } catch (error) {
        console.error("Error Fetching saved Services");
        res.status(400).json({ message: "Error fetching saved services" });
        return;
    }
}

export async function unsaveService(req, res) {
    try {
        const { customerId, savedServiceId } = req.body;
        const service = SavedService.findOneAndDelete({ customerId: customerId, serviceId: savedServiceId });
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json({ message: "Service unsaved successfully" });
    } catch (error) {
        console.error("Error unsaving service:", error);
        res.status(500).json({ message: "Error unsaving service" });
    }
}




