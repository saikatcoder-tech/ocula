import mongoose from "mongoose";

const generationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        inputText: {
            type: String,
            required: true,
        },

        aiResponse: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Generation = mongoose.model("Generation", generationSchema);

export default Generation;