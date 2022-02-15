const Router = require("express");
const router = new Router();
const config = require("config");

// controllers
const timetableController = require("../controllers/timetableControllers");

const { verification } = require(".././modules/middleware");

router.get("/timetable", verification, timetableController.timeTable);
router.post("/api/timetable", verification, timetableController.getTimeTable);

module.exports = router;
