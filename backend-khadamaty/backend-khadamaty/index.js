import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { handleSignup } from './customer.js';
import { verifyOtp } from './customer.js';
import { getServices } from './customer.js';
import { requestService } from './customer.js';

dotenv.config();

const port = 3000;
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


app.post("/customer/signup", handleSignup);
app.post("/customer/verify-otp", verifyOtp);
app.get("/customer/services", getServices);
app.post("/customer/book", requestService);






