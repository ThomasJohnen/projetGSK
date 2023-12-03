const path = require('node:path');
const { parse } = require("../utils/json");

const categoryPath = path.join(__dirname, "/../data/category.json");

const CATEGORIES = [];

function getAllCategories(){
    const categories = parse(categoryPath, CATEGORIES);
    return categories;
};

function ifCategoryExists(categoryId){
    const categories = parse(categoryPath, CATEGORIES);
    const categoryFound = categories.findIndex(c => c.id === categoryId);
    return categoryFound.id;
};

/*

function getColor(category){
    const categories = parse(categoryPath, CATEGORIES);
    const categoryFound = categories.findIndex(c => c.id === category);
    return categoryFound.color;
};
*/

function getCategoryById(id){
    const categories = parse(categoryPath, CATEGORIES);
    const category = categories.find(c => c.id === id);
    return category;
};

module.exports = {
    getAllCategories,
    ifCategoryExists,
    getCategoryById
};