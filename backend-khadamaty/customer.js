import { Customer } from "./schemas.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { Service } from "./schemas.js";
import dotenv from "dotenv";
import { Request } from "./schemas.js";
import { request } from "express";

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
            res.status(400).json({
                success: false,
                message: "This email is already registered",
                data: null
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 60 * 1000); // 1 minute expiry
        const customer = new Customer({ name, email, password: hashedPassword, phone, otp, otpExpiry });
        await customer.save();
        console.log("DEV MODE - Generated OTP:", otp);
        res.status(201).json({ message: "Customer created successfully" });
        await sendOTP(customer.otp, customer.email); // Call the sendOTP function
    } catch (error) {
        console.error("Error creating customer:", error);
        res.status(500).json({ message: "Error creating customer" });
    }
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
            html: `<p>This is your One-Time-Password that will expire in a minute: <strong>${otp}</strong></p>`,
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
        const customer = await Customer.findOne({ id: id, otpExpiry: { $gt: Date.now() } });
        if (!customer) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }
        customer.isVerified = true;
        await customer.save();
        res.status(200).json({
            message: "Customer verified successfully",
            customer: customer,
        });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ message: "Error verifying OTP" });
    }
}

export async function getServices(req, res) {
    try {
        const { category } = req.query;
        const services = await Service.find({ category: category });
        res.status(200).json({ message: "Services fetched successfully", services: services });
    } catch (error) {
        console.error("Error fetching services:", error);
        res.status(500).json({ message: "Error fetching services" });
    }
}


export async function requestService(req, res) {
    try {
        const { serviceId, datetime, notes, customerId } = req.body;
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

