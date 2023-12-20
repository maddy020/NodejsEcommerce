const Product = require("./models/Product");

// Creating an array of products
const products = [
  {
    img: "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020.jpg.og.jpg?202308281437",
    name: "iPhone 12 Pro Max",
    price: 49999,
    desc: "Apple iPhone 12 Pro Max smartphone runs on iOS v14.1 operating system. The phone is powered by Hexa Core (2.65 GHz, Dual core, Lightning + 1.8 GHz, Quad core, Thunder) processor. It runs on the Apple A14 Bionic Chipset. It has 6 GB RAM and 64 GB internal storage.",
  },
  {
    img: "https://images.samsung.com/is/image/samsung/levant-feature-epic--in-every-way-418978825?$FB_TYPE_A_MO_JPG$",
    name: "Samsung Galaxy S21 Ultra",
    price: 80000,
    desc: "Samsung Galaxy S21 Ultra smartphone runs on Android v11 operating system. The phone is powered by Octa core (2.9 GHz, Single core, Cortex X1 + 2.8 GHz, Tri core, Cortex A78 + 2.2 GHz, Quad core, Cortex A55) processor. It runs on the Samsung Exynos 2.9 GHz Chipset. It has 12 GB RAM and 128 GB internal storage.",
  },
  {
    img: "https://data1.ibtimes.co.in/en/full/759126/oneplus-9-pro-review.jpg",
    name: "OnePlus 9 Pro",
    price: 45999,
    desc: "OnePlus 9 Pro smartphone runs on Android v11 operating system. The phone is powered by Octa core (2.84 GHz, Single core, Kryo 680 + 2.42 GHz, Tri core, Kryo 680 + 1.8 GHz, Quad core, Kryo 680) processor. It runs on the Qualcomm Snapdragon 888 Chipset. It has 8 GB RAM and 128 GB internal storage.",
  },
  {
    img: "https://i.gadgets360cdn.com/large/Mi_11_ultra_limited_sale_1625482289363.jpg",
    name: "Xiaomi Mi 11 Ultra",
    price: 32999,
    desc: "Xiaomi Mi 11 Ultra smartphone runs on Android v11 operating system. The phone is powered by Octa core (2.84 GHz, Single core, Kryo 680 + 2.42 GHz, Tri core, Kryo 680 + 1.8 GHz, Quad core, Kryo 680) processor. It runs on the Qualcomm Snapdragon 888 Chipset. It has 8 GB RAM and 128 GB internal storage.",
  },
  {
    img: "https://www.digitaltrends.com/wp-content/uploads/2022/10/Pixel-5-and-Pixel-7-Camera-Modules.jpg?fit=3000%2C2000&p=1",
    name: "Google Pixel 5",
    price: 66999,
    desc: "Google Pixel 5 smartphone runs on Android v11 operating system. The phone is powered by Octa core (2.4 GHz, Single core, Kryo 475 + 2.2 GHz, Tri core, Kryo 475 + 1.8 GHz, Quad core, Kryo 475) processor. It runs on the Qualcomm Snapdragon 765G Chipset. It has 8 GB RAM and 128 GB internal storage.",
  },
];

// Function to seed the database
const seedDB = async () => {
  await Product.insertMany(products);
  console.log("DB Seeded");
};

module.exports = seedDB;
