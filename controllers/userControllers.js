const User = require("../models/user");
const bcrypt = require("bcrypt");
const config = require("config");
const { validationResult } = require("express-validator");

exports.addUser = async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: "Некорректный запрос", errors });

    const { email, password, name, phone, address, date } = req.body;
    const reqDate = new Date();
    const candidate = await User.findOne({ email });

    if (candidate)
      return res
        .status(400)
        .json({ message: "Пользователь с таким email уже существует" });

    let hashPassword = await bcrypt.hash(password, 8);
    const user = new User({
      email,
      password: hashPassword,
      name,
      phone,
      address,
      date,
      reqDate,
    });

    console.log(user);
    await user.save();
    res.json("Пользователь создан :)");
  } catch (error) {
    res.json({ message: "Не все поля заполнены :(" });
  }
};

exports.getUsers = async function (req, res) {
  try {
    const users = await User.find({}, "-password");

    res.json(users);
  } catch (error) {
    res.json({ message: "Не все поля заполнены :(" });
  }
};

exports.findUser = async function (req, res) {
  try {
    let query = req.params["q"];
    let users = await User.find({}, "-password");

    res.json(user);
  } catch (error) {
    res.json({ message: "Не все поля заполнены :(", error });
  }
};

exports.getById = async function (req, res) {
  try {
    let id = req.params["id"];
    let user = await User.findOne({ _id: id });

    if (!user) return res.json({ error: "Пользователь с таким ID не найден" });

    res.json(user);
  } catch (error) {
    res.json({ message: "Пользователь с таким ID не найден" });
  }
};

/*@
  @ URL
  @ GET: /users  - вывод всех юзеров
  @ POST: /user/add { email, name, password...} - добавление юзера
  @ GET: /user:find/:params - поиск юзера по запросу { /user/find/params='Vlad' }
  @ GET: /user/id/:id - поиск юзера по ID
  @*/
