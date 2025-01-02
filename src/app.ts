import express from "express";
import cookieParser from 'cookie-parser'
import { connectToDatabase } from "./infrastructure/database/connection";
import userRouter from './interfaces/routes/userRoute';
import adminRouter from './interfaces/routes/adminRoute';
import companyRouter from './interfaces/routes/companyRoute'
import cors from 'cors'





const PORT = process.env.PORT || 3000;

// const target = {
//     origin: 'http://localhost:5173',
//     changeOrigin: true,
//     credentials: true,
//   };

const corsOptions = {
    origin: 'http://localhost:5000', // Frontend origin without trailing slash
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allowed HTTP methods
    credentials: true, // Enable cookies or credentials sharing
  };


const app = express();
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectToDatabase();


app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/company', companyRouter);




app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
