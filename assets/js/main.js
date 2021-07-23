if(document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', ready)
} else {
	ready()
}

function ready(){
    var remove = document.getElementsByClassName('btn-danger')
    for(var i = 0; i < remove.length; i++){
        remove[i].addEventListener("click", removeCartItem);
    }
    var proceed = document.getElementsByClassName('btn-success')
    for(var i = 0; i < proceed.length; i++){
        proceed[i].addEventListener("click", onReset);
    }
}

let carts = document.querySelectorAll('.add-cart');

let products = [
	{
		name: 'Mexican Hot Chocolate',
		tag: 'Mexican-Hot-Chocolate',
		price: 150.00,
		inCart: 0
	},
	{
		name: 'Gorts Reprieve Irish Coffee',
		tag: 'Reprieve-Irish-Coffee',
		price: 130.00,
		inCart: 0
	},
	{
		name: 'Matcha Latte',
		tag: 'Matcha-Latte',
		price: 120.00,
		inCart: 0
	},
	{
		name: 'Real Pumpkin Spice Latte',
		tag: 'Pumpkin-Spice-Latte',
		price: 125.00,
		inCart: 0
	},
	{
		name: 'Vintage Coffee Cocktail',
		tag: 'Vintage-Coffee-Cocktail',
		price: 145.00,
		inCart: 0
	},
	{
		name: 'Pour-Over Irish Coffee',
		tag: 'Pour-Over-Irish-Coffee',
		price: 135.00,
		inCart: 0
	},
]

for(let i = 0; i < carts.length; i++) {
	carts[i].addEventListener('click', () => {
        console.log('click')
		cartNumbers(products[i]);
		totalCost(products[i])
	})
}





function removeCartItem(event) {
	var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    
}

function onReset(event){
    localStorage.clear();
    window.location.reload(true);
}

function onLoadCartNumbers(){
	let productNumbers = localStorage.getItem('cartNumbers');

	if(productNumbers) {
		document.querySelector('.nav-link span').textContent = productNumbers;
	}
}

function cartNumbers(product) {
    
	let productNumbers = localStorage.getItem('cartNumbers');
	productNumbers = parseInt(productNumbers);
	if(productNumbers){
		localStorage.setItem('cartNumbers', productNumbers + 1);
		document.querySelector('.nav-link span').textContent = productNumbers + 1;
	} else {
		localStorage.setItem('cartNumbers',1);
		document.querySelector('.nav-link span').textContent = 1;
	}	
	
	setItems(product);
}

function setItems(product) {
	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);
	

	if(cartItems != null) {

		if(cartItems[product.tag] == undefined) {
			cartItems = {
				...cartItems,
				[product.tag]: product
			}
		}
		cartItems[product.tag].inCart += 1;
	} else {
		product.inCart = 1;
		cartItems = {
			[product.tag]: product
		}
	}
	
	
	localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
	//console.log("The product price is", product.price);
	let cartCost = localStorage.getItem('totalCost');
	
	console.log("My cartCost is", cartCost);
	console.log(typeof cartCost);
	if(cartCost != null) {
		cartCost = parseFloat(cartCost);
		localStorage.setItem("totalCost", cartCost + product.price);
	} else {
		localStorage.setItem("totalCost", product.price);
	}
}


function displayCart(){
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	let productContainer = document.querySelector(".cart-items");
	let cartCost = localStorage.getItem('totalCost');
	console.log(cartItems);
	if(cartItems && productContainer) {
		productContainer.innerHTML = `
        `;
		Object.values(cartItems).map(item => {
			productContainer.innerHTML += `
			<tr class="cart-row">
    <td><img src="${item.tag}.jpg" style="width: 75px;" /></td>
    <td style="width: 217px;padding-top: 26px;">${item.name}</td>
    <td class="cart-price" style="margin-top: 0px;padding-top: 26px;">₱${item.price}.00<br /></td>
    <td style="padding-top: 26px;"><input type="number" class="cart-quantity-input" style="width: 48px;background: rgba(255,255,255,0);" value="${item.inCart}" /></td>
    <td style="text-align: center;padding: 0;padding-top: 26px;padding-right: 8px;padding-bottom: 8px;padding-left: 8px;"><button class="btn btn-danger" type="submit">Remove</button></td>
</tr>
			`;
		});
    let totalContainer = document.querySelector(".cart-total-price");
        document.querySelector('.cart-total-price').innerHTML = `₱${cartCost}.00`;
	}
}


onLoadCartNumbers();
displayCart();