import express from "express"
import 'dotenv/config'
import cors from "cors"
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js"
import orderRouter from "./routes/orderRoutes.js"
import productRouter from "./routes/productRoutes.js"
import categoryRouter from "./routes/categoryRoutes.js"
import cartRouter from "./routes/cartRoutes.js";

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/cart", cartRouter);

app.get('/', (req, res)=> {
    res.send("API Working");
})

app.listen(port, ()=> {
    console.log("Server is running on Port: "+ port);
});