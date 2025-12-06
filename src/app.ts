import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000",
  "https://grocify-new-store.netlify.app",
];


app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log("Blocked origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Set-Cookie"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Grocify Server is running");
});

app.use(
  (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Server error:", err.stack);
    
    if (err.message === "Not allowed by CORS") {
      return res.status(403).json({ 
        message: "CORS error: Origin not allowed",
        origin: req.headers.origin 
      });
    }
    
    res.status(500).json({ message: "Something went wrong!" });
  }
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Allowed origins:`, allowedOrigins);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;