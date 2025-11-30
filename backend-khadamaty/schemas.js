import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: { type: mongoose.Schema.Types.String, required: true },
    email: { type: mongoose.Schema.Types.String, required: true },
    password: { type: mongoose.Schema.Types.String, required: true },
    phone: { type: mongoose.Schema.Types.Number, required: true },
    otp: { type: mongoose.Schema.Types.Number, required: false },
    otpExpiry: { type: mongoose.Schema.Types.Date, required: false },
    isVerified: { type: mongoose.Schema.Types.Boolean, required: false },
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now },
    updatedAt: { type: mongoose.Schema.Types.Date, default: Date.now },
});

export const Customer = mongoose.model("Customer", customerSchema);

const serviceProviderSchema = new mongoose.Schema({
    name: mongoose.Schema.Types.String,
    email: mongoose.Schema.Types.String,
    password: mongoose.Schema.Types.String,
    phone: mongoose.Schema.Types.Number,
    nationalID: mongoose.Schema.Types.String,
    otp: mongoose.Schema.Types.Number,
    otpExpiry: mongoose.Schema.Types.Date,
    isVerified: mongoose.Schema.Types.Boolean,
    isFeatured: mongoose.Schema.Types.Boolean,
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now },
    updatedAt: { type: mongoose.Schema.Types.Date, default: Date.now },
});

export const ServiceProvider = mongoose.model("ServiceProvider", serviceProviderSchema);

const serviceSchema = new mongoose.Schema({
    name: mongoose.Schema.Types.String,
    category: mongoose.Schema.Types.String,
    description: mongoose.Schema.Types.String,
    price: mongoose.Schema.Types.Number,
    priceType: mongoose.Schema.Types.String,
    image: mongoose.Schema.Types.String,
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider' },
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now },
    updatedAt: { type: mongoose.Schema.Types.Date, default: Date.now },
});

export const Service = mongoose.model("Service", serviceSchema);

const requestSchema = new mongoose.Schema({
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    status: {
        type: String,
        enum: ["active", "in progress", "cancelled", "completed"],
        default: "active"
    },
    datetime: { type: mongoose.Schema.Types.Date },
    notes: mongoose.Schema.Types.String,
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now },
    updatedAt: { type: mongoose.Schema.Types.Date, default: Date.now },
}
);

export const Request = mongoose.model("Request", requestSchema);