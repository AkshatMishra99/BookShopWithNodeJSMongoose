const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
	res.render("admin/edit-product", {
		pageTitle: "Add Product",
		path: "/admin/add-product",
		editing: false
	});
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
	const product = new Product({
		title,
		price,
		description,
		imageUrl,
		userId: req.user._id
	});
	product.save().then((result) => {
		console.log(result);
		res.redirect("/");
	});
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect("/");
	}
	const prodId = req.params.productId;
	Product.findById(prodId)
		.then((product) => {
			if (!product) {
				return res.redirect("/");
			}
			res.render("admin/edit-product", {
				pageTitle: "Edit Product",
				path: "/admin/edit-product",
				editing: editMode,
				product: product
			});
		})
		.catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
	const id = req.body.productId;
	const { title, price, imageUrl, description } = req.body;
	Product.updateOne({ _id: id }, { title, price, description, imageUrl })
		.then((result) => {
			console.log("UPDATED PRODUCT!", result);
			res.redirect("/admin/products");
		})
		.catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
	Product.find()
		// .select("title price -_id")
		// .populate("userId", "name")
		.then((products) => {
			console.log(products);
			res.render("admin/products", {
				prods: products,
				pageTitle: "Admin Products",
				path: "/admin/products"
			});
		})
		.catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	Product.deleteOne({ _id: prodId })
		.then((result) => {
			console.log("DESTROYED PRODUCT", result);
			res.redirect("/admin/products");
		})
		.catch((err) => console.log(err));
};
