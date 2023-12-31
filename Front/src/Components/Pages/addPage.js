import { clearPage } from "../../utils/render";

const pageAddForm = `
    <div class="container mt-5" id="box">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card" id="shadow">
                    <div class="card-header">
                        <h3 class="card-title">Formulaire de création</h3>
                    </div>
                    <div class="card-body">
                        <form id="addForm">
                        <div class="mb-3">
                            <label for="nomProduit" class="form-label">Nom du produit :</label>
                            <input type="text" class="form-control" id="nomProduit" name="nomProduit" required>
                        </div>
                        <label for="category" class="form-label">Sélectionner la catégorie :</label>
                        <select class="form-select" id="categorieProduit" name="categorieProduit" required>
                            <!-- Ajoutez autant d'options que nécessaire pour vos catégories -->
                        </select>
                        <div class="mb-3">
                            <label for="entreeProduit" class="form-label">Nombre de produit entrée :</label>
                            <input type="number" class="form-control" id="entreeProduit" name="entreeProduit" required>
                        </div>
                        <div class="mb-3">
                            <label for="sortieProduit" class="form-label">Nombre de produit sortie :</label>
                            <input type="number" class="form-control" id="sortieProduit" name="sortieProduit" required>
                        </div>
                        <div class="mb-3">
                            <label for="zoneProduit" class="form-label">Nombre de produit en zone :</label>
                            <input type="number" class="form-control" id="zoneProduit" name="zoneProduit" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Ajouter</button>
                        </form>
                        <div id="resultat" class="pt-3 text-center"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;


    const getCategories = async () => {
        const response = await fetch("/api/categories/");
        if(!response.ok){
            throw new Error("Impossible de récupérer les catégories");
        };
        const categories = await response.json();
        return categories;

    };

    const renderCategories = async () => {
        const categories = await getCategories();
        const select = document.querySelector("#categorieProduit");
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category.id;
            option.textContent = category.name;
            select.appendChild(option);
        });
    };


    const AddPage = () => {
        clearPage();
        const main = document.querySelector('main')
        main.innerHTML = pageAddForm;

        const addForm = document.querySelector("#addForm");
        renderCategories();
        addForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const nomProduit = document.querySelector("#nomProduit").value;
        const entreeProduit = document.querySelector("#entreeProduit").value;
        const sortieProduit = document.querySelector("#sortieProduit").value;
        const zoneProduit = document.querySelector("#zoneProduit").value;
        const categorieProduit = document.querySelector("#categorieProduit").value;


        const option = {
            method: 'POST',
            body: JSON.stringify({
                "nom": nomProduit, 
                "entree": entreeProduit,
                "sortie": sortieProduit,
                "zone": zoneProduit,
                "category": categorieProduit
                
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch("/api/produits/", option);
        const resultat = document.querySelector("#resultat");
        if (!response.ok) {
            resultat.innerHTML = `<span class="error-message" style="color: red">Impossible d'ajouter le produit</span>`;
        } else {
            const createdProduct = await response.json();
            resultat.innerHTML = `<span class="success-message" style="color: green"> ${createdProduct.nom} a bien été ajouté</span>`;
        }

        });


    };

    


     


    export default AddPage;