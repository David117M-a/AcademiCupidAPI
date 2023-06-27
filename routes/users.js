const { Router } = require('express');
const { getUsers, createUser, getUserById, updateUser, match } = require('../controllers/users');
const router = Router();

router.get('/findpeople/:id', getUsers);
router.post('/', createUser);
router.post('/match', match);
router.get('/:id', getUserById);
router.put('/', updateUser);

module.exports = router;