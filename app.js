const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
// const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
	// User.findById("615bfa46e42c632c55a5e9cb")
	// 	.then((user) => {
	// 		const newUser = new User(
	// 			user.username,
	// 			user.email,
	// 			user.cart,
	// 			user._id,
	// 			user.orders
	// 		);
	// 		req.user = newUser;
	// 		next();
	// 	})
	// 	.catch((err) => {
	// 		console.error(err);
	// 	});
	next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
	.connect(
		"mongodb+srv://mailakshat99:zedith9903@cluster0.0qj8u.mongodb.net/Shop?retryWrites=true&w=majority",
		() => {
			app.listen(3000);
			console.log(
				"Server listening on port :3000\nDatabase connected successfully"
			);
		}
	)
	.catch((error) => console.log(error));
