import express from "express";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes";
import userRoutes from "./routes/userRoutes";
import { cognitoAuthMiddleware } from "./middleware/cognitoMiddleware";

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/health", (_req, res) => {
  res.json({ message: "UP!" });
});

// Mount "Note" routes - Protected by CognitoAuthMiddleware
app.use("/notes", cognitoAuthMiddleware, noteRoutes);

// Mount "User" routes - Protected by CognitoAuthMiddleware
app.use("/user", cognitoAuthMiddleware, userRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
