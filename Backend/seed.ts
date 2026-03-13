import mongoose from "mongoose";
import { config } from "./src/config/env.js";
import { App } from "./src/models/App.js";

const sampleApps = [
  {
    name: "TaskFlow",
    slug: "taskflow",
    description:
      "A powerful task management app for teams to collaborate efficiently.",
    longDescription:
      "TaskFlow is a comprehensive task management platform designed for modern teams. Manage projects, assign tasks, track progress, and collaborate seamlessly with your team members. Features include real-time notifications, activity tracking, and customizable workflows.",
    status: "released",
    version: "2.1.0",
    icon: "https://via.placeholder.com/256/6467f2/ffffff?text=TaskFlow",
    screenshots: [
      "https://via.placeholder.com/400x800/6467f2/ffffff?text=Dashboard",
      "https://via.placeholder.com/400x800/6467f2/ffffff?text=Tasks",
      "https://via.placeholder.com/400x800/6467f2/ffffff?text=Team",
    ],
    techStack: ["React Native", "Node.js", "MongoDB", "Firebase"],
    features: [
      "Real-time task updates",
      "Team collaboration",
      "Progress tracking",
      "Notifications",
      "Custom workflows",
    ],
    apkUrl: "https://play.google.com/store/apps/details?id=com.taskflow.app",
    ipaUrl: "https://testflight.apple.com/join/taskflow",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.taskflow.app",
    appStoreUrl: "https://apps.apple.com/app/taskflow/id1234567890",
    githubUrl: "https://github.com/taskflow/mobile",
    rating: 4.8,
    reviewsCount: 1250,
  },
  {
    name: "SnapNote",
    slug: "snapnote",
    description:
      "Quick note-taking app with voice recording and image annotation.",
    longDescription:
      "SnapNote makes capturing ideas effortless. Take quick notes, record voice memos, annotate images, and organize everything with smart tags. Sync across all your devices and never lose an important thought again. Your notes are encrypted and stored securely.",
    status: "released",
    version: "1.5.2",
    icon: "https://via.placeholder.com/256/ff6b6b/ffffff?text=SnapNote",
    screenshots: [
      "https://via.placeholder.com/400x800/ff6b6b/ffffff?text=Notes",
      "https://via.placeholder.com/400x800/ff6b6b/ffffff?text=Voice",
      "https://via.placeholder.com/400x800/ff6b6b/ffffff?text=Organize",
    ],
    techStack: ["Flutter", "Firebase", "Dart"],
    features: [
      "Voice recording",
      "Image annotation",
      "Smart tags",
      "Cloud sync",
      "Offline access",
      "End-to-end encryption",
    ],
    apkUrl: null,
    ipaUrl: "https://testflight.apple.com/join/snapnote",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.snapnote.app",
    appStoreUrl: "https://apps.apple.com/app/snapnote/id1234567891",
    githubUrl: "https://github.com/snapnote/mobile",
    rating: 4.6,
    reviewsCount: 890,
  },
  {
    name: "FitPulse",
    slug: "fitpulse",
    description:
      "AI-powered fitness tracking and personalized workout recommendations.",
    longDescription:
      "FitPulse combines advanced health tracking with AI-powered coaching. Track your workouts, monitor vital signs, get personalized recommendations, and achieve your fitness goals. Includes wearable integration, social challenges, and detailed analytics.",
    status: "coming_soon",
    version: "0.9.0",
    icon: "https://via.placeholder.com/256/4ecdc4/ffffff?text=FitPulse",
    screenshots: [
      "https://via.placeholder.com/400x800/4ecdc4/ffffff?text=Workouts",
      "https://via.placeholder.com/400x800/4ecdc4/ffffff?text=Analytics",
      "https://via.placeholder.com/400x800/4ecdc4/ffffff?text=Challenges",
    ],
    techStack: ["React Native", "Python", "TensorFlow", "Firebase"],
    features: [
      "AI coaching",
      "Wearable integration",
      "Social challenges",
      "Detailed analytics",
      "Nutrition tracking",
      "Recovery insights",
    ],
    apkUrl: null,
    ipaUrl: null,
    playStoreUrl: null,
    appStoreUrl: null,
    githubUrl: "https://github.com/fitpulse/mobile",
    rating: 0,
    reviewsCount: 0,
  },
  {
    name: "CodeHub",
    slug: "codehub",
    description: "Portable code editor and compiler for developers on the go.",
    longDescription:
      "CodeHub is a full-featured code editor that fits in your pocket. Write, compile, and run code in multiple languages. Perfect for learning, interview prep, or quick coding tasks. Supports syntax highlighting, debugging, and multiple themes.",
    status: "released",
    version: "3.0.1",
    icon: "https://via.placeholder.com/256/a78bfa/ffffff?text=CodeHub",
    screenshots: [
      "https://via.placeholder.com/400x800/a78bfa/ffffff?text=Editor",
      "https://via.placeholder.com/400x800/a78bfa/ffffff?text=Console",
      "https://via.placeholder.com/400x800/a78bfa/ffffff?text=Languages",
    ],
    techStack: ["React Native", "Node.js", "Docker"],
    features: [
      "Multi-language support",
      "Syntax highlighting",
      "Debugging tools",
      "Custom themes",
      "Cloud sync",
      "Offline mode",
    ],
    apkUrl: "https://github.com/codehub/releases/download/v3.0.1/app.apk",
    ipaUrl: "https://testflight.apple.com/join/codehub",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.codehub.app",
    appStoreUrl: "https://apps.apple.com/app/codehub/id1234567892",
    githubUrl: "https://github.com/codehub/mobile",
    rating: 4.7,
    reviewsCount: 2100,
  },
  {
    name: "WeatherWise",
    slug: "weatherwise",
    description: "Ultra-accurate weather forecasting with detailed analytics.",
    longDescription:
      "WeatherWise provides hyperlocal weather forecasting powered by advanced AI models. Get minute-by-minute forecasts, severe weather alerts, air quality tracking, and pollen counts. Beautiful visualizations and detailed meteorological data for weather enthusiasts.",
    status: "draft",
    version: "1.0.0-beta",
    icon: "https://via.placeholder.com/256/fbbf24/ffffff?text=WeatherWise",
    screenshots: [
      "https://via.placeholder.com/400x800/fbbf24/ffffff?text=Forecast",
      "https://via.placeholder.com/400x800/fbbf24/ffffff?text=Alerts",
      "https://via.placeholder.com/400x800/fbbf24/ffffff?text=Analytics",
    ],
    techStack: ["Flutter", "Python", "Weather API"],
    features: [
      "Minute-by-minute forecast",
      "Severe weather alerts",
      "Air quality tracking",
      "Pollen counts",
      "UV index",
      "Historical data",
    ],
    apkUrl: null,
    ipaUrl: null,
    playStoreUrl: null,
    appStoreUrl: null,
    githubUrl: "https://github.com/weatherwise/mobile",
    rating: 0,
    reviewsCount: 0,
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.mongoUri);
    console.log("📦 Connected to MongoDB");

    // Clear existing apps
    await App.deleteMany({});
    console.log("🗑️ Cleared existing apps");

    // Insert sample apps
    const insertedApps = await App.insertMany(sampleApps);
    console.log(`✅ Seeded ${insertedApps.length} sample apps`);

    // Display seeded apps
    console.log("\n📱 Seeded Apps:");
    insertedApps.forEach((app) => {
      console.log(`  - ${app.name} (${app.slug}) - ${app.status}`);
    });

    console.log("\n✨ Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedDatabase();
