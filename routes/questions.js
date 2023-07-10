const { Router } = require('express');
const { getQuestions, getQuestionById, createQuestion, deleteQuestion } = require('../controllers/questions');
const router = Router();

router.get('/', getQuestions);
router.post('/', createQuestion);
router.get('/:id', getQuestionById);
router.delete('/:id', deleteQuestion);

module.exports = router;