// ================================
// VINX SUPER POSE JAVASCRIPT
// ================================


const products = [

    {
        id: 1,
        name: "Smartphone X Pro",
        price: 285000,
        category: "Phones",
        emoji: "📱",
        seller: "Vinx Verified Store"
    },

    {
        id: 2,
        name: "Wireless Headphones",
        price: 45000,
        category: "Phones",
        emoji: "🎧",
        seller: "Sound Hub"
    },

    {
        id: 3,
        name: "Core i7 Laptop",
        price: 620000,
        category: "Computers",
        emoji: "💻",
        seller: "Tech Point"
    },

    {
        id: 4,
        name: "Smart Watch",
        price: 75000,
        category: "Phones",
        emoji: "⌚",
        seller: "Vinx Gadgets"
    },

    {
        id: 5,
        name: "Classic Sneakers",
        price: 38000,
        category: "Fashion",
        emoji: "👟",
        seller: "Urban Style"
    },

    {
        id: 6,
        name: "Office Chair",
        price: 120000,
        category: "Home",
        emoji: "🪑",
        seller: "Home Plus"
    },

    {
        id: 7,
        name: "Skincare Set",
        price: 27000,
        category: "Beauty",
        emoji: "🧴",
        seller: "Glow Store"
    },

    {
        id: 8,
        name: "Website Design Service",
        price: 85000,
        category: "Services",
        emoji: "💻",
        seller: "Vinx Digital"
    },

    {
        id: 9,
        name: "Family Food Pack",
        price: 25000,
        category: "Food",
        emoji: "🍱",
        seller: "Fresh Kitchen"
    },

    {
        id: 10,
        name: "Bluetooth Speaker",
        price: 55000,
        category: "Phones",
        emoji: "🔊",
        seller: "Audio World"
    },

    {
        id: 11,
        name: "School Backpack",
        price: 22000,
        category: "Fashion",
        emoji: "🎒",
        seller: "Student Store"
    },

    {
        id: 12,
        name: "Graphic Design Service",
        price: 45000,
        category: "Services",
        emoji: "🎨",
        seller: "Creative Desk"
    }

];


// ================================
// VARIABLES
// ================================

let cart = [];

let activeCategory = "All";

let searchTerm = "";


// ================================
// MONEY FORMAT
// ================================

function money(amount) {

    return new Intl.NumberFormat(
        "en-NG",
        {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0
        }
    ).format(amount);

}


// ================================
// SHOW PRODUCTS
// ================================

function displayProducts() {

    let filteredProducts = products.filter(function(product) {

        const categoryMatch =
            activeCategory === "All" ||
            product.category === activeCategory;


        const searchMatch =
            product.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());


        return categoryMatch && searchMatch;

    });


    const sort = document.getElementById(
        "sortSelect"
    ).value;


    if (sort === "low") {

        filteredProducts.sort(
            (a, b) => a.price - b.price
        );

    }


    if (sort === "high") {

        filteredProducts.sort(
            (a, b) => b.price - a.price
        );

    }


    const productGrid =
        document.getElementById(
            "productGrid"
        );


    productGrid.innerHTML = "";


    filteredProducts.forEach(function(product) {

        const card = document.createElement("div");

        card.className = "product";


        card.innerHTML = `

            <div class="product-img">
                ${product.emoji}
            </div>

            <div class="product-body">

                <span class="tag">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <div class="price">
                    ${money(product.price)}
                </div>

                <div class="seller">
                    ✓ ${product.seller}
                </div>

                <button
                    class="add"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            </div>

        `;


        productGrid.appendChild(card);

    });


    document
        .getElementById("emptyState")
        .classList.toggle(
            "hidden",
            filteredProducts.length !== 0
        );

}


// ================================
// ADD TO CART
// ================================

function addToCart(id) {

    const existingProduct =
        cart.find(item => item.id === id);


    if (existingProduct) {

        existingProduct.quantity++;

    }

    else {

        cart.push({

            id: id,

            quantity: 1

        });

    }


    updateCart();


    alert("Product added to cart!");
}


// ================================
// UPDATE CART
// ================================

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");


    cartItems.innerHTML = "";


    let total = 0;

    let quantityTotal = 0;


    cart.forEach(function(item) {

        const product =
            products.find(
                product => product.id === item.id
            );


        total +=
            product.price * item.quantity;


        quantityTotal += item.quantity;


        const cartRow =
            document.createElement("div");


        cartRow.className = "cart-row";


        cartRow.innerHTML = `

            <div class="cart-emoji">
                ${product.emoji}
            </div>

            <div>

                <strong>
                    ${product.name}
                </strong>

                <br>

                <small>
                    ${money(product.price)}
                </small>

            </div>

            <div class="qty">

                <button
                    onclick="changeQuantity(
                        ${product.id},
                        -1
                    )"
                >
                    -
                </button>

                ${item.quantity}

                <button
                    onclick="changeQuantity(
                        ${product.id},
                        1
                    )"
                >
                    +
                </button>

            </div>

        `;


        cartItems.appendChild(cartRow);

    });


    document.getElementById(
        "cartTotal"
    ).textContent = money(total);


    document.getElementById(
        "cartCount"
    ).textContent = quantityTotal;


}


