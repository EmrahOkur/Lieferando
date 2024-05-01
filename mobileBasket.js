let basket = window.matchMedia("(max-width: 720px)")

basket.addEventListener("change", function () {
    renderMobileBasket(basket);
    
    
    
});



function renderMobileBasket() {
    if (basket.matches) {
        mobileBasket();
    } else {
        render();
    }
    
    
    
}


function mobileBasket() {
    if (basket.matches) {
        let mobileBasketButton = document.getElementById('foodContainer');
        mobileBasketButton.innerHTML += `<div  onclick="showMobileBasket()" class="mobileButton">
                                            <img src="./img/favicon_warenkorb.png"></img>
                                         </div>`
    } else {
        return;
    }    
}

function showMobileBasket() {
    render();
    let mobileBasketPopUP = document.getElementById('foodContainer');
    mobileBasketPopUP.innerHTML += `<div class="mobileBasket">
                                      <div class="closeMobileBasket"><img onclick="closeMobileBasket()" src="./img/favicon_close.png"></img></div>
                                      <div id="basketDishes"></div>
                                      <div class="totalAmount" id="priceArea"></div>
                                    <div>`;

    renderBasket();
}


function closeMobileBasket() {
    render();
    mobileBasket();
    

}


