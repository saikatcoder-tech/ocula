import "./config/env.js";

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import crypto from "crypto";
import User from "./models/User.js";


import authRoutes from './routes/authRoutes.js'
import generationRoutes from "./routes/generationRoutes.js"
import protect from "./middleware/authMiddleware.js";
import paymentRoutes from "./routes/paymentRoutes.js";

//configuring server
const app = express();
const PORT = process.env.PORT || 5000;

//webhook API
app.post("/api/payment/webhook", express.raw({ type: "application/json" }),async(req,res) => {
    try {
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
        const signature = req.headers["x-razorpay-signature"];

        //check for verification
        const expectedSignature = crypto
            .createHmac("sha256", secret)
            .update(req.body)
            .digest("hex");

        //verification failed
        if (expectedSignature !== signature) {
            return res.status(400).json({ message: "Payment verification failed" }); 
        }

        //Event
        const event = JSON.parse(req.body.toString());

            //Check payment captured event
            if (event.event === "payment.captured") {
                const payment = event.payload.payment.entity;

                //getting user and credits from webhook
                const userId = payment.notes.userId;
                const credits = parseInt(payment.notes.credits); 


            //finiding user by webhook
            const user = await User.findById(userId);
            //updating credits
            if(user) {
                user.credits += credits;
                await user.save();
            }
        }
            
            return res.json({ status: "Webhook processed" });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })   
    }
}
)

//Middlewares
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/generation", generationRoutes);
app.use("/api/payment", paymentRoutes);

    //API
    app.get("/", (req,res) => {
        res.send("API Running");
    });
    //test-route
    app.get("/api/protected", protect, (req,res) => {
        return res.json({
            message: "You are authorized",
            user: req.user,
            id: req.user._id, 
        })
    })

//connectDB runs then only server will run
connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`); 
    });
})
.catch(error => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  
})







