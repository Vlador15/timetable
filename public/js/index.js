import { api } from "./api.js";

const menuBurger = document.querySelector(".menu-burger");
const aside = document.querySelector(".aside");

// open menu
menuBurger.addEventListener("click", (e) => {
  e.preventDefault();
  aside.classList.toggle("aside-open");
});

// reset
const resetAuth = () => {
  let list = document.querySelectorAll(".auth__error");
  list.forEach((item) => item.parentNode.removeChild(item));
};

// logout
// let btn_logout = document.querySelector(".menu__logout");
// let logout = () => {
//   //localStorage.removeItem("user");
//   window.location = "/logout";
// };
//if (btn_logout) btn_logout.addEventListener("click", () => logout());

// registration
const reg_btn = document.querySelector(".js-registration");
const registration = async () => {
  let list = document.querySelectorAll(".auth__body [name]");
  let params = {};

  list.forEach((x) => (params[x.getAttribute("name")] = x.value));

  let data = await api("http://localhost:5001/registration", params, "post");

  if (data.success) {
    resetAuth();
    //localStorage.user = JSON.stringify(data.user);
    window.location = "/timetable";
  }

  if (data.errors?.length > 0) {
    // очистка предыдущих ошибок
    resetAuth();

    // вывод новых ошибок
    data.errors.forEach((x) => {
      document
        .querySelector(`.auth__body [name='${x.param}']`)
        .insertAdjacentHTML(
          "afterEnd",
          `<div class="auth__error">${x.msg}</div>`
        );
    });
  }
};
if (reg_btn) reg_btn.addEventListener("click", registration);

// authorization
const auth_btn = document.querySelector(".js-authorization");
const authorization = async () => {
  let list = document.querySelectorAll(".auth__body [name]");
  let params = {};

  list.forEach((x) => (params[x.getAttribute("name")] = x.value));
  let data = await api("http://localhost:5001/authorization", params, "post");

  if (data.success) {
    resetAuth();
    //localStorage.user = JSON.stringify(data.user);
    window.location = "/timetable";
  }

  if (data.errors?.length > 0) {
    // очистка предыдущих ошибок
    resetAuth();

    // вывод новых ошибок
    data.errors.forEach((x) => {
      document
        .querySelector(`.auth__body [name='${x.param}']`)
        .insertAdjacentHTML(
          "afterEnd",
          `<div class="auth__error">${x.msg}</div>`
        );
    });
  }
};
if (auth_btn) auth_btn.addEventListener("click", authorization);
