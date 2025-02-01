let grid=document.querySelector(".grid")
let items=[
    {
        id:'i1',
        img_src:'../images/items-photos/1.png',
        name:'Pepsi',
        price:'15',
        description: `
        
Brand Name	Pepsi
Item Form	Liquid
Flavor	Cola
Number of Items	1
Container Type	Can
Item Volume	300 Milliliters
Unit Count	1 Can
Item Weight	300 Grams
Age Range Description	Adult
Caffeine Content	Zero`,
    },
    {
        id:'i2',
        img_src:'../images/items-photos/2.png',
        name:'Water',
        price:'5',
        description: `Brand	Nestle Egypt
Variety	Purified
Flavor	unflavored
Package Information	Bottle
Item Volume	1 Liters `,
    },
    {
        id:'i3',
        img_src:'../images/items-photos/3.png',
        name:'Chips',
        price:'10',
        description: `Brand	Lay's
Flavor	Classic
Unit Count	7.75 Ounce
Number of Items	1
Type	Potato Chip`,
    },
    {
        id:'i4',
        img_src:'../images/items-photos/4.png',
        name:'Milk',
        price:'50',
        description: `Brand	Juhayna
Flavor	unflavored
Item Form	Liquid
Unit Count	32.0 Fl Oz
Number of Items	1`,
    },
    {
        id:'i5',
        img_src:'../images/items-photos/5.png',
        name:'Chocolate',
        price:'40',
        description: `Brand	Cadbury
Item Form	Bar
Chocolate Type	Milk
Flavor	milk
Unit Count	12.69 Ounce`,
    },
    {
        id:'i6',
        img_src:'../images/items-photos/6.png',
        name:'Cereals',
        price:'30',
        description: `Brand	Nesquik
Flavor	Chocolate
Age Range (Description)	Adult
Item Form	Cereal
Specialty	Whole Grain`,
    },
    {
        id:'i7',
        img_src:'../images/items-photos/7.png',
        name:'Juice',
        price:'45',
        description: `Number of Items	1
Unit Count	405.6 Fl Oz
Brand	Lamar
Flavor	Pineapple
Specialty	Kids`,
    },
    {
        id:'i8',
        img_src:'../images/items-photos/8.png',
        name:'Noodles',
        price:'10',
        description: `Brand	Indomie
Flavor	vegetables
Package Information	Pouch
Number of Items	1
Item Weight	74 Grams`,
    },
    {
        id:'i9',
        img_src:'../images/items-photos/9.png',
        name:'Pistachio Cream',
        price:'50',
        description: `Brand	Soyummy
Flavor	Pistachio
Number of Items	1
Item Weight	200 Grams`,
    },
    {
        id:'i10',
        img_src:'../images/items-photos/10.png',
        name:'Pasta',
        price:'25',
        description: `
Brand	El Maleka
Variety	Penne Rigate
Item Weight	0.75 Pounds
Number of Items	1
`,
    },
]
let cart = []
let cart_with_obj=[]

function refresh_cart(){
    cart = JSON.parse(localStorage.getItem('cart')) || []
}
function refresh_items(){
    var items = JSON.parse(localStorage.getItem('items'));
}

