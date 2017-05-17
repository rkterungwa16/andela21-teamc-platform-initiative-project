// ======================
// AUTH ROUTES
// ======================

// Show register form
app.get("/register", (req, res) => {
    res.render("signup");
});

// Sign up logic
app.post("/register", (req, res) => {
  var newUser = new User({username: req.body.username, fullname: req.body.fullname, email: req.body.email});
  User.register(newUser, req.body.password, (err, user) => {
    if (err){
      console.log(err);
      return res.render("signup")
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/andelainitiative");
    });
  });
});

// Login Logic
// Show login form
app.get("/login", (req, res) => {
  res.render("login", {message: req.flash("error")});
});

// Add login logic
app.post("/login", passport.authenticate("local", {
  successRedirect: "/andelainitiative",
  failureRedirect: "/login"
}), (req, res) => {
});

// Add logout route
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/andelainitiative");
})