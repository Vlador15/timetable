import { getTimeTable } from "./api.js";
import { renderTimetable } from "./render.js";
import { getDateRangeOfWeek, renderNotes } from "./utils.js";

// CONSTS

let WEEK = new Date().getWeekCurrent();
let GROUP = document.querySelector(".js-group").value;
let currentWeek = WEEK;

// открытие заметки
const notesEvents = () => {
  let days = document.querySelectorAll(".js-timetable-day");
  days.forEach((item) => item.addEventListener("click", () => openNotes(item)));
};

const openNotes = (item) => {
  let date = item.querySelector(".js-timetable-date").innerHTML;
  renderNotes(date);
};

// Изменение группы в input
let input = document.querySelector(".js-group");

input.addEventListener("input", (e) => {
  let g = e.target.value;
  if (g.length >= 4) input.value = g.slice(0, 4);
  GROUP = g;
  renderTable();
});

// create table
async function createTimetable(params) {
  let data = await getTimeTable(params);
  renderTimetable({ ...data });
}

async function createTimetableFromWeek(week) {
  let date = getDateRangeOfWeek(week);

  let data = await getTimeTable({
    type: "custom",
    group: GROUP,
    date: {
      from: date[0],
      to: date[1],
    },
  });
  renderTimetable({ ...data });
  notesEvents();
}

// Обработка изменений в календаре
let calendar = document.querySelector(".js-calendar");

// calendar && ... (для проверки, если существует такое)
if (calendar)
  calendar.addEventListener("change", (e) => {
    WEEK = calendar.value.split("-")[1].replace("W", "");
    currentWeek = WEEK;
    createTimetableFromWeek(WEEK);
    updateWeekText(WEEK);
  });

// Обработка нажатий на кнопки в расписании
let leftArrow = document.querySelector(".js-left-arrow");
let rightArrow = document.querySelector(".js-right-arrow");

// start
const updateWeekText = (week) => {
  let date = getDateRangeOfWeek(week);
  document.querySelector(".js-week-text").innerHTML = `${date[0]} - ${date[1]}`;
};

function renderTable() {
  const update = () => {
    createTimetableFromWeek(currentWeek);
    updateWeekText(currentWeek);
  };

  // загрузка расписания на текущую неделю
  update();

  leftArrow.onclick = function () {
    currentWeek--;
    update();
  };
  rightArrow.onclick = function () {
    currentWeek++;
    update();
  };
}

renderTable();
