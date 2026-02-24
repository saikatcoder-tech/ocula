import express from "express";
import protect from "../middleware/authMiddleware.js";
import Generation from "../models/Generation.js";
import generateWithGemini from "../utils/gemini.js";

const router = express.Router();

//CREATE GENERATION
router.post("/create", protect, async (req, res) => {
    try {
        const { inputText } = req.body;

        //check if input text is written or not
        if( !inputText ){
            return res.status(400).json({
                message: "Input text required"
            });
        }

        //check if user has credits or not
        if ( req.user.credits <= 0) {
            return res.status(403).json({
                message: "No credits remaining. Please purchase more."
            });
        }

        //AI RESPONSE
        const aiResponse = await generateWithGemini(inputText);

        //create generation
        const generation = await Generation.create({
            user: req.user._id,
            inputText,
            aiResponse,
        })

        //Deduct 1 credit and save
        req.user.credits = req.user.credits - 1;
        await req.user.save();

        res.status(201).json({
            message:"Generated successfully",
            generation,
            remainingCredits: req.user.credits
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
})

//get my generations
router.get("/my", protect, async (req, res) => {
    try {
        const generations = await Generation.find({ user: req.user._id}).sort({ createdAt: -1 });

        return res.status(201).json({
            message: "All generation fetched successfully",
            generations,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
})

export default router