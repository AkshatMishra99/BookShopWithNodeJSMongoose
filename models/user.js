// const mongodb = require("mongodb");

// const { ObjectId } = mongodb;
// class User {
// 	constructor(username, email, cart, id, orders) {
// 		this.username = username;
// 		this.email = email;
// 		this.cart = cart;
// 		this._id = id;
// 		this.orders = orders;
// 	}
// 	save() {
// 		const db = getDb();
// 		return db.collection("users").insertOne(this);
// 	}
// 	addToCart(productId) {
// 		const cartProductInd = this.cart.items.findIndex((cp) => {
// 			return cp.productId == productId;
// 		});
// 		let updatedCart;
// 		if (cartProductInd === -1) {
// 			updatedCart = {
// 				items: [
// 					...this.cart.items,
// 					{ productId: new ObjectId(productId), quantity: 1 }
// 				]
// 			};
// 		} else {
// 			const cartProduct = this.cart.items[cartProductInd];
// 			cartProduct.quantity += 1;
// 			const newItems = this.cart.items;
// 			newItems[cartProductInd] = cartProduct;
// 			updatedCart = { items: [...newItems] };
// 		}
// 		console.log(updatedCart);
// 		const db = getDb();
// 		return db
// 			.collection("users")
// 			.updateOne(
// 				{ _id: new ObjectId(this._id) },
// 				{ $set: { cart: updatedCart } }
// 			);
// 	}
// 	getCart() {
// 		const db = getDb();
// 		const cartItems = this.cart.items;
// 		return db
// 			.collection("products")
// 			.find({
// 				_id: { $in: cartItems.map((cartItem) => cartItem.productId) }
// 			})
// 			.toArray()
// 			.then((products) => {
// 				const newProducts = products.map((product) => {
// 					const qty = cartItems.find(
// 						(cartItem) =>
// 							cartItem.productId.toString() ===
// 							product._id.toString()
// 					).quantity;
// 					return { ...product, quantity: qty };
// 				});
// 				return newProducts;
// 			})
// 			.catch((error) => console.error(error));
// 	}
// 	removeCartProduct(productId) {
// 		const db = getDb();
// 		console.log(productId);
// 		const cartItems = this.cart.items.filter(
// 			(item) => item.productId.toString() !== productId.toString()
// 		);
// 		console.log(cartItems, this.cart.items, productId);
// 		return db.collection("users").updateOne(
// 			{ _id: new ObjectId(this._id) },
// 			{
// 				$set: {
// 					cart: { items: [...cartItems] }
// 				}
// 			}
// 		);
// 	}
// 	addOrder() {
// 		const db = getDb();
// 		return this.getCart()
// 			.then((products) => {
// 				const order = {
// 					items: products,
// 					user: {
// 						_id: new ObjectId(this._id),
// 						name: this.username
// 					}
// 				};
// 				return db
// 					.collection("orders")
// 					.insertOne(order)
// 					.then((order) => {
// 						console.log(order);
// 						const orders = this.orders || [];
// 						orders.push(order.insertedId);
// 						return db.collection("users").updateOne(
// 							{ _id: new ObjectId(this._id) },
// 							{
// 								$set: {
// 									cart: { items: [] },
// 									orders: orders
// 								}
// 							}
// 						);
// 					});
// 			})
// 			.catch((error) => console.log(error));
// 	}
// 	getOrders() {
// 		const ordersId = this.orders;
// 		console.log(this);
// 		const db = getDb();
// 		return db
// 			.collection("orders")
// 			.find({
// 				"user._id": new ObjectId(this._id)
// 			})
// 			.toArray()
// 			.then((orders) => {
// 				console.log("3: these are the complete orders: ", orders);
// 				return orders;
// 			})
// 			.catch((error) => console.log(error));
// 	}
// 	static findById(id) {
// 		const db = getDb();
// 		return db.collection("users").findOne({ _id: new ObjectId(id) });
// 	}
// }
// module.exports = User;
