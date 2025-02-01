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
// localStorage.setItem('items', JSON.stringify(items));
var cart=[]
localStorage.setItem('cart', JSON.stringify(cart));


function add_item_to_cart(id,button){
    cart.push(id)
    localStorage.setItem('cart', JSON.stringify(cart));
    button.disabled = true;
    button.innerText = 'Added';
    button.style.backgroundColor = 'gray';
}
// function update_cart_grid(){
//     for(let i=0;i<cart.length;i++){
//         cart_grid.appendChild(cart[i])
//     }
// }
function go_to_page(url){
    window.location.href=url
}
function add_items_to_grid(){
    for(let i=0;i<items.length;i++){
        let item=document.createElement("div")
        item.classList.add("item")
        item.setAttribute("id",`${items[i].id}-div`)
        item.innerHTML=`
        <img src="${items[i].img_src}" alt="item">
        <h2>${items[i].name}</h2>
        <h3>${items[i].price + ' EGP'}</h3>
        <button class="add_to_cart_button" onclick="add_item_to_cart('${items[i].id}',this)">Add to cart</button>
        `
        grid.appendChild(item)
    }
    document.querySelectorAll(".item").forEach(function(item){
        item.addEventListener("click",function(event){
                if(!event.target.classList.contains("add_to_cart_button")){
                    window.location.href="../Product/product.html"
                }
                var product=item.getAttribute("id")
                localStorage.setItem('product', product);
                console.log(product)
            } 
        )
    }
    )
}
add_items_to_grid()