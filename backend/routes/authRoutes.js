import express from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", async(req,res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        //check if user exists
        const userExists = await User.findOne({ email });
        if(userExists){
            return res.status(400).json({
                message: "User already exists"
            });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create user 
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            credits: 1,
        });

        return res.status(201).json({
            message: "User created successfully",
            user
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

//login
router.post("/login", async (req,res) => {
    try {
        const {email, password} = req.body

        //if no fields are there
        if(!email || !password){
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        //check if user is found
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                message: "Invalid email"
            });
        }

        //check for password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        //generate token for user
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        return res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                credits: user.credits,
            },
            message: "Logged in successfully"
        });


    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

//protected frontend route
router.get("/me", protect, (req, res) => {

    try {
        res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        credits: req.user.credits,
        message: "Authorized",
  });
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
  
});

export default router;