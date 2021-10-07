exports.getLogin = (req, res, next) => {
	console.log(req.get("Cookie"));
	res.render("auth/login", { pageTitle: "Login", path: "/login" });
};

exports.postLogin = (req, res, next) => {
	res.setHeader("Set-Cookie", "logginIn=true");
	res.redirect("/");
};
