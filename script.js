let dishes = [

    {
        'name': 'Adana Kebab',
        'description': 'Adana Kebap besteht vor allem aus auf Spießen über Holzkohle gegrilltem Hackfleisch und stellt eine scharf gewürzte Variante der Köfte dar.',
        'price': 11.99,
    },
    {
        'name': 'Grillteller',
        'description': 'Türkischer Grillteller mit allem was man braucht. Lammkottelets, Lammfilets, Köfte vom Grill.',
        'price': 15.99,
    },
    {
        'name': 'Türkische Linsensuppe',
        'description': 'Die wärmende Suppe mit roten Linsen heißt im Original Mercimek Corbasi',
        'price': 5.99,
    },
    {
        'name': 'Gefüllte Bulgurbällchen',
        'description': 'Außen knusprig gebacken, innen mit einer würzigen Hackfleischmischung',
        'price': 14.99,
    },
    {
        'name': 'Manti',
        'description': 'Manti sind mit einer Hackfleisch-Mischung gefüllte Teigtaschen',
        'price': 7.99,
    },
    {
        'name': 'Döner Teller',
        'description': 'Kalb oder Hähnchenfleisch Teller mit Pommes oder Reis,Salat und Souce',
        'price': 8.50,
    },
    {
        'name': 'Beyti Kebab',
        'description': 'Beyti Kebab ist ein beliebtes türkisches Gericht, das aus gebratenen Hackfleischröllchen und Fladenbrot (Pide) besteht, die mit Tomatensoße und Käse überbacken werden.',
        'price': 13.70,
    },
    
]


let names = [];
let descriptions = [];
let prices = [];
let amounts = [];
let totalSum = [];


function render() {
    let foodContent = document.getElementById('foodContainer');
    foodContent.innerHTML = '';

    for (let i = 0; i < dishes.length; i++) {
        const dish = dishes[i];

        foodContent.innerHTML += foodContainerHTML(dish, i);
    }
    load();
    renderBasket();
    mobileBasket();
    updateDeliveryCount();
}


function renderBasket() {
    let basketContent = document.getElementById('basketDishes');
    basketContent.innerHTML = '';

    for (let x = 0; x < names.length; x++) {
        const name = names[x];
        const description = descriptions[x];
        const price = prices[x];
        const amount = amounts[x];

        basketContent.innerHTML += basketHTML(name, description, price, amount, x);
    }
    showBasket();
    calcSingleAmount();
}


function addToBasket(index) {
    validateParameters(index);
    renderBasket();
    updateDeliveryCount();
}


function validateParameters(index) {

    if (validateKey(index) === -1) {
        dishes[index]['name'].trim();
        names.push(dishes[index]['name']);
        descriptions.push(dishes[index]['description']);
        prices.push(dishes[index]['price']);
        amounts.push(1);
    } else {
        let amountIndex = validateKey(index);
        amounts[amountIndex]++;
    }
    save();
}


function validateKey(index) {
    let key = names.indexOf(dishes[index]['name']);
    return key;
}


function edit(param, x) {
    if (param == 'decrease') {
        removeFromBasket(x);
    } else if (param == 'increase') {
        amounts[x]++;
    }
    save();
    renderBasket();
    updateDeliveryCount();
}


function removeFromBasket(x) {
    if (amounts[x] === 1) {
        names.splice(x, 1);
        descriptions.splice(x, 1);
        prices.splice(x, 1);
        amounts.splice(x, 1);
        totalSum.splice(0);
    } else {
        amounts[x]--;
    }
    updateDeliveryCount();
}


function showBasket(param) {
    let basketContent = document.getElementById('basket');
    if (names.length === 0) {
        basketContent.classList.add('displayNone');
        if (param === 'open') {
            renderBasket();
            basketContent.classList.remove('displayNone');
        }
    }
    else if (param === 'close') {
        basketContent.classList.add('displayNone');
    } else {
        basketContent.classList.remove('displayNone');
    }
}


