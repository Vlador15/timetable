const Router = require("express");
const router = new Router();
const { body, validationResult } = require("express-validator");

// schemas
const Users = require("../models/Users");

// controllers
const authController = require("../controllers/authControllers");
const { isLogin } = require(".././modules/middleware");

router
  .get("/registration", isLogin, authController.renderRegistration)
  .post("/registration", [
    body(
      "password",
      "Пароль должен содержать минимум 3 символа и не более 15"
    ).isLength({ min: 3, max: 15 }),
    body("name", "ФИО должно содержать не менее 3 символов").isLength({
      min: 3,
    }),
    body(
      "login",
      "Логин должен содержать минимум 3 символа и не более 15"
    ).isLength({ min: 3, max: 15 }),
    body("group", "Некорректно указан номер группы").isLength({
      min: 3,
      max: 3,
    }),
    body("facultet", "Некорректно указано название факультета").custom(
      (value) => {
        console.log(value);
        if (["и", "г"].includes(value.toLowerCase())) return true;
        return false;
      }
    ),
    authController.createUser,
  ]);

router
  .get("/authorization", isLogin, authController.renderAuthorization)
  .post("/authorization", [
    body(
      "password",
      "Пароль должен содержать минимум 3 символа и не более 15"
    ).isLength({ min: 3, max: 15 }),
    body(
      "login",
      "Логин должен содержать минимум 3 символа и не более 15"
    ).isLength({ min: 3, max: 15 }),
    authController.findUser,
  ]);

router.get("/logout", authController.logout);

module.exports = router;
