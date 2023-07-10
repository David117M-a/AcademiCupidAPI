const { Router } = require('express');
const { getUsers, createUser, getUserById, updateUser, match, answerQuestion } = require('../controllers/users');
const router = Router();

router.get('/findpeople/:id', getUsers);
router.post('/', createUser);
router.post('/match', match);
router.get('/:id', getUserById);
router.put('/', updateUser);
router.post('/answer/:userId', answerQuestion);

module.exports = router;