const mongoose = require("mongoose");
const Order = require("./order");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	cart: {
		items: [
			{
				productId: {
					type: Schema.Types.ObjectId,
					ref: "Product",
					required: true
				},
				quantity: { type: Number, required: true }
			}
		]
	}
});

userSchema.methods.addToCart = function (productId) {
	const cartProductInd = this.cart.items.findIndex((cp) => {
		return cp.productId == productId;
	});
	let updatedCart;
	if (cartProductInd === -1) {
		updatedCart = {
			items: [...this.cart.items, { productId: productId, quantity: 1 }]
		};
	} else {
		const cartProduct = this.cart.items[cartProductInd];
		cartProduct.quantity += 1;
		const newItems = this.cart.items;
		newItems[cartProductInd] = cartProduct;
		updatedCart = { items: [...newItems] };
	}
	console.log(updatedCart);
	this.cart = updatedCart;
	return this.save();
};

userSchema.methods.getCart = function () {
	return this.cart.populate("items.productId");
};

userSchema.methods.removeCartProduct = function (productId) {
	const newCartItems = this.cart.items.filter(
		(item) => item.productId.toString() !== productId.toString()
	);
	this.cart.items = newCartItems;
	return this.save();
};

userSchema.methods.addOrder = function () {
	let cartItems = [];
	return this.cart
		.populate("items.productId")
		.then((cart) => {
			console.log("this is the cart items", cart.items);
			cartItems = cart.items;
			const order = new Order({
				items: cartItems,
				userId: this._id
			});
			console.log(order);
			return order.save();
		})
		.then(() => {
			this.cart.items = [];
			return this.save();
		})
		.catch((err) => console.log(err));
};

userSchema.methods.getOrders = function () {
	return Order.find().populate("items.productId");
};

module.exports = mongoose.model("User", userSchema);
