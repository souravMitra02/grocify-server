const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route")

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "https://grocify-srote-new.netlify.app/",
  credentials: true
}));

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
