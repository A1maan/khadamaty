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
            isVerified: true,
            password: "password"
        });
        await customer.save();
        console.log("Customer created:", customer._id);

        // Create Service Providers
        const providersData = [
            { name: "Jane Smith", email: "jane@example.com", phone: 9876543210, nationalID: "1234567890", isVerified: true },
            { name: "Bob Builder", email: "bob@example.com", phone: 1122334455, nationalID: "0987654321", isVerified: true },
            { name: "Alice Green", email: "alice@example.com", phone: 5566778899, nationalID: "1122334455", isVerified: true }
        ];

        const providers = [];
        for (const pData of providersData) {
            const provider = new ServiceProvider(pData);
            await provider.save();
            providers.push(provider);
            console.log(`Service Provider created: ${provider.name}`);
        }

        // Create Services
        const servicesData = [
            // Cleaning
            { name: "House Cleaning", category: "Cleaning", description: "Standard house cleaning service", price: 50, priceType: "Hourly", providerIndex: 0 },
            { name: "Carpet Cleaning", category: "Cleaning", description: "Deep cleaning for carpets and rugs", price: 100, priceType: "Fixed", providerIndex: 0 },
            { name: "Window Washing", category: "Cleaning", description: "Exterior and interior window washing", price: 80, priceType: "Fixed", providerIndex: 0 },

            // Plumbing
            { name: "Leak Repair", category: "Plumbing", description: "Fixing leaks in pipes and faucets", price: 120, priceType: "Fixed", providerIndex: 1 },
            { name: "Pipe Installation", category: "Plumbing", description: "Installation of new water pipes", price: 200, priceType: "Fixed", providerIndex: 1 },
            { name: "Drain Unclogging", category: "Plumbing", description: "Unclogging kitchen and bathroom drains", price: 150, priceType: "Fixed", providerIndex: 1 },

            // Electrical
            { name: "Wiring", category: "Electrical", description: "Complete home wiring services", price: 300, priceType: "Fixed", providerIndex: 1 },
            { name: "Light Installation", category: "Electrical", description: "Installation of light fixtures and chandeliers", price: 80, priceType: "Fixed", providerIndex: 1 },

            // Moving
            { name: "Local Moving", category: "Moving", description: "Moving services within the city", price: 100, priceType: "Hourly", providerIndex: 2 },
            { name: "Furniture Assembly", category: "Moving", description: "Assembly of IKEA and other furniture", price: 60, priceType: "Fixed", providerIndex: 2 },

            // Gardening
            { name: "Lawn Mowing", category: "Gardening", description: "Regular lawn mowing and maintenance", price: 40, priceType: "Hourly", providerIndex: 2 },
            { name: "Tree Trimming", category: "Gardening", description: "Trimming and pruning of trees and bushes", price: 150, priceType: "Fixed", providerIndex: 2 }
        ];

        for (const sData of servicesData) {
            const { providerIndex, ...serviceData } = sData;
            const service = new Service({
                ...serviceData,
                providerId: providers[providerIndex]._id
            });
            await service.save();
            console.log(`Service created: ${service.name}`);
        }

        console.log("Database seeded successfully!");

    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
}

seedDatabase();
