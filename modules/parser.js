//import {DBFFile} from 'dbffile';
const URL_I = `./РАСПИСАНИЕ/1.dbf`; // инженерный факультет
const URL_G = `./РАСПИСАНИЕ/2.dbf`; // гуманитарный факультет
const LIMIT = 20000;

let urls = {
  3: URL_I,
  4: URL_G,
};

const db = require("dbffile");
const { utils } = require("./utils");

async function readFile(url) {
  if (!url) return [];

  let dbf = await db.DBFFile.open(url, {
    encoding: "cp866",
  });
  let records = await dbf.readRecords(LIMIT);

  return records;
}

const timetable = async (data) => {
  let timetable = await readFile(urls[data.group.slice(0, 1)]);

  // СПИСОК СОБЫТИЙ (actions)
  switch (data.type) {
    case "custom":
      let array = timetable
        .filter((x) => (data.group ? x.GROUP == data.group : false))
        //.filter((x) => (data.week ? x.WEEK == data.week : x))
        .filter((x) => {
          if (data.date) {
            let dateFrom = utils.convertToUnix(data.date.from);
            let dateTo = utils.convertToUnix(data.date.to);
            let date = utils.convertToUnix(x.DATE);

            if (date >= dateFrom && date <= dateTo) return x;
            return false;
          }
        });
      return array;

    // все расписание
    case "all":
      timetable.forEach((item) => {
        console.log(item);
      });
      return timetable;

    default:
      console.log("Error");
      return [];
  }
};

// test actions (все события)
let actions = {
  date: {
    type: "date",
    date: {
      from: "27.09.2021",
      to: "01.10.2021",
    },
  },
  week: {
    type: "week",
    week: 1,
  },
  all: {
    type: "all",
  },
  group: {
    type: "group",
    group: 406,
  },
  custom: {
    type: "custom",
    group: 406,
    date: {
      from: "27-09-2021",
      to: "01-10-2021",
    },
  },
};

// timetable(actions.custom); // тестовый запрос

// exports
exports.getTimeTable = timetable;

//
