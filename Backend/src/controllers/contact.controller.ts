import { Request, Response } from "express";
import { Contact } from "../models/Contact.js";
import { sendContactNotification } from "../services/email.service.js";

// GET all contacts
export async function getContacts(req: Request, res: Response) {
  try {
    const { limit = 10, skip = 0, read } = req.query;
    const filter = read !== undefined ? { read: read === "true" } : {};

    const contacts = await Contact.find(filter)
      .limit(Number(limit))
      .skip(Number(skip))
      .sort({ createdAt: -1 });

    const total = await Contact.countDocuments(filter);

    res.json({
      contacts,
      total,
      limit: Number(limit),
      skip: Number(skip),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
}

// POST create contact message
export async function createContact(req: Request, res: Response) {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const contact = new Contact({
      name,
      email,
      message,
    });

    await contact.save();

    // Send email notification to admin
    const adminEmail = "yamlaknegash96@gmail.com";
    const emailSent = await sendContactNotification(
      { name, email, message },
      adminEmail,
    );

    if (!emailSent) {
      console.warn("Failed to send contact notification email");
      // Don't fail the request, just log the warning
    }

    res.status(201).json({
      message: "Message sent successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
}

// PUT mark contact as read
export async function markAsRead(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { read: true },
      { new: true },
    );

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: "Failed to update contact" });
  }
}

// DELETE contact
export async function deleteContact(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete contact" });
  }
}
