const { register,  login_post } = require("../controllers/AuthController");
const { posts, getPost } = require("../controllers/PostContoller");
const { checkUser } = require("../middleware/AuthMiddlewares");

const {Router } = require("express")
const router = Router();
router.get("/user", checkUser)
router.post("/register", register);
router.post("/login", login_post);
router.post("/post", posts);
router.get("/getPost", getPost)
module.exports = router;