const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: String, required: true },
    questions: [
        {
            questionText: String,
            correctAnswer: String, // Store the correct answer for each question
            options: [String] // Multiple choice options (optional)
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quiz', QuizSchema);
