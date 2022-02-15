const Router = require("express");
const router = Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const config = require("config");
const { check, validationResult } = require("express-validator");

const userController = require("../controllers/userControllers");

router.use("/test", (req, res) => {
  res.json({ message: "Hello" });
});

router.post(
  "/user/add",
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "Пароль должен быть больше 3 символов").isLength({
      min: 3,
    }),
  ],
  userController.addUser
);

router.get("/user/find/:q", userController.findUser);
router.get("/user/id/:id", userController.getById);
router.get("/users", userController.getUsers);

module.exports = router;

/*
router.post('/user', 
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Пароль должен быть больше 3 символов').isLength({ min: 3 })
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ message: 'Некорректный запрос', errors })
        
        const { email, password, name, phone, address, date } = req.body;
        const reqDate = new Date();
        const candidate = await User.findOne({ email })

        if (candidate) return res.status(400).json({ message: 'Пользователь с таким email уже существует' })
        let hashPassword = await bcrypt.hash(password, 8);
        let user = await User.findOne({ email, password: hashPassword, name, phone, address, date, reqDate })
 
        await user.save();
        res.json('Пользователь создан :)');

    } catch (error) {
        console.log(error);
        res.send({ message: 'Server error' })
    }
});
*/
