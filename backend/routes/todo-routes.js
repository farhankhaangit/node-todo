const {Router} = require("express");
const { getTodo, saveTodo } = require("../controllers/todosController");

const router = Router()

router.get('/',getTodo)
router.post('/create',saveTodo)

module.exports = router;