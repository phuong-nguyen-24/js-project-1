const productContainer = document.querySelector("#product-container");
const categorySelect = document.querySelector("#Category-select");

// fetch dung de dan qua sever lay du lieu
// du ko hay co thanh cong cung tra ve 1 ket qua
fetch("https://dummyjson.com/products")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    UpdateProductContainerUI(data.products);

    categorySelect.addEventListener("change", (event) => {
      const filteredProducts = data.products.filter(
        (product) =>
          (product.category = event.target.value || event.target.value == "all")
      );

      // Update UI
      UpdateProductContainerUI(filteredProducts);
    });
  })
  .catch((error) => {
    console.log(error);
  });

function generateProductMarkup(product) {
  return ` 
    <div class="col-12 col-md-6 col-xl-3">
    <div class="card">
      <img
        src="${product.thumbnail}"
        class="card-img-top"
        alt="${product.title}"
      />
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">
         ${product.description}
        </p>
        <a href="#" class="btn btn-primary">Show info</a>
      </div>
    </div>
  </div>`;
}

function UpdateProductContainerUI(products) {
  productContainer.innerHTML = products.reduce(
    (markup, product) => markup + generateProductMarkup(product),
    ""
  );
}
