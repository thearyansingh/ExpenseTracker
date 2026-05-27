import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { authrouter } from "./modules/auth/auth.routes.js";
import expenseRoutes from "./modules/expense/expense.routes.js";
import budgetRoutes from "./modules/budget/budget.routes.js";
import { errorHandler } from "./shared/middleware/error.middleware.js";
import dashboardRouter from "./modules/dashboard/dashboard.routes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://192.168.1.44:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    
    // Normalize or match allowed origins
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(helmet());
app.use(morgan("dev"));


app.use("/api/auth",authrouter);

app.use("/api/budgets", budgetRoutes);

app.use("/api/expenses", expenseRoutes);
app.use("/api/dashboard",dashboardRouter)


// Health Check Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handler (should be after routes)
app.use(errorHandler);

export default app;