function convert_cart_to_obj(){
    refresh_cart()
    for(let i=0;i<cart.length;i++){
        let item_obj=items.find(item=>item.id==cart[i])
        cart_with_obj.push(item_obj)
    }
    console.log(cart_with_obj)
}
function add_items_to_grid(){
    convert_cart_to_obj()
    for(let i=0;i<cart.length;i++){
        let item=document.createElement("div")
        item.classList.add("item")
        item.innerHTML=`
        <div class="item-details">
            <img class="item-image" src="${cart_with_obj[i].img_src}" alt="item">
            <h5 class="item-name">${cart_with_obj[i].name} - (${cart_with_obj[i].price})</h5>
        </div>
        <div class="item-controls">
            <div class="quantity-controls">
                <button class="quantity-btn decrement-btn" id="${cart_with_obj[i].id +'-dec-btn'}">-</button>
                <input class="quantity-input" id="${cart_with_obj[i].id + '-number'}" type="number" min="0" value="1">
                <button class="quantity-btn increment-btn" id="${cart_with_obj[i].id +'-inc-btn'}">+</button>
            </div>
            <h5 class="item-price">$ <span id="${cart_with_obj[i].id + '-total'}">${cart_with_obj[i].price}</span></h5>
        </div>
        `
        grid.appendChild(item)
    }
    for(let i=0;i<cart.length;i++){
        document.getElementById(cart[i] +'-inc-btn').addEventListener('click', () => {
            updateProductQuantity(cart[i], cart_with_obj[i].price, true);  // Increase Bottle quantity by 1
        })
        document.getElementById(cart[i] +'-dec-btn').addEventListener('click', () => {
            updateProductQuantity(cart[i], cart_with_obj[i].price, false);  // Decrease Bottle quantity by 1
        })
    }
}

// Function to update product quantity and price
function updateProductQuantity(product, price, isIncreasing) {
    let inputElement = document.getElementById(`${product}-number`);
    let quantity = parseInt(inputElement.value);

    // Check if the quantity is valid
    if (isIncreasing || (quantity > 0 && !isIncreasing)) {
        // Update the quantity based on the button clicked
        const newQuantity = isIncreasing ? quantity + 1 : quantity - 1;
        inputElement.value = newQuantity;

        // Update the total price for the product
        const totalElement = document.getElementById(`${product}-total`);
        totalElement.innerText = newQuantity * price;

        // Recalculate the total cart price
        calculateTotal();
    }
}

// Function to calculate the total price, tax, and subtotal
function calculateTotal() {
    items_quantity=[]
    let subtotal=0
    for(let i=0;i<cart_with_obj.length;i++){
        // items_quantity.push(parseInt(document.getElementById(`${cart_with_obj[i].id + '-number'}`).value))
        // subtotal+=items_quantity[i]*parseInt(cart_with_obj[i].price)
        const quantity = parseInt(document.getElementById(`${cart_with_obj[i].id}-number`).value)
        items_quantity.push(quantity); // Store the quantity of each item 
        subtotal += quantity * parseInt(cart_with_obj[i].price); // Update the subtotal
    }
    let tax=subtotal*0.14
    let totalPrice=subtotal+tax
    document.getElementById('sub-total').innerText = subtotal.toFixed(2);
    document.getElementById('tax-amount').innerText = tax.toFixed(2);
    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
}

// for(let i=0;i<cart.length;i++){
//     document.getElementById(cart[i] +'-inc-btn').addEventListener('click', () => {
//         updateProductQuantity(cart[i], cart_with_obj[i].price, true);  // Increase Bottle quantity by 1
//     })
//     document.getElementById(cart[i] +'-dec-btn').addEventListener('click', () => {
//         updateProductQuantity(cart[i], cart_with_obj[i].price, false);  // Decrease Bottle quantity by 1
//     })
// }

// // Add event listeners to the buttons
// document.getElementById('Bottle-plus').addEventListener('click', () => {
//     updateProductQuantity('Bottle', 10, true);  // Increase Bottle quantity by 1
// });

// document.getElementById('Bottle-minus').addEventListener('click', () => {
//     updateProductQuantity('Bottle', 10, false);  // Decrease Bottle quantity by 1
// });

// document.getElementById('Molto-plus').addEventListener('click', () => {
//     updateProductQuantity('Molto', 2, true);  // Increase Molto quantity by 1
// });

// document.getElementById('Molto-minus').addEventListener('click', () => {
//     updateProductQuantity('Molto', 2, false);  // Decrease Molto quantity by 1
// });
add_items_to_grid();
calculateTotal();