const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (cb) => {
	MongoClient.connect(
		"mongodb+srv://mailakshat99:zedith9903@cluster0.0qj8u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
	)
		.then((client) => {
			_db = client.db();
			cb();
		})
		.catch((err) => {
			console.log(err);
		});
};
const getDb = () => {
	if (_db) {
		return _db;
	}
	throw "No database found!!";
};
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
