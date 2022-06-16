const userPermission = (permissionsValue) => (req, res, next) => {
  try {
    if (permissionsValue) {
      next();
    } else {
      return res.redirect("/errorRoute");
    }
  } catch (error) {
    const errorName = "Cant permissions";
    const errorDescription = error;
    return res.render("errorUser.ejs", { errorName, errorDescription });
  }
};

module.exports = userPermission;
