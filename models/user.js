const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

const { ObjectId } = mongodb;
class User {
	constructor(username, email, cart, id) {
		this.username = username;
		this.email = email;
		this.cart = cart;
		this._id = id;
	}
	save() {
		const db = getDb();
		return db.collection("users").insertOne(this);
	}
	addToCart(productId) {
		const cartProductInd = this.cart.items.findIndex((cp) => {
			return cp.productId == productId;
		});
		let updatedCart;
		if (cartProductInd === -1) {
			updatedCart = {
				items: [
					...this.cart.items,
					{ productId: new ObjectId(productId), quantity: 1 }
				]
			};
		} else {
			const cartProduct = this.cart.items[cartProductInd];
			cartProduct.quantity += 1;
			const newItems = this.cart.items;
			newItems[cartProductInd] = cartProduct;
			updatedCart = { items: [...newItems] };
		}
		console.log(updatedCart);
		const db = getDb();
		return db
			.collection("users")
			.updateOne(
				{ _id: new ObjectId(this._id) },
				{ $set: { cart: updatedCart } }
			);
	}
	getCart() {
		const db = getDb();
		const cartItems = this.cart.items;
		return db
			.collection("products")
			.find({
				_id: { $in: cartItems.map((cartItem) => cartItem.productId) }
			})
			.toArray()
			.then((products) => {
				let newCartItems = [];
				if (products.length === cartItems.length) {
					newCartItems = cartItems.map((cartItem, ind) => {
						const product = products.find(
							(p) =>
								p._id.toString() ===
								cartItem.productId.toString()
						);
						console.log(cartItem, product);
						cartItem.product = product;
						return cartItem;
					});
				}
				return newCartItems;
			})
			.catch((error) => console.error(error));
	}
	removeCartProduct(productId) {
		const db = getDb();
		console.log(productId);
		const cartItems = this.cart.items.filter(
			(item) => item.productId.toString() !== productId.toString()
		);
		console.log(cartItems, this.cart.items, productId);
		return db.collection("users").updateOne(
			{ _id: new ObjectId(this._id) },
			{
				$set: {
					cart: { items: [...cartItems] }
				}
			}
		);
	}
	static findById(id) {
		const db = getDb();
		return db.collection("users").findOne({ _id: new ObjectId(id) });
	}
}
module.exports = User;
