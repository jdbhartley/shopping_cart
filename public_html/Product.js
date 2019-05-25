//Constructor for the Product
function Product(name, desc, imgPath, price) {
    var nArgs = arguments.length;
    this.qty = 1;
    this.html = '';

    if (nArgs == 1) {
        //Supplied Product Object
        this.name = name.name;
        this.desc = name.desc;
        this.imgPath = name.imgPath;
        this.price = name.price;
    } else {
        //Creating new product
        this.name = name;
        this.desc = desc;
        this.imgPath = imgPath;
        this.price = price;
    }

    Product.prototype.increaseQty = function () {
        this.qty = this.qty + 1;
    }

    Product.prototype.display = function () {
        var html = "<tr>";
        html += "<td><img src='images/" + this.imgPath + "' height='200' width='200'></td>";
        html += "<td><input type='number' value='" + this.qty + "' min='0' max='99' class='qtyinput'></td>";
        html += "<td>" + this.name + "</td>";
        html += "<td>$" + parseFloat(this.price).toFixed(2) + "</td>";
        html += "<td><span class='remove'><img onclick='cart.deleteItem(\"" + this.name + "\")' src='images/trashcan.png' alt='X' height='50' width='50'></span></td>";
        html += "</tr>";

        return html;
    }
};