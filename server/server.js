import express from "express";
import data from "../static/name.json" assert { type: "json" };
import cors from 'cors'

const app = express();
const PORT = 3001;

app.use(cors())

app.get("/name", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(data));
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