// ================================
// CHANGE QUANTITY
// ================================

function changeQuantity(id, amount) {

    const item =
        cart.find(item => item.id === id);


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart = cart.filter(
            item => item.id !== id
        );

    }


    updateCart();

}


// ================================
// SEARCH
// ================================

document
    .getElementById("searchForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            searchTerm =
                document.getElementById(
                    "searchInput"
                ).value;

            displayProducts();

        }
    );


document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        function(event) {

            searchTerm =
                event.target.value;

            displayProducts();

        }
    );


// ================================
// CATEGORY BUTTONS
// ================================

const categoryButtons =
    document.querySelectorAll(
        ".category"
    );


categoryButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            categoryButtons.forEach(
                button =>
                    button.classList.remove(
                        "active"
                    )
            );


            button.classList.add(
                "active"
            );


            activeCategory =
                button.dataset.category;


            displayProducts();

        }
    );

});


// ================================
// SORT
// ================================

document
    .getElementById("sortSelect")
    .addEventListener(
        "change",
        displayProducts
    );


// ================================
// OPEN CART
// ================================

document
    .getElementById("cartBtn")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("cartPanel")
                .classList.add("open");

        }
    );


// ================================
// CLOSE CART
// ================================

document
    .getElementById("closeCart")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("cartPanel")
                .classList.remove("open");

        }
    );


// ================================
// ACCOUNT
// ================================

document
    .getElementById("accountBtn")
    .addEventListener(
        "click",
        function() {

            openModal(`

                <h2>
                    Vinx Super Pose Account
                </h2>

                <p>
                    Create an account to save
                    orders and track deliveries.
                </p>

                <div class="notice">

                    🔒 Your password and personal
                    information should be protected
                    by a secure server in a real
                    marketplace.

                </div>

            `);

        }
    );


// ================================
// MODAL
// ================================

function openModal(content) {

    document.getElementById(
        "modalContent"
    ).innerHTML = content;


    document
        .getElementById("modal")
        .classList.remove("hidden");

}


function closeModal() {

    document
        .getElementById("modal")
        .classList.add("hidden");

}


document
    .getElementById("closeModal")
    .addEventListener(
        "click",
        closeModal
    );


// ================================
// CHECKOUT
// ================================

document
    .getElementById("checkoutBtn")
    .addEventListener(
        "click",
        function() {

            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            openModal(`

                <h2>
                    Secure Checkout
                </h2>


                <div class="notice">

                    🛡️ Vinx Super Pose will
                    never ask you to send your
                    password or OTP to a seller.

                </div>


                <form
                    id="checkoutForm"
                    class="checkout-form"
                >

                    <label>
                        Full Name

                        <input
                            type="text"
                            required
                            minlength="2"
                        >

                    </label>


                    <label>
                        Phone Number

                        <input
                            type="tel"
                            required
                        >

                    </label>


                    <label>
                        Email

                        <input
                            type="email"
                            required
                        >

                    </label>


                    <label>
                        Delivery Address

                        <textarea
                            required
                            minlength="10"
                        ></textarea>

                    </label>


                    <label>
                        Payment Method

                        <select required>

                            <option value="">
                                Select payment
                            </option>

                            <option>
                                Pay on Delivery
                            </option>

                            <option>
                                Secure Online Payment
                            </option>

                        </select>

                    </label>


                    <label>

                        <input
                            type="checkbox"
                            required
                        >

                        I confirm that my
                        order details are correct.

                    </label>


                    <button type="submit">

                        Place Order

                    </button>

                </form>

            `);


            document
                .getElementById(
                    "checkoutForm"
                )
                .addEventListener(
                    "submit",
                    function(event) {

                        event.preventDefault();


                        const orderNumber =
                            "VSP-" +
                            Math.floor(
                                Math.random() *
                                1000000
                            );


                        cart = [];


                        updateCart();


                        document
                            .getElementById(
                                "cartPanel"
                            )
                            .classList.remove(
                                "open"
                            );


                        openModal(`

                            <h2>
                                Order Successful 🎉
                            </h2>

                            <p>
                                Your order has been
                                received.
                            </p>

                            <p>
                                Order Number:
                                <strong>
                                    ${orderNumber}
                                </strong>
                            </p>

                            <br>

                            <button
                                class="checkout"
                                onclick="closeModal()"
                            >
                                Continue Shopping
                            </button>

                        `);

                    }
                );

        });


// ================================
// START WEBSITE
// ================================

displayProducts();

updateCart();