const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const errorController = require("./controllers/error");
const User = require("./models/user");

const URI =
	"mongodb+srv://mailakshat99:zedith9903@cluster0.0qj8u.mongodb.net/Shop";

const app = express();
const store = new MongoDBStore({ uri: URI, collection: "sessions" });

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
	session({
		secret: "My secret string",
		resave: false,
		saveUninitialized: false,
		store: store
	})
);

app.use((req, res, next) => {
	User.findById("615dc2bf62c3544ba55d0e40")
		.then((user) => {
			req.user = user;
			next();
		})
		.catch((err) => {
			console.error(err);
		});
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
	.connect(URI, () => {
		User.find().then((users) => {
			if (!users || users.length === 0) {
				const user = new User({
					username: "Akshat",
					email: "mailakshat99@gmail.com",
					cart: { items: [] }
				});
				user.save().then(() => {
					app.listen(3000);
					console.log(
						"\nServer listening on port :3000\nDatabase connected successfully"
					);
				});
			} else {
				app.listen(3000);
				console.log(
					"Server listening on port :3000\nDatabase connected successfully"
				);
			}
		});
	})
	.catch((error) => console.log(error));
