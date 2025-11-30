import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Customer, ServiceProvider, Service } from './schemas.js';

dotenv.config();

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { dbName: 'khadamatyDB' });
        console.log("Connected to MongoDB");

        // Clear existing data to avoid duplicates (optional, but good for testing)
        await Customer.deleteMany({});
        await ServiceProvider.deleteMany({});
        await Service.deleteMany({});

        // Create a Customer
        const customer = new Customer({
            name: "John Doe",
            email: "john@example.com",
            phone: 1234567890,
            isVerified: true
        });
        await customer.save();
        console.log("Customer created:", customer._id);

        // Create a Service Provider
        const provider = new ServiceProvider({
            name: "Jane Smith",
            email: "jane@example.com",
            phone: 9876543210,
            nationalID: "1234567890",
            isVerified: true
        });
        await provider.save();
        console.log("Service Provider created:", provider._id);

        // Create a Service
        const service = new Service({
            name: "House Cleaning",
            description: "Standard house cleaning service",
            price: 50,
            priceType: "Hourly",
            providerId: provider._id
        });
        await service.save();
        console.log("Service created:", service._id);

        console.log("Database seeded successfully!");

    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
}

seedDatabase();
