import { createItemNotes } from "./render.js";

Date.prototype.getWeekCurrent = function () {
  var onejan = new Date(this.getFullYear(), 0, 1);
  return Math.ceil(((this - onejan) / 86400000 + onejan.getDay() + 1) / 7) - 1;
};

Date.prototype.getWeek = function () {
  let target = new Date(this.valueOf());
  let dayNr = (this.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  let firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() != 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - target) / 604800000);
};

function getDateRangeOfWeek(weekNo) {
  let d1 = new Date();
  let numOfdaysPastSinceLastMonday = eval(d1.getDay() - 1);
  d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
  let weekNoToday = d1.getWeek();
  let weeksInTheFuture = eval(weekNo - weekNoToday);
  d1.setDate(d1.getDate() + eval(7 * weeksInTheFuture));
  let rangeIsFrom =
    d1.getDate() + "-" + eval(d1.getMonth() + 1) + "-" + d1.getFullYear();
  d1.setDate(d1.getDate() + 6);
  let rangeIsTo =
    d1.getDate() + "-" + eval(d1.getMonth() + 1) + "-" + d1.getFullYear();
  return [rangeIsFrom, rangeIsTo];
}

// notes
/*
 при создание - создаем див с нужным классом модалки
 при удаление (крестик) - удаляем с body этот класс
*/

class TabList {
  constructor(buttonsContainer, tabs) {
    this.buttonsContainer = buttonsContainer;
    this.tabs = tabs;

    this.buttonsContainer.addEventListener("click", (event) => {
      const index = event.target.closest(".button")?.dataset.value;
      if (index) this.openTab(index);
    });
  }

  openTab(index) {
    this.tabs.querySelector(".active").classList.remove("active");
    this.tabs.querySelector(`.tab--${index}`).classList.add("active");
  }
}

const renderNotes = (data) => {
  if (!data) return;

  const modal = document.querySelector(".modal");
  const buttonsContainer = modal.querySelector(".js-modal-buttons");
  const tabs = modal.querySelector(".js-modal-tabs");

  const tabList = new TabList(buttonsContainer, tabs);
  const heightItemModal = `50px`;
  modal.style.display = "flex";

  document.body.style.overflowY = "hidden"; // скрываем прокрутку body
  const closeModal = () => {
    document.body.style.overflowY = "auto";
    modal.style.display = "none";
  };

  document.querySelector(".modal__date").innerHTML = data;
  document.querySelector(".modal").addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) closeModal();
  });
  document
    .querySelector(".modal__close")
    .addEventListener("click", () => closeModal());

  // при загрузке новых items вешаем события
  const eventsItems = () => {
    const itemsModal = modal.querySelectorAll(".js-modal__item");

    itemsModal.forEach((item) => {
      let desc = item.querySelector(".text__desc");
      item.addEventListener("click", () => {
        desc.classList.toggle("text__desc-open");
        if (desc.classList.contains("text__desc-open"))
          desc.style.maxHeight = desc.scrollHeight + "px";
        else desc.style.maxHeight = heightItemModal;

        closeItems(desc);
      });
    });

    // закрыть все заметки, чтобы открыта была только одна
    const closeItems = (exclude) => {
      itemsModal.forEach((item) => {
        let desc = item.querySelector(".text__desc");
        if (exclude !== desc) {
          desc.classList.remove("text__desc-open");
          desc.style.maxHeight = heightItemModal;
        }
      });
    };
  };

  let divs = ``;

  for (let i = 0; i < 2; i++) {
    let params = {
      title: "Математика",
      desc: ` Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur
      doloribus eaque dolores repellat mollitia, atque accusantium amet
      reprehenderit debitis natus perferendis libero, tempore culpa eos
      unde iste aut? Porro, magnam!`,
    };
    divs += createItemNotes(params);
  }

  document.querySelector(".js-modal-items").innerHTML = divs;
  eventsItems();
};

const sendModalEditData = () => {
  let edit = document.querySelector(".js-modal-timetable-edit");
  let params = {
    title: edit.querySelector("input[name='title']").value,
    link: edit.querySelector("select[name='link']").value,
    desc: edit.querySelector("textarea[name='desc']").value,
    color: edit.querySelector("input[name='color']").value,
  };
  console.log(params);
};

let btnEditModal = document.querySelector(".edit__btn");
btnEditModal.addEventListener("click", sendModalEditData);

export { getDateRangeOfWeek, renderNotes };
