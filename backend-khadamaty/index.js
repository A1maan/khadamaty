import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { handleSignup } from './customer.js';
import { handleSigniIn } from './customer.js';
import { verifyOtp } from './customer.js';
import { getServices } from './customer.js';
import { requestService } from './customer.js';
import { getActiveRequests } from './customer.js';
import { getPastRequests } from './customer.js';
import { saveService } from './customer.js';
import { getSavedServices } from './customer.js';
import { unsaveService } from './customer.js';
import { getFeaturedProviders } from './customer.js';

import { handleProviderSignup } from './provider.js';
import { verifyProviderOtp } from './provider.js';
import { handleProviderSignin } from './provider.js';
import { getProviderServices } from './provider.js';
import { getProviderServiceById } from './provider.js';
import { createProviderService } from './provider.js';
import { updateProviderService } from './provider.js';
import { deleteProviderService } from './provider.js';
import { getProviderRequests } from './provider.js';
import { updateProviderRequestStatus } from './provider.js';
import { getPendingRequests } from './provider.js';
import { getActiveRequestsSP } from './provider.js';
import { getPastRequestsSP } from './provider.js';

import { getAllCustomers } from './admin.js';
import { getAllServiceProviders } from './admin.js';
import { getAllServices } from './admin.js';
import { approveProvider } from './admin.js';
import { rejectProvider } from './admin.js';
import { updateProviderStatus } from './admin.js';
import { getAllAdmins } from './admin.js';
import { updateAdminRole } from './admin.js';
import { signInAdmin } from './admin.js';
import { getPendingProviders } from './admin.js';

dotenv.config();

// Prefer Render/host-provided port, fall back to local dev default
const port = process.env.PORT || 8000;
const app = express();
app.use(morgan('dev'));

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

mongoose.connect(process.env.MONGODB_URI, { dbName: 'khadamatyDB' });


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});


// Customer endpoints
app.post("/customer/signup", handleSignup);
app.post("/customer/verify-otp", verifyOtp);
app.post("/customer/signin", handleSigniIn);
app.get("/customer/services", getServices);
app.post("/customer/book", requestService);
app.get("/customer/active-requests", getActiveRequests);
app.get("/customer/past-requests", getPastRequests);
app.post("/customer/save-service", saveService);
app.get("/customer/saved-services", getSavedServices);
app.get("/customer/saved-services", getSavedServices);
app.delete("/customer/unsave-service", unsaveService);
app.get("/public/providers/featured", getFeaturedProviders);

// Provider endpoints
app.post("/provider/signup", handleProviderSignup);
app.post("/provider/verify-otp", verifyProviderOtp);
app.post("/provider/signin", handleProviderSignin);
app.get("/provider/services", getProviderServices);
app.get("/provider/services/:serviceId", getProviderServiceById);
app.post("/provider/services", createProviderService);
app.put("/provider/services/:serviceId", updateProviderService);
app.delete("/provider/services/:serviceId", deleteProviderService);
app.get("/provider/requests", getProviderRequests);
app.patch("/provider/requests/:requestId", updateProviderRequestStatus);
app.get("/provider/pending-requests", getPendingRequests);
app.get("/provider/active-requests", getActiveRequestsSP);
app.get("/provider/past-requests", getPastRequestsSP);

// Admin endpoints
app.post("/admin/signin", signInAdmin);
app.get("/admin/customers", getAllCustomers);
app.get("/admin/service-providers", getAllServiceProviders);
app.get("/admin/services", getAllServices);
app.get("/admin/admins", getAllAdmins);
app.post("/admin/providers/:providerId/approve", approveProvider);
app.post("/admin/providers/:providerId/reject", rejectProvider);
app.patch("/admin/providers/:providerId/status", updateProviderStatus);
app.patch("/admin/admins/:adminId/role", updateAdminRole);
app.get("/admin/providers/pending", getPendingProviders);
