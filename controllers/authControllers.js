const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.renderRegistration = async function (req, res) {
  res.render("registration", { user: req.session.user });
};

exports.createUser = async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ message: "Ошибка сервера", errors: errors.array() });
    }

    const { login, password, group, facultet, name } = req.body;
    const candidate = await Users.findOne({ login });

    if (candidate) {
      return res.json({
        message: "Ошибка сервера",
        errors: [
          {
            msg: "Пользователь с таким логином уже существует",
            param: "login",
          },
        ],
      });
    }
    const hashPassword = await bcrypt.hash(password, 8);
    const user = new Users({
      name,
      login,
      password: hashPassword,
      group: Number(group),
      facultet,
      adminLevel: 1,
      notes: [],
    });
    await user.save();

    let dataUser = {
      name: user.name,
      group: user.group,
      facultet: user.facultet,
      login: user.login,
      notes: user.notes,
    };

    req.session.user = user;
    res.json({ success: true, user: dataUser, errors: [] });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
};

exports.renderAuthorization = async function (req, res) {
  res.render("authorization", { user: req.session.user });
};

const addError = (msg, param) => {
  return {
    message: "Ошибка сервера",
    errors: [
      {
        msg,
        param,
      },
    ],
  };
};

exports.findUser = async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ message: "Ошибка сервера", errors: errors.array() });
    }

    const { login, password } = req.body;
    const candidate = await Users.findOne({ login });

    if (!candidate)
      return res.json(
        addError("Пользователь с таким логином/паролем не найден", "password")
      );

    let isValidPassword = await bcrypt.compare(password, candidate.password);
    if (!isValidPassword)
      return res.json(
        addError("Пользователь с таким логином/паролем не найден", "password")
      );

    let dataUser = {
      name: candidate.name,
      group: candidate.group,
      facultet: candidate.facultet,
      login: candidate.login,
      notes: candidate.notes,
    };
    req.session.user = candidate;

    res.json({ success: true, user: dataUser, errors: [] });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
};

exports.logout = async function (req, res) {
  req.session.user = null;
  res.redirect("/authorization");
};
