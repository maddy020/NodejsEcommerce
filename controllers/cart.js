const User = require("../models/User");

const showCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("cart");
    const totalAmount = user.cart.reduce((sum, curr) => sum + curr.price, 0);
    const productInfo = user.cart.map((product) => {
      return {
        img: product.img,
        name: product.name,
        price: product.price,
      };
    });
    res.render("cart/cart", { user, totalAmount, productInfo });
  } catch (error) {
    res
      .status(500)
      .send(
        "Something went wrong in showing product from showcart route",
        error
      );
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;
    // const product = await Product.findById(productId);
    // const user = await User.findById(userId);
    // user.cart.push(product);
    // await user.save();
    await User.findByIdAndUpdate(userId, { $addToSet: { cart: productId } });
    req.flash("success", "Product added to cart");
    res.redirect("/products");
  } catch (error) {
    res
      .status(500)
      .send(
        "Something went wrong in adding product from addtocart route",
        error
      );
  }
};

const removefromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;
    // const product = await Product.findById(productId);
    // const user = await User.findById(userId);
    // user.cart.pull(product);
    // await user.save();
    await User.findByIdAndUpdate(userId, { $pull: { cart: productId } });
    req.flash("success", "Product removed from cart");
    res.redirect("/user/cart");
  } catch (error) {
    res
      .status(500)
      .send(
        "Something went wrong in Delete product from removefromcart route",
        error
      );
  }
};

module.exports = { showCart, addToCart, removefromCart };
