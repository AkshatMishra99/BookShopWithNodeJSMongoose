const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	imageUrl: {
		type: String,
		required: true
	}
});
module.exports = mongoose.model("Product", productSchema);

// const mongodb = require("mongodb");
// class Product {
// 	constructor(title, price, description, imageUrl, userId, id) {
// 		this.title = title;
// 		this.price = price;
// 		this.description = description;
// 		this.imageUrl = imageUrl;
// 		this.userId = userId;
// 		if (id) this._id = new mongodb.ObjectId(id);
// 	}
// 	save() {
// 		const db = getDb();
// 		let dbop;
// 		if (this._id) {
// 			dbop = db.collection("products").updateOne(
// 				{ _id: this._id },
// 				{
// 					$set: this
// 				}
// 			);
// 		} else {
// 			dbop = db.collection("products").insertOne(this);
// 		}
// 		return dbop
// 			.then((result) => {
// 				console.log(result);
// 			})
// 			.catch((error) => {
// 				console.log(error);
// 			});
// 	}
// 	static deleteById(id) {
// 		const db = getDb();
// 		return db
// 			.collection("products")
// 			.deleteOne({ _id: new mongodb.ObjectId(id) })
// 			.then((result) => {
// 				console.log(result);
// 				return result;
// 			})
// 			.catch((error) => {
// 				console.log(error);
// 			});
// 	}
// 	static fetchAll() {
// 		const db = getDb();
// 		return db
// 			.collection("products")
// 			.find()
// 			.toArray()
// 			.then((products) => {
// 				return products;
// 			})
// 			.catch((error) => {
// 				console.log(error);
// 			});
// 	}
// 	static findById(id) {
// 		const db = getDb();
// 		return db
// 			.collection("products")
// 			.find({ _id: new mongodb.ObjectId(id) })
// 			.next()
// 			.then((product) => {
// 				return product;
// 			})
// 			.catch((error) => console.log(error));
// 	}
// }

// module.exports = Product;
