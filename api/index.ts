import express from "express";
import { createRandomData } from "../services/randomDataFactory/createRandom";
import { RANDOM_DATA } from "../services/randomDataFactory/dataStructure";
import cors from "cors";
const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000; // default port to listen

app.get(`/api/:name`, (req: any, res: any) => {
  const path = req.params.name;
  const data = RANDOM_DATA[path as keyof typeof RANDOM_DATA];

  if (data) {
    const arrayData = createRandomData(
      RANDOM_DATA[path as keyof typeof RANDOM_DATA],
      100
    );
    res.json(arrayData);
  } else {
    res.status(404).send("NOT FOUND. TRY ANOTHER PATH!");
  }
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
