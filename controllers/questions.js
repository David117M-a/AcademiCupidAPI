const { request, response } = require("express");
const Question = require("../models/questions");

const getQuestions = async (req = request, res = response) => {
    const questions = await Question.find();
    return res.status(200).json(questions);
}

const getQuestionById = async (req = request, res = response) => {
    const { id } = req.params;
    const question = await Question.findById(id);
    return res.status(200).json(question);
}

const deleteQuestion = async (req = request, res = response) => {
    const { id } = req.params;
    const question = await Question.deleteOne({ _id: id });
    return res.status(200).json(question);
}

const createQuestion = async (req = request, res = response) => {
    const { body } = req;
    try {
        const alreadyRegistered = await Question.findOne({ question: body.question });
        if (alreadyRegistered) {
            return res.status(400).json({
                msg: 'Esta pregunta ya se encuentra registrada.'
            });
        }

        const newQuestion = new Question(body);
        const savedQuestion = await Question.create(newQuestion);
        return res.status(200).json(savedQuestion);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Something went wrong'
        });
    }
}

module.exports = {
    getQuestions,
    getQuestionById,
    createQuestion,
    deleteQuestion
}