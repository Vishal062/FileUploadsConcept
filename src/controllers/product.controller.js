const express = require('express');
//const { router } = require('..');
const upload = require("../middleware/file_uploads");

const router = express.Router();

const Product = require("../models/product.model"); //



//multer works as a middleware
router.post("/single", upload.single("productImages"), async function (req, res) {
    const product = await Product.create({
        title: req.body.title,
        price: req.body.price,
        image_urls: req.file.path
    })
    return res.status(201).send(product);
})

router.post(
  "/multiple",
  upload.any("productImage"),
    async function (req, res) {
      const filePaths = req.files.map(file => file.path)
    const product = await Product.create({
      title: req.body.title,
      price: req.body.price,
      image_urls: filePaths
    });
    return res.status(201).send(product);
  }
);

module.exports = router;