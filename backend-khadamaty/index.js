import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
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
import { handleSigniIn } from './customer.js';

import { handleProviderSignup } from './provider.js';
import { verifyProviderOtp } from './provider.js';
import { handleProviderSignin } from './provider.js';
import { getProviderServices } from './provider.js';
import { createProviderService } from './provider.js';
import { updateProviderService } from './provider.js';
import { deleteProviderService } from './provider.js';
import { getProviderRequests } from './provider.js';
import { updateProviderRequestStatus } from './provider.js';

dotenv.config();

const port = 8000;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
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
app.delete("/customer/unsave-service", unsaveService);

// Provider endpoints
app.post("/provider/signup", handleProviderSignup);
app.post("/provider/verify-otp", verifyProviderOtp);
app.post("/provider/signin", handleProviderSignin);
app.get("/provider/services", getProviderServices);
app.post("/provider/services", createProviderService);
app.put("/provider/services/:serviceId", updateProviderService);
app.delete("/provider/services/:serviceId", deleteProviderService);
app.get("/provider/requests", getProviderRequests);
app.patch("/provider/requests/:requestId", updateProviderRequestStatus);
