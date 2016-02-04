$(document).ready(function(){
    var chosen_product = {
        color: "",
        size: "",
        price: 0,
        quantity: 0

    };
    var timeout = null;
    var chosen_products = [];





    var products = [
    {
        color: '#000000',
        price: '39',
        color_name: 'Black',
        available_sizes: ['s', 'l'],
        images: ['images/black1.jpg', 'images/black2.jpg', 'images/black3.jpg']
    },
    {
        color: '#DB8C57',
        price: '45',
        discount_price: '19',
        color_name: 'Taupe',
        available_sizes: ['xs', 's', 'm', 'l'],
        images: ['images/yellow1.jpg', 'images/yellow2.jpg', 'images/yellow3.jpg']
    },
    {
        color: '#0C5754',
        price: '39',
        discount_price: '19',
        color_name: 'Green',
        available_sizes: ['m'],
        images: ['images/green1.jpg', 'images/green2.jpg', 'images/green3.jpg']
    }
    ];

    init();

    function init(){
        loadColors();
        loadImages();


    };

    function loadColors(){
        for (var i = 0; i < products.length; i++) {
            var new_color_li = $("<li></li>").addClass("color-selector").css("background-color", products[i].color).attr("data-id", i);
            var new_child_div = $("<a></a>");
            new_color_li.append(new_child_div);
            $(".color-selector-parent").append(new_color_li);

        };
        $(".color-selector").click(function(){

        //console.log(1);
        $ (".photo-gallery").empty();

        $('.photo-gallery').empty;
        var id = $(this).attr("data-id");
        $(this).addClass("active");
        for (var i = 0; i < products[id].images.length; i++) {
            var new_image = $("<img>").attr("src", products[id].images[i]);
            $('.photo-gallery').append(new_image);
        };

        //shoing color name

        $(".color-name").html(products[id].color_name);

        //show price
        $(".product-price").html("&pound;"+products[id].price);

        if(products[id].discount_price) {
            $(".product-price").addClass('striked');
            $(".discount-price").html("&pound;"+products[id].discount_price);
        } else {
            $(".product-price").removeClass('striked');
            $ (".discount-price").empty();
        }
        //show available sizes

        var all_sizes = $(".users-size-choise li").removeClass('available');
        for (var i = 0; i < all_sizes.length; i++) {
            var size_element = $(all_sizes[i]);

            if (products[id].available_sizes.indexOf(size_element.attr('data-size')) >=0) {
                size_element.addClass('available');
            }
        };

        // save color

        chosen_product.color = products[id].color_name;
        chosen_product.price = (products[id].discount_price) ? products[id].discount_price : products[id].price;





    })


};



function loadImages(){
    $(".color-selector").first().click();


}
//chose size

$(".users-size-choise .available").on('click', function(){
    console.log($(this).attr("data-size"));
    chosen_product.size = $(this).attr("data-size");

});

//chose quantity
$(".quantity li").on('click', function(){
    chosen_product.quantity = $(this).attr("data-quantity");
});

$(".add-to-cart").on('click', function(){
    if (timeout) {
        clearTimeout(timeout)
    };




    chosen_products.push(chosen_product);

    var shopping_cart = $(".shopping-cart");
    shopping_cart.find("h3").html($(".product-name").html());

    if (chosen_products.length == 1){


       shopping_cart.find(".chosen-product-price").html(chosen_product.price);
       shopping_cart.find(".chosen-product-quantity").html(chosen_product.quantity);
       shopping_cart.find(".chosen-product-color").html(chosen_product.color);
       shopping_cart.find(".chosen-product-size").html(chosen_product.size);
   } else {
        var ul = shopping_cart.find("ul").first().clone();
        ul.find(".chosen-product-price").html(chosen_product.price);
        ul.find(".chosen-product-quantity").html(chosen_product.quantity);
        ul.find(".chosen-product-color").html(chosen_product.color);
        ul.find(".chosen-product-size").html(chosen_product.size);
        shopping_cart.append(ul);
    }

    shopping_cart.addClass("visible");
    setTimeout (function(){
        shopping_cart.removeClass("visible");
    },3000);





    console.log(chosen_product);
});
})