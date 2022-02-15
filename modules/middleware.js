function verification(req, res, next) {
  if (!req.session.user || req.session.user == undefined)
    return res.redirect("/registration");
  return next();
}

function isLogin(req, res, next) {
  if (req.session.user) return res.redirect("/timetable");
  return next();
}

/* ------------------------------------------------------------------------------------------------------ */

function checkSession(req, res, next) {
  if (!req.session.user) req.session.user = undefined;
  return next();
}
/* ------------------------------------------------------------------------------------------------------ */

function checkAdmin(req, res, next) {
  if (!req.session.user || req.session.user == undefined)
    return res.redirect("/");
  if (!req.session.user.admin) return res.redirect("/");
  return next();
}

module.exports = {
  verification,
  checkSession,
  isLogin,
};
