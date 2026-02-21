import express from "express";
import dotenv from "dotenv";
dotenv.config();
import postRoutes from "./routes/route.js"

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/post", postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
