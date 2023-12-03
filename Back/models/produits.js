const path = require('node:path');
const { parse, serialize } = require("../utils/json");

const {getCategoryById} = require("./categories");


const filePath = path.join(__dirname, "/../data/produits.json");
const PRODUITS = [];


function getAllProduits(){
    const produits = parse(filePath, PRODUITS);

    produits.sort((a, b) => a.nom.localeCompare(b.nom));
    return produits;
};

function createProduit(nom, entree, sortie, zone, categoryProduit){
    const produits = parse(filePath, PRODUITS);
    const category = getCategoryById(categoryProduit);
    const categoryName = category.name;
    const colorName = category.color;
    const id = produits.length + 1;
    const produit = {
        "id": id,
        "nom": nom, 
        "entree": entree, 
        "sortie": sortie,
        "zone": zone,
        "category": categoryName,
        "color": colorName
    }

    produits.push(produit);
    serialize(filePath, produits);

    return produit;
};

function deleteProduct(id){

    const produits = parse(filePath, PRODUITS);
    const position = produits.findIndex(produit => produit.id === id);
    if(position < 0){
        return null;
    }

    const produitsSupprimes = produits.splice(position, 1);
    const produitSupprime = produitsSupprimes[0];
    serialize(filePath, produits);
    return produitSupprime;
};

function modifyEntreeProduit(id, entree){
    const produits = parse(filePath, PRODUITS);
    const position = produits.findIndex(produit => produit.id === id);
    if(position < 0){
        return null;
    }

    const produitToUpdate = produits[position];
    produitToUpdate.entree += entree;
    produitToUpdate.zone += entree;

    produits[position] = produitToUpdate;

    serialize(filePath, produits);
    return produitToUpdate;
};

function modifySortieProduit(id, sortie){
    const produits = parse(filePath, PRODUITS);
    const position = produits.findIndex(produit => produit.id === id);
    if(position < 0){
        return null;
    }

    const produitToUpdate = produits[position];
    produitToUpdate.sortie += sortie;
    if((produitToUpdate.zone - sortie) < 0){
        return null;
    }
    produitToUpdate.zone -= sortie;

    produits[position] = produitToUpdate;

    serialize(filePath, produits);
    return produitToUpdate;
};

function modifyAllProduit(id, entree, sortie, zone){

    const produits = parse(filePath, PRODUITS);
    const position = produits.findIndex(produit => produit.id === id);
    if(position < 0){
        return null;
    }
    const produitToUpdate = produits[position];
    produitToUpdate.entree = entree;
    produitToUpdate.sortie = sortie;
    produitToUpdate.zone = zone;
    produits[position] = produitToUpdate;

    serialize(filePath, produits);
    return produitToUpdate;
};

function getProduitById(id){
    const produits = parse(filePath, PRODUITS);
    const position = produits.findIndex(produit => produit.id === id);
    if(position < 0){
        return null;
    }
    const produit = produits[position];
    return produit;
};

function getAllProductsOfCategory(categoryName){
    const produits = parse(filePath, PRODUITS);
    const produitsOfCategory = produits.filter(produit => produit.category === categoryName);
    return produitsOfCategory;
};

module.exports = {
    getAllProduits,
    createProduit,
    deleteProduct,
    modifyEntreeProduit,
    modifySortieProduit,
    modifyAllProduit,
    getProduitById,
    getAllProductsOfCategory
};