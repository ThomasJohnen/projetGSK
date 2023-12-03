// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';
import plus from '../../assets/plus.svg';
import minus from '../../assets/minus.svg';
import edit from '../../assets/edit.svg';

/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */

async function addCategorytoNavbar(){
  const navbar = document.querySelector('#navbarDropdownMenuLink');
  const response = await fetch(`/api/categories/`);
  const categories = await response.json();
  categories.forEach(category => {
    const option = `
      <li><a class="dropdown-item" href="#" id=${category.id} >${category.name}</a></li>
    `;
    navbar.innerHTML += option;
  });
  const dropdown = document.querySelector('.dropdown-menu');
  dropdown.addEventListener('click', async (e) => {
    const id = e.target.getAttribute('id');
    const responseCategory = await fetch(`/api/produits/byCategory/${id}`);
    const category = await responseCategory.json();
    const principal = document.querySelector('#principal');
    principal.innerHTML = '';
    category.forEach(produit => {
      const infoProduit = `
      <div style="background-color: ${produit.color}" class="encart produit card col-md-3 col-sm-6 m-3 backgroundEncart text-white" id="${produit.id}">
        <div class="produitInfo card-body">
          <h2 class="card-title">${produit.nom}</h2>
          <p class="card-text">quantité en zone  : ${produit.zone}</br></p>
          <a type="button" class="btModalPlus" data-bs-toggle="modal" data-bs-target="#modalProduit" data-id="${produit.id}">
            <img src="${plus}">
          </a>
          <a type="button" class="btModalMinus" data-bs-toggle="modal" data-bs-target="#modalProduit" data-id="${produit.id}">
            <img src="${minus}">
          </a> 
          <a type="button" class="btModalEdit" data-bs-toggle="modal" data-bs-target="#modalProduit" data-id="${produit.id}">
            <img  src="${edit}">
          </a>
        </div>
      </div>`;
      principal.innerHTML += infoProduit;
    });
  });
  

};
const Navbar = () => {
  const navbarWrapper = document.querySelector('#navbarWrapper');
  const navbar = `
  <nav id="navBar" class="navbar navbar-expand-lg navbar-light bg-light">
        <div id="backNav" class="container-fluid">
          <a class="navbar-brand" href="/" data-uri="/">Logiciel de Produits GSK</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link colorNav" aria-current="page" href="#" data-uri="/">Accueil</a>
              </li>
              <li class="nav-item">
                <a class="nav-link colorNav" aria-current="page" href="#" data-uri="/add">ajouter un produit</a>
              </li>
              <li class="nav-item">
                <a class="nav-link colorNav" aria-current="page" href="#" data-uri="/delete">Supprimer un produit</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle colorNav" href="#"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Catégories
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" id="navbarDropdownMenuLink">
                </ul>
              </li>               
            </ul>
          </div>
        </div>
      </nav>
  `;
  navbarWrapper.innerHTML = navbar;
  addCategorytoNavbar();
};



export default Navbar;
