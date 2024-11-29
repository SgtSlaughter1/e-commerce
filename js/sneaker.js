//load code after the window has finished loading
document.addEventListener("DOMContentLoaded", function () {
  const quantityInput = document.getElementById("quantity");
  const decreaseBtn = document.getElementById("decreaseQuantity");
  const increaseBtn = document.getElementById("increaseQuantity");
  const addToCartBtn = document.getElementById("addToCart");
  const cartCount = document.querySelector(".cart-count");
  const cartToggle = document.getElementById("cartToggle");
  const cartModal = document.querySelector(".cart-modal");
  const cancelBtn = document.querySelector(".cancel-btn");

  // Variables to keep track of the quantity selected and items in the cart
  let quantity = 0;
  let cartItems = 0;
  let cartItemQuantity = 0;

  // Initially hide the cart count
  cartCount.classList.add("hidden");

  decreaseBtn.addEventListener("click", () => {
    if (quantity > 0) {
      quantity--;
      quantityInput.value = quantity;
    }
  });

  increaseBtn.addEventListener("click", () => {
    quantity++;
    quantityInput.value = quantity;
  });

  addToCartBtn.addEventListener("click", () => {
    if (quantity > 0) {
      if (cartItems === 0) {
        cartItems = 1; // Set to 1 when adding the first item
      }
      //increment the quantity and keep the count at 1 per item
      cartItemQuantity += quantity;
      cartCount.textContent = cartItems;
      updateCartModal();
      quantity = 0;
      quantityInput.value = quantity;

      // Show the cart count when items are added
      cartCount.classList.remove("hidden");
    }
  });

  cartToggle.addEventListener("click", (e) => {
    e.preventDefault();
    cartModal.classList.toggle("show");
  });

  cancelBtn.addEventListener("click", () => {
    document.querySelector(".navbar-collapse").classList.remove("show");
  });

  function updateCartModal() {
    const cartModalBody = document.querySelector(".cart-modal-body");
    if (cartItemQuantity > 0) {
      cartModalBody.innerHTML = `
        <div class="cart-item">
          <img src="/ecommerce-product-page-main/images/image-product-1-thumbnail.jpg" alt="Product">
          <div>
            <p>Fall Limited Edition Sneakers</p>
            <p>$125.00 x ${cartItemQuantity} <strong>$${125 * cartItemQuantity}.00</strong></p>
          </div>
          <button class="delete-btn" onclick="removeFromCart()">🗑️</button>
        </div>
        <button class="btn btn2 w-100 mt-2">Checkout</button>
      `;
    } else {
      cartModalBody.innerHTML = '<p class="text-center text-muted">Your cart is empty</p>';
    }
  }

  window.removeFromCart = function () {
    cartItems = 0;
    cartItemQuantity = 0;
    cartCount.textContent = cartItems;
    updateCartModal();

    // Hide the cart count when cart becomes empty
    cartCount.classList.add("hidden");
  };
});


let person = {
  name: "Habeeb",
  age: 14,
  weight: "25kg"
}

person.age = 15
person.gender = "Male"

console.log(person)