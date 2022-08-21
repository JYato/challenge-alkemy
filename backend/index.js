import express from 'express'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from "./routes/categoryRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import db from './config/db.js';


//Create app
const app = express();
app.use(express.json());

dotenv.config();

//Cookie Parser
app.use(cookieParser())

//DB connection
try {
  await db.authenticate();
  db.sync();
  console.log('Correct connection to the database')
} catch (error) {
  console.log(error)
}

//----------------------------------------------------------

const permitedDomains = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function (origin, callback) {
      if (permitedDomains.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not permited by CORS"));
      }
    },
};

app.use(cors(corsOptions));

//----------------------------------------------------------

//Routing
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/transaction", transactionRoutes);


//Start project
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`);
});