function calcSingleAmount() {
    for (let p = 0; p < prices.length; p++) {
        const price = prices[p];
        const factor = amounts[p]

        let resultPerSingleDish = price * factor;
        totalSum.splice(p)
        totalSum.push(resultPerSingleDish);
    }
    calcTotalAmount();
}


function calcTotalAmount() {
    let priceArea = document.getElementById('priceArea');

    let sum = 0;
    totalSum.forEach((el) => sum += el);
    let delivery = 5.99;
    let totalAmount = delivery + sum;
    totalAmount = totalAmount.toFixed(2);
    sum = sum.toFixed(2);

    if (totalSum.length === 0) {
        priceArea.innerHTML = '<h4>Ihr Warenkorb ist leer<h4>';
    } else
        priceArea.innerHTML = priceAreaHTML(sum, delivery, totalAmount);
}


function order() {
    names.splice(0);
    descriptions.splice(0);
    prices.splice(0);
    amounts.splice(0);
    totalSum.splice(0);
    save();
    renderBasket();
    showBasket();
    render();
    renderThxPopUp();
}


function renderThxPopUp() {
    document.getElementById('foodContainer').innerHTML += thxPopUpHTML();
}


function save() {
    let namesAsText = JSON.stringify(names);
    localStorage.setItem('names', namesAsText);

    let descriptionAsText = JSON.stringify(descriptions);
    localStorage.setItem('descriptions', descriptionAsText);

    let pricesAsText = JSON.stringify(prices);
    localStorage.setItem('prices', pricesAsText);

    let amountsAsText = JSON.stringify(amounts);
    localStorage.setItem('amounts', amountsAsText);
}


function load() {
    let namesAsText = localStorage.getItem('names');
    let descriptionAsText = localStorage.getItem('descriptions');
    let pricesAsText = localStorage.getItem('prices');
    let amountsAsText = localStorage.getItem('amounts');

    if (namesAsText && descriptionAsText && pricesAsText && amountsAsText) {
        names = JSON.parse(namesAsText);
        descriptions = JSON.parse(descriptionAsText);
        prices = JSON.parse(pricesAsText);
        amounts = JSON.parse(amountsAsText);
    }
}


function foodContainerHTML(dish, i) {
    return `
    <div class="dishContainer">
      <div class="dishDescription">
        <span><b>${dish['name']}</b></span>
        <span>${dish['description']}</span>
        <span>${dish['price']}€</span>
      </div>
      <img src="./img/favicon_plus.png" onclick="addToBasket(${i})"></img>
    </div>
    `;
}


function basketHTML(name, description, price, amount, x) {
    return `
     <div id="basketContainer${x}" class="basketContainer">
        <span class="container1">
          <p><b>${amount}</b></p>
          <p>${name}</p>
          <p>${price}€</p>
        </span>
        <span class="container2">${description}</span>
        <span class="container3">
          <div class="inAndDecrease">
            <img onclick="edit('decrease',${x})" src="./img/favicon_minus.png"></img>
            <span>${amount}</span>
            <img onclick="edit('increase',${x})" src="./img/favicon_plus.png"></img>
          </div>
        </span>
     </div>
    `;
}


function thxPopUpHTML() {
    return `
   <div class="thxPopUp">
       <div class="closeThxPopUp"><img onclick="render()" src="./img/favicon_close.png"></img>
       </div>
       <div class="thxPopUpText">
             <h4>Vielen Dank für deine Bestellung</h4>
            <p>Deine Bestellung wird bearbeitet!</p>
         </div>
    </div>`;
}


function priceAreaHTML(sum, delivery, totalAmount) {
    return `
    <div class="totalAmount">
      <span>Zwischensumme ${sum} €</span>
      <span>Liefergebühr ${delivery} €</span>
      <span>Gesamt ${totalAmount} €</span>
      <button class="orderButton" onclick="order()">Bestellen</button>
    </div>
    `;
}

function updateDeliveryCount() {
    let anzahl = 0;
    amounts.forEach(amount => {
        anzahl += amount;
    });
    
    document.getElementById('deliveryCount').innerText = anzahl;
}

