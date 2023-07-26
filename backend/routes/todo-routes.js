const {Router} = require("express");
const { getTodo, saveTodo, updateTodo, deleteTodo } = require("../controllers/todosController");

const router = Router()

router.get('/',getTodo)
router.post('/create',saveTodo)
router.post('/update',updateTodo)
router.get('/delete/:id',deleteTodo)

module.exports = router;