import { Customer, ServiceProvider, Service, Request, SavedService, Admin } from "./schemas.js";


export async function getAllCustomers(req, res) {
    try {
        const customers = await Customer.find();
        res.status(200).json({ success: true, message: "Customers recieved successfully", data: customers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function getAllServiceProviders(req, res) {
    try {
        const serviceProviders = await ServiceProvider.find();
        res.status(200).json({ success: true, message: "ServiceProviders recieved successfully", data: customers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function getAllServices(req, res) {
    try {
        const services = await Service.find();
        res.status(200).json({ success: true, message: "Services recieved successfully", data: services });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}