const renderTimetable = (data) => {
  document.querySelector(".timetable").innerHTML = "";

  if (!data.timetable?.length)
    //document.querySelector(".timetable").innerHTML =
    //"<h3 class='timatable-error-bg'>Расписание для указанной группы на эти дни не найдено!</h3>";

    document.querySelector(
      ".timetable"
    ).innerHTML = `<div class='timetable__error'>
      <h3 class='timatable-error-bg'>Расписание для указанной группы на эти дни не найдено!</h3> <br/>
    
      <table class="table-info-groups">
      <caption>Список существующих групп</caption>
        <thead>
            <tr>
                <th>Курс</th>
                <th>Гуманитарный</th>
                <th>Инженерный </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>411, 413а, 414, 415, 416</td>
                <td>311, 313, 314, 315, 316, 317</td>
            </tr> 
            <tr>
                <td>2</td>
                <td>401, 402, 403а, 403б, 404, 405, 406</td>
                <td>301, 303, 304, 305, 306, 307</td>
            </tr> 
            <tr>
                <td>3</td>
                <td>491, 492, 493а, 493б, 494, 495, 496</td>
                <td>391, 393, 394, 395, 396, 397</td>
            </tr> 
            <tr>
                <td>4</td>
                <td>481, 483а, 483б, 485, 486</td>
                <td>381, 383, 384, 385, 386, 387</td>
            </tr> 
        </tbody>
    </table>
  </div>
  `;

  data.timetable.forEach((item) => {
    let tr = ``;
    let info = {
      day_name: "",
      date: "",
    };

    item.forEach((pair, index) => {
      let time = data.times[index];
      info.day_name = pair != undefined ? pair[0].day_name : info.day_name;
      info.date = pair != undefined ? pair[0].date : info.date;

      if (pair !== undefined && pair !== null) {
        tr += `<tr>
          <td><p>${time ? time[0] : ""}<br/>${time ? time[1] : ""}</p></td>
          <td>
              <p>${pair[0].subj_type || ""}${pair[0].theme || ""}  ${
          pair[0].subject || ""
        } <br/>${pair
          .filter((x) => x.aud != undefined)
          .map((x) => `${x.aud}`)
          .join("<br/>")} </p>
          </td>
          <td class='p-5'>
              <p>${pair
                .filter((x) => x.name != undefined)
                .map((x) => `${x.name}`)
                .join("<br/>")}</p>
          </td>
      </tr> `;
      } else {
        tr += `<tr>
        <td><p>${time[0]}<br/>${time[1]}</p></td>
        <td>
            <p></p>
        </td>
        <td class='p-5'>
            <p></p>
        </td>
    </tr> `;
      }
    });

    let html = `<div class="timetable__item js-timetable-day">
        <div class="timetable__header">
            <img src="./img/table-icon.svg" alt="table-icon">
            <p>${info.day_name || ""}</p>
            <p class="js-timetable-date">${info.date || ""}</p>
        </div>

        <table class="timetable__table">
            <thead>
                <tr>
                    <th style="width: 15%;">Пара</th>
                    <th>Предмет</th> 
                    <th>Преподаватель</th> 
                </tr>
            </thead>
            <tbody>
                ${tr}
            </tbody>

        </table>
    </div>`;
    document.querySelector(".timetable").innerHTML += html;
  });
};

const createItemNotes = ({ title, desc }) => {
  return `
    <div class="modal__item js-modal__item">
    <img src="./img/icon.svg" alt="icon" />
    <div class="text">
      <p class="text__title">${title}</p>
      <p class="text__desc">
        ${desc}
      </p>
    </div>
    <img src="./img/m-arrow.svg" alt="icon" />
  </div>`;
};

export { renderTimetable, createItemNotes };
