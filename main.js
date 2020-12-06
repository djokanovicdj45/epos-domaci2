let carts = document.querySelectorAll('.dodaj-u');

let products = [
    {
        name: 'Maja',
        tag: 'lutka_maja',
        price: 2500,
        inCart: 0
    },
    {
        name: 'Beti',
        tag: 'maca_beti',
        price: 2300,
        inCart: 0
    },
    {
        name: 'Jana',
        tag: 'lutka_Srbijanka',
        price: 3000,
        inCart: 0
    },
    {
        name: 'Inoa',
        tag: 'lutka_japanka',
        price: 1500,
        inCart: 0
    }
];

for(let i = 0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.link span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.link span').textContent = productNumbers + 1;
    } else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.link span').textContent = 1;
    }
    setItems(product)
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else{
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
    //console.log("the product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');
    
    console.log("my cartCost is", cartCost);
    console.log(typeof cartCost);

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else{
        localStorage.setItem("totalCost", product.price);
    }

    
}



function displayCart(){
	let cartNumbers = parseInt(localStorage.getItem('cartNumbers'));
	
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
	
    if(cartItems && cartNumbers > 0 && productContainer){
        productContainer.innerHTML = '';

        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <div id="product1">
                <img src="./slike/${item.tag}.jpg" width="50">
                <span>${item.name}</span>
                </div>
            <div id="price">${item.price},00RSD</div>
            <div id="quantity">
                <button id="${item.tag}_minus" onclick="decreaseNumberOfItems('${item.tag}')">-1</button>
                <span>${item.inCart}</span>
                <button id="${item.tag}_plus" onclick="increaseNumberOfItems('${item.tag}')">+1</button>
            </div>
            <div id="total">${item.inCart * item.price},00RSD</div>
            </div>
            `
        });

        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
                Ukupno u korpi:
            </h4>
            <h4 class="basketTotal">
            ${cartCost},00RSD
            </h4>
            </div>
            <div>
            <button class="dugme" onclick='order()'>Poruči</button>
            </div>
        `
    }
    
}

function order(){
	//number of items in cart
	let cartNumbers = parseInt(localStorage.getItem('cartNumbers'));
	
	let more = true;
	if(cartNumbers <= 1){
		more = false;
	}
	cartNumbers = 0;
	localStorage.setItem('cartNumbers', cartNumbers);
	
	//total cost is 0
	let totalCost = parseInt(localStorage.getItem('totalCost'));
	totalCost = 0;
	localStorage.setItem('totalCost', totalCost);
	
	//no more items in cart
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	cartItems = [];
	localStorage.setItem("productsInCart", JSON.stringify(cartItems));
	
	
	
	if(more){
		alert('Uspešno ste naručili proizvode!');
	}else{
		alert('Uspešno ste naručili proizvod!');
	}
	
	onLoadCartNumbers();
	
	let productContainer = document.querySelector(".products");
	
	productContainer.innerHTML = '';
	
	onLoadCartNumbers();
	location.href = 'candy.html';
	
}
function decreaseNumberOfItems(item_tag){
	let cartNumbers = parseInt(localStorage.getItem('cartNumbers'));
	cartNumbers-=1;
	localStorage.setItem('cartNumbers', cartNumbers);
	
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	let item = cartItems[item_tag];
	
	
	if(item.inCart == 1 && cartNumbers == 0){
		delete cartItems[item_tag];
		
		let productContainer = document.querySelector(".products");
		
		productContainer.innerHTML = '';
		
	}else if(item.inCart == 1){
		delete cartItems[item_tag];
	
	}else{
		cartItems[item_tag].inCart -= 1;
	}
	
	localStorage.setItem("productsInCart", JSON.stringify(cartItems));
	
	let total = parseInt(localStorage.getItem("totalCost"));
	total -= item.price;
	localStorage.setItem("totalCost", total);
	
	onLoadCartNumbers();
	displayCart();
}

function increaseNumberOfItems(item_tag){
	let cartNumbers = parseInt(localStorage.getItem('cartNumbers'));
	cartNumbers+=1;
	localStorage.setItem('cartNumbers', cartNumbers);
	
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	let item = cartItems[item_tag];
	
	cartItems[item_tag].inCart += 1;
	localStorage.setItem("productsInCart", JSON.stringify(cartItems));
	
	let total = parseInt(localStorage.getItem("totalCost"));
	total = total + item.price;
	localStorage.setItem("totalCost", total);
	
	onLoadCartNumbers();
	displayCart();
}
onLoadCartNumbers();
displayCart();