import express from "express";
import Razorpay from "razorpay";
import protect from "../middleware/authMiddleware.js"


const router = express.Router();

export const getRazorpayInstance = () => {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
};


//Create Order
router.post("/create-order", protect, async(req,res) => {

    const razorpay = getRazorpayInstance();

    console.log("KEY:", process.env.RAZORPAY_KEY_ID);

    try {
        //getting the package
        const { packageType } = req.body;

        let credits = 0;
        let amount = 0;

        //making credits and amount
        if(packageType === "basic") {
            credits = 2;
            amount = 200;
        }
        else if(packageType === "pro") {
            credits = 6;
            amount = 400;
        }
        else if(packageType === "ultimate") {
            credits = 15;
            amount = 1000; 
        }
        else {
            return res.status(400).json({
                message: "Invalid package"
            });
        }

        //creating option
        const options = {
            amount,
            currency: "INR",
            receipt: "receipt_" + Date.now(),
            notes: {
                userId: req.user._id.toString(),
                credits: credits.toString(),
            },
        };

        //creating order
        const order = await razorpay.orders.create(options);

        //success return
        return res.status(201).json({
            order,
            key: process.env.RAZORPAY_KEY_ID
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message, 
        });
    }
});

export default router;