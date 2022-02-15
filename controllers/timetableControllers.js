const timetable = require("../modules/parser");
const times = [
  ["09:00", "10:30"],
  ["10:45", "12:15"],
  ["12:30", "14:00"],
  ["14:40", "16:10"],
  ["16:25", "17:55"],
];

let days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

exports.timeTable = async function (req, res) {
  res.render("timetable", { times, user: req.session.user || null });
};

// POST - вернет двумерный массив с расписанием
exports.getTimeTable = async function (req, res) {
  let defaultParams = {
    type: "all",
  };
  let data = await format(req.body || defaultParams);

  res.json({ timetable: data, times });
};

// Делит один массив на подмассивы (сколько дней - столько массивов)
const splitter = (data) => {
  let arr = [];
  let index = -1;
  let currentValue = 0;

  let res = data.map((item) => {
    if (+item.DAY !== currentValue) {
      currentValue = +item.DAY;
      arr.push([]);
      index++;
    }
    arr[index].push(item);
  });
  return arr;
};

const format = async (data) => {
  let obj = splitter(await timetable.getTimeTable(data));

  let lessons = obj.map((item, index) => {
    let les = [];

    item.map((x) => {
      if (!les[x.LES - 1]) les[x.LES - 1] = [];
      les[x.LES - 1].push({
        id: x.ID,
        group: x.GROUP,
        day: x.DAY,
        les: x.LES,
        aud: x.AUD,
        name: x.NAME,
        subject: x.SUBJECT,
        subj_type: x.SUBJ_TYPE,
        date: x.DATE,
        theme: x.THEME,
        faculty: x.FACULTY,
        day_name: days[+x.DAY - 1], // потому что с 1 дня идет отсчет
      });
    });

    return les;
  });

  for (let i = 0; i < 6; i++) {
    let day = i + 1;

    // добавляем пустые дни, если нет пар
    if (lessons[i]) {
      if (lessons[i][0]) {
        if (+lessons[i][0][0].day != day)
          lessons.splice(i, 0, [[{ day_name: days[i] }]]);
      }

      // если меньше 4х пар, то добавляем пустые строки
      if (lessons[i].length < 4) lessons[i].length = 4;
    } else
      lessons.splice(i, 0, new Array(4).fill([{ day_name: days[i] }], 0, 1));
  }

  return lessons;
};

function convertToUnix(date) {
  let newDate = parserDate(date);
  return new Date(newDate).getTime() / 1000;
}

function convertToDate(date) {
  let newDate = parserDate(date);
  return [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ][new Date(newDate).getDay()];
}

function parserDate(date) {
  return date.split("-").reverse();
}

/*
 {
    GROUP: '406',
    DAY: '5',
    LES: '2',
    AUD: '1/307(ЭП)',
    WEEK: '5',
    SUBG: '',
    POST: '',
    NAME: 'Гудков Б.Н.',
    SUBJECT: 'Размещение производительных сил',
    SUBJ_TYPE: 'См',
    DATE: '1-10-2021',
    CAFEDRA: '№41 Экономики, менеджмента и организации государственных закупок',
    THEME: '3.2',
    ID: '19603',
    COURSE: '2',
    FACULTY: '38.03.01 Экономика',
    FORMOBUCH: ''
  }
*/

/*const timetable = [
    {
      day: "Понедельник",
      date: "27.09",
      subjects: [
        [
          "л1.3 Инструментальные средства прикладного программирования",
          "Чискидов С.В.",
        ],
        [
          "л1.3 Инструментальные средства прикладного программирования",
          "Чискидов С.В.",
        ],
        ["ПЗ3.3 Базы данных", "Безвесильная А.А"],
        ["л2.1 Инженерная защита населения и территорий", "Юхин А.Н."],
      ],
    },
    {
      day: "Вторник",
      date: "28.09",
      subjects: [
        ["л1.1 Управление требованиями к ПО", "Саяпин О.В"],
        ["л1.1 Управление требованиями к ПО", "Саяпин О.В"],
        ["л2.2 Мероприятия РХЗ в чрезвычайных ситуациях", "Нагорный Д.Н."],
      ],
    },
  ]; */
