import express from 'express';

import Hello from "./hello.js";
import UserRoutes from "./users/routes.js";
import ComboRoutes from './combos/routes.js';
import mongoose from 'mongoose';


import "dotenv/config.js";


import cors from 'cors';

// connecting to db
// local
// mongoose.connect("mongodb://127.0.0.1:27017/the_dojo");

// db connection
mongoose
  .set("strictQuery", false)
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));


const app = express();
app.use(express.json());



// app.use(cors({
//   credentials: true,
//   origin: process.env.FRONTEND_URL
//   //origin: process.env.FRONTEND_URL

// }));


app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"

}));

UserRoutes(app);
ComboRoutes(app);
Hello(app);

// listen to http://localhost:4000
app.listen(process.env.PORT || 4000);