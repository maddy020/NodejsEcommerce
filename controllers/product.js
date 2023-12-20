const Product = require("../models/Product");
// const Review = require("../models/Reviews");

const showallProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.render("products/index", { allProducts });
  } catch (error) {
    res.status(500).send("Something went wrong in all products route", error);
  }
};

const productForm = (req, res) => {
  try {
    res.render("products/new");
  } catch (error) {
    res
      .status(500)
      .send("Something went wrong in create new product route", error);
  }
};

const newProduct = async (req, res) => {
  try {
    const { img, name, price, desc } = req.body;
    await Product.create({ img, name, price, desc, author: req.user._id });
    req.flash("success", "Successfully added the product!");
    res.redirect("/products");
  } catch (error) {
    res
      .status(500)
      .send("Something went wrong in new product to database route", error);
  }
};

const productDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    });
    res.render("products/show", { product });
  } catch (error) {
    res
      .status(500)
      .send(
        "Something went wrong in details about one specific product route",
        error
      );
  }
};

const editForm = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render("products/edit", { product });
  } catch (error) {
    res
      .status(500)
      .send("Something went wrong in form to edit one product route", error);
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { img, name, price, desc } = req.body;
    await Product.findByIdAndUpdate(id, { img, name, price, desc });
    req.flash("success", "Successfully updated the product!");
    res.redirect(`/products/${id}`);
  } catch (error) {
    res
      .status(500)
      .send("Something went wrong in Update product in database route", error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // Delete all reviews associated with the product - Not a good practice for production level - refer the Product schema for actual implementation

    // const product = Product.findById(id);
    // for (let id of product.reviews) {
    //   await Review.findByIdAndDelete(id);
    // }

    await Product.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted the product!");
    res.redirect("/products");
  } catch (error) {
    res
      .status(500)
      .send(
        "Something went wrong in Delete product from database route",
        error
      );
  }
};

module.exports = {
  showallProducts,
  productForm,
  newProduct,
  productDetails,
  editForm,
  editProduct,
  deleteProduct,
};
