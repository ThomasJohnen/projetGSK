const express = require('express');
const {getAllCategories} = require('../models/categories');


const router = express.Router();

router.get("/", (req, res) => {

    const categories = getAllCategories();

    return res.json(categories);
});

module.exports = router;