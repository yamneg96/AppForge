import { Request, Response } from "express";
import { App } from "../models/App.js";

// GET all apps
export async function getApps(req: Request, res: Response) {
  try {
    const { status, limit = 10, skip = 0 } = req.query;
    const filter = status ? { status } : {};

    const apps = await App.find(filter)
      .limit(Number(limit))
      .skip(Number(skip))
      .sort({ createdAt: -1 });

    const total = await App.countDocuments(filter);

    res.json({
      apps,
      total,
      limit: Number(limit),
      skip: Number(skip),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch apps" });
  }
}

// GET app by slug
export async function getAppBySlug(req: Request, res: Response) {
  try {
    const { slug } = req.params;
    const app = await App.findOne({ slug });

    if (!app) {
      return res.status(404).json({ error: "App not found" });
    }

    res.json(app);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch app" });
  }
}

// POST create app
export async function createApp(req: Request, res: Response) {
  try {
    const {
      name,
      slug,
      description,
      longDescription,
      status,
      techStack,
      version,
      features,
      apkUrl,
      ipaUrl,
      playStoreUrl,
      appStoreUrl,
      githubUrl,
    } = req.body;

    // Validate required fields
    if (!name || !slug || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if slug already exists
    const existingApp = await App.findOne({ slug });
    if (existingApp) {
      return res.status(409).json({ error: "Slug already exists" });
    }

    // Parse techStack and features if they're JSON strings
    let parsedTechStack = techStack;
    let parsedFeatures = features;

    if (typeof techStack === "string") {
      try {
        parsedTechStack = JSON.parse(techStack);
      } catch {
        parsedTechStack = [];
      }
    }

    if (typeof features === "string") {
      try {
        parsedFeatures = JSON.parse(features);
      } catch {
        parsedFeatures = [];
      }
    }

    // Handle file uploads - for now, store URLs directly
    // In a real scenario with ImageKit, you would upload files here
    const appData = {
      name,
      slug,
      description,
      longDescription,
      status: status || "draft",
      techStack: parsedTechStack || [],
      version: version || "1.0.0",
      features: parsedFeatures || [],
      apkUrl: apkUrl || null,
      ipaUrl: ipaUrl || null,
      playStoreUrl: playStoreUrl || null,
      appStoreUrl: appStoreUrl || null,
      githubUrl: githubUrl || null,
      icon: req.files?.icon ? `/uploads/${req.files.icon[0].filename}` : null,
      screenshots: req.files?.screenshots
        ? req.files.screenshots.map((f: any) => `/uploads/${f.filename}`)
        : [],
    };

    const app = new App(appData);
    await app.save();
    res.status(201).json(app);
  } catch (error) {
    console.error("Create app error:", error);
    res.status(500).json({ error: "Failed to create app" });
  }
}

// PUT update app
export async function updateApp(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    // Parse techStack and features if they're JSON strings
    if (updates.techStack && typeof updates.techStack === "string") {
      try {
        updates.techStack = JSON.parse(updates.techStack);
      } catch {
        updates.techStack = [];
      }
    }

    if (updates.features && typeof updates.features === "string") {
      try {
        updates.features = JSON.parse(updates.features);
      } catch {
        updates.features = [];
      }
    }

    // Handle new file uploads
    if (req.files?.icon) {
      updates.icon = `/uploads/${req.files.icon[0].filename}`;
    }

    if (req.files?.screenshots && req.files.screenshots.length > 0) {
      updates.screenshots = req.files.screenshots.map(
        (f: any) => `/uploads/${f.filename}`,
      );
    }

    // Check if trying to change slug to existing slug
    if (updates.slug) {
      const existingApp = await App.findOne({
        slug: updates.slug,
        _id: { $ne: id },
      });
      if (existingApp) {
        return res.status(409).json({ error: "Slug already exists" });
      }
    }

    const app = await App.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!app) {
      return res.status(404).json({ error: "App not found" });
    }

    res.json(app);
  } catch (error) {
    console.error("Update app error:", error);
    res.status(500).json({ error: "Failed to update app" });
  }
}

// DELETE app
export async function deleteApp(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const app = await App.findByIdAndDelete(id);

    if (!app) {
      return res.status(404).json({ error: "App not found" });
    }

    res.json({ message: "App deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete app" });
  }
}
