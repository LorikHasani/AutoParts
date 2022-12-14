
$("#cartProductsHiden").html(localStorage.getItem("cart"));


let iconNrProduct = localStorage.getItem("carticon") == null ? localStorage.setItem("carticon", 0) : localStorage.getItem("carticon");
$("#cartProduct").text(iconNrProduct);

class Products {
    constructor(id, brand, description, price, thumbnail, title, model) {
        this.id = id;
        this.brand = brand;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.title = title;
        this.model = model;
    }

    static generateCards(obj) {
        return `
        <div class="col-md-3 mt-3 box">
        <div class="card productCards">
            <img src="${obj.thumbnail}" class="card-img-top" alt="..." style="height: 220px;">
            <div class="card-body">
              <h5 class="card-title">${obj.title}</h5>
              <p class="card-text" style="font-size:15px;">${obj.brand}</p>
              <p class="card-text priceText">${obj.price} $</p>
              <button data-prodid="${obj.id}" data-name="${obj.brand}"  data-title="${obj.title}" data-desc="${obj.description}" data-model="${obj.model}" data-img="${obj.thumbnail}"  class="btn btn-primary getProductDetails ">Details</button>
              <button data-id="${obj.id}" data-name="${obj.brand}" data-title="${obj.title}" data-price="${obj.price}" data-model="${obj.model}" data-img="${obj.thumbnail}" class="addToCart">
              <img src="img/cartShop.png" alt="" class="imageCart">
              </button>
            </div>
          </div>
         </div>
        `;
    }
}



// fetch("products.json")
fetch("script/products.json")
    .then(x => x.json())
    .then(data => {
        for (let index = 0; index < data.products.length; index++) {
            $("#products").append(Products.generateCards(data.products[index]));
            // data.products.sort((a, b) => b.price - a.price);
        }
    });

fetch("script/accesories.json")
    .then(x => x.json())
    .then(data => {
        for (let index = 0; index < data.accesories.length; index++) {
            $("#accesories").append(Products.generateCards(data.accesories[index]));
        }
    });

fetch("script/exterior.json")
    .then(x => x.json())
    .then(data => {
        for (let index = 0; index < data.exterior.length; index++) {
            $("#exterior").append(Products.generateCards(data.exterior[index]));
        }
    });


class DataAttribute {
    constructor(img, name, price, id, quantity) {
        this.img = img;
        this.name = name;
        this.price = price;
        this.id = id;
        this.quantity = quantity;
    }

    static addToCart(obj) {
        let createRow = `<tr data-id="${obj.id}" class="cartProduct">
            <td><img src="${obj.img}" height="100" width="100" > ${obj.title}</td>
            <td>$${obj.price}</td>
            <td>
                <input type="number" value="${obj.quantity}" class="totalProduct" data-prid="${obj.id}" data-price="${obj.price}" >
            </td>
            <td id="amount_${obj.id}" data-amount="${Number.parseFloat(obj.price) * Number.parseInt(obj.quantity)}">$${Number.parseFloat(obj.price) * Number.parseInt(obj.quantity)}</td>
            <td><button class="deleteRow" data-id="${obj.id}"><img src="img/removeIcon.png"></button></td>
        </tr>`;



        let getCurrentProductOnTheCart = localStorage.getItem("cart");
        getCurrentProductOnTheCart += createRow;

        localStorage.setItem("cart", getCurrentProductOnTheCart);


        $("#cartProductsHiden").html(localStorage.getItem("cart"));


        //ChangeNumberIconProduct


        let getNumberProduct = localStorage.setItem("carticon", $(".cartProduct").length);
        $("#cartProduct").text(localStorage.getItem("carticon"));

        return createRow;
    }
}

$(document).on("click", ".addToCart", function () {

    let dataProduct = $(this).data();
    dataProduct.quantity = 1;
    DataAttribute.addToCart(dataProduct);


    let countSameProduct = $(`input[data-prid="${dataProduct.id}"]`).length;



    if (countSameProduct > 1) {

        let currentQuantity = Number.parseInt($(`input[data-prid="${dataProduct.id}"]`).val()) + 1;
        let productid = dataProduct.id;

        $(`tr[data-id="${productid}"]`).remove();
        localStorage.setItem("cart", $("#cartProductsHiden").html());
        //UpdateRow
        dataProduct.quantity = currentQuantity;
        DataAttribute.addToCart(dataProduct);

        // localStorage.setItem("cart", $("#cartProductsHiden").html());
        // $("#cartProductsHiden").html(localStorage.getItem("cart"));
    }
    let titleP = $(this).data("title");
    returnMsgSuccess("Produkti " + titleP + " u shtua me sukses!");
});

//Sorting 

//Details 

$(document).on("click", ".getProductDetails", function () {

    let title = $(this).data("title");
    let descr = $(this).data("desc");
    let modeli = $(this).data("model");
    let brand = $(this).data("name");
    let imgSrc = $(this).data("img");

    // console.log("linku" + imgSrc);

    let fullname = $("#fullname").text(title)
    let description = $("#description").text(descr);
    let model = $("#modeli").text(modeli);
    let brandi = $("#brandi").text(brand)
    let image = $("#image").attr("src", imgSrc);


    $("#myModal").modal("show");

});

//Alerti(mesazhi)

function returnMsgSuccess(msg) {
    $("#showMsg").prop("hidden", false);
    $("#setMsg").text(msg);

    setTimeout(function () {
        $("#showMsg").prop("hidden", true);
        $("#setMsg").text('');
    }, 3000);
}


