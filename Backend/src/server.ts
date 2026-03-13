import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { config } from "./config/env.js";
import { connectDB } from "./config/db.js";
import appsRoutes from "./routes/apps.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// Middleware
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Root route - Beautiful welcome page
app.get("/", (req, res) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>AppForge Backend API</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .container {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          padding: 60px 40px;
          max-width: 600px;
          text-align: center;
          animation: slideUp 0.5s ease-out;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .logo {
          font-size: 48px;
          margin-bottom: 20px;
          animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        h1 {
          color: #667eea;
          font-size: 36px;
          margin-bottom: 10px;
          font-weight: 700;
        }
        
        .subtitle {
          color: #764ba2;
          font-size: 18px;
          margin-bottom: 30px;
          font-weight: 500;
        }
        
        .status {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
          border-radius: 15px;
          margin-bottom: 30px;
          font-size: 16px;
          font-weight: 600;
        }
        
        .endpoints {
          background: #f8f9ff;
          border-radius: 15px;
          padding: 30px;
          margin-bottom: 30px;
          text-align: left;
        }
        
        .endpoints h3 {
          color: #667eea;
          margin-bottom: 20px;
          font-size: 18px;
        }
        
        .endpoint {
          background: white;
          padding: 15px;
          margin-bottom: 10px;
          border-radius: 10px;
          border-left: 4px solid #667eea;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          color: #333;
          overflow-x: auto;
        }
        
        .endpoint:last-child {
          margin-bottom: 0;
        }
        
        .method {
          display: inline-block;
          width: 60px;
          padding: 5px 10px;
          border-radius: 5px;
          font-weight: 600;
          margin-right: 10px;
          font-size: 12px;
        }
        
        .method.get {
          background: #e3f2fd;
          color: #1976d2;
        }
        
        .method.post {
          background: #f3e5f5;
          color: #7b1fa2;
        }
        
        .footer {
          color: #999;
          font-size: 14px;
          margin-top: 20px;
        }
        
        .footer a {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
        }
        
        .footer a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">🚀</div>
        <h1>AppForge Server</h1>
        <p class="subtitle">Backend API is running successfully</p>
        
        <div class="status">
          ✅ Server Status: <strong>ONLINE</strong>
        </div>
        
        <div class="endpoints">
          <h3>📋 Available Endpoints</h3>
          
          <div class="endpoint">
            <span class="method get">GET</span> /health<br>
            <span style="color: #999; font-size: 12px;">Health check endpoint</span>
          </div>
          
          <div class="endpoint">
            <span class="method post">POST</span> /api/auth/request-otp<br>
            <span style="color: #999; font-size: 12px;">Request OTP for login</span>
          </div>
          
          <div class="endpoint">
            <span class="method post">POST</span> /api/auth/verify-otp<br>
            <span style="color: #999; font-size: 12px;">Verify OTP and login</span>
          </div>
          
          <div class="endpoint">
            <span class="method post">POST</span> /api/auth/verify-google<br>
            <span style="color: #999; font-size: 12px;">Verify Google OAuth token</span>
          </div>
          
          <div class="endpoint">
            <span class="method post">POST</span> /api/contact<br>
            <span style="color: #999; font-size: 12px;">Submit contact form</span>
          </div>
          
          <div class="endpoint">
            <span class="method get">GET</span> /api/apps<br>
            <span style="color: #999; font-size: 12px;">Get all apps</span>
          </div>
        </div>
        
        <div class="footer">
          Made with ❤️ for AppForge
        </div>
      </div>
    </body>
    </html>
  `;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(htmlContent);
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/apps", appsRoutes);
app.use("/api/contact", contactRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error("Error:", err);
    res.status(err.status || 500).json({
      error:
        config.nodeEnv === "production" ? "Internal server error" : err.message,
    });
  },
);

// Start server
async function startServer() {
  try {
    await connectDB();

    app.listen(config.port, () => {
      console.log(`🚀 Server running on http://localhost:${config.port}`);
      console.log(`📚 API: http://localhost:${config.port}/api`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

export default app;
