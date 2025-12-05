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
        res.status(200).json({ success: true, message: "ServiceProviders recieved successfully", data: serviceProviders });
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

// Approve provider (set isVerified to true and isFeatured optionally)
export async function approveProvider(req, res) {
    try {
        const { providerId } = req.params;
        const { isFeatured } = req.body;
        const provider = await ServiceProvider.findByIdAndUpdate(
            providerId,
            { isVerified: true, isFeatured: isFeatured ?? false, updatedAt: Date.now() },
            { new: true }
        );
        if (!provider) {
            return res.status(404).json({ success: false, message: "Provider not found" });
        }
        res.status(200).json({ success: true, message: "Provider approved successfully", data: provider });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Reject provider (set isVerified to false)
export async function rejectProvider(req, res) {
    try {
        const { providerId } = req.params;
        const provider = await ServiceProvider.findByIdAndUpdate(
            providerId,
            { isVerified: false, updatedAt: Date.now() },
            { new: true }
        );
        if (!provider) {
            return res.status(404).json({ success: false, message: "Provider not found" });
        }
        res.status(200).json({ success: true, message: "Provider rejected successfully", data: provider });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Update provider status (for activation/suspension)
export async function updateProviderStatus(req, res) {
    try {
        const { providerId } = req.params;
        const { isVerified, isFeatured } = req.body;
        const updateData = { updatedAt: Date.now() };
        if (isVerified !== undefined) updateData.isVerified = isVerified;
        if (isFeatured !== undefined) updateData.isFeatured = isFeatured;
        
        const provider = await ServiceProvider.findByIdAndUpdate(providerId, updateData, { new: true });
        if (!provider) {
            return res.status(404).json({ success: false, message: "Provider not found" });
        }
        res.status(200).json({ success: true, message: "Provider status updated successfully", data: provider });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Get all admins
export async function getAllAdmins(req, res) {
    try {
        const admins = await Admin.find();
        res.status(200).json({ success: true, message: "Admins received successfully", data: admins });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Update admin role (if you add a role field to Admin schema later)
export async function updateAdminRole(req, res) {
    try {
        const { adminId } = req.params;
        const { role } = req.body;
        // Note: Admin schema doesn't have role field yet, but we'll add it for future use
        const admin = await Admin.findByIdAndUpdate(
            adminId,
            { role, updatedAt: Date.now() },
            { new: true }
        );
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }
        res.status(200).json({ success: true, message: "Admin role updated successfully", data: admin });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}