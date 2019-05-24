function Cart() {
    //Array for holding items in the cart
    this.items = [];

    Cart.prototype.addItem = function (item) {
        //Check if its already in the cart
        var inCart = false;
        for (i = 0; i < this.items.length; i++) {
            if (this.items[i].name == item.name) {
                this.items[i].increaseQty();
                inCart = true;
            }
        }

        if (inCart === false) {
            this.items.push(item);
        }
    }

    Cart.prototype.addById = function (id) {
        alert("Added to cart!");
        $.ajax({
            url: 'getsingle.php?id=' + id,
            complete: function (response) {
                cart.addBySQL(response.responseText);
            },
            error: function () {
                alert('Bummer: there was an error!');
            }
        });
        return false;
    }

    Cart.prototype.addBySQL = function (sql_response) {
        var res = sql_response.split(":");
        tmp = new Product(res[0], res[1], res[3], res[2]);
        this.addItem(tmp);
    }

    Cart.prototype.deleteItem = function (name) {
        if (confirm("Are you sure you want to remove the item?")) {
            for (i = 0; i < this.items.length; i++) {
                if (this.items[i].name == name) {
                    this.items.splice(i, 1);
                }
            }
            displayCart();
        }

    }

    Cart.prototype.display = function () {
        var total = 0;
        var tax = 0;

        //Table Header
        var html = "<table id='cart'>";
        html += "<thead>";
        html += "<tr>";
        html += "<th class='first'>Photo</th>";
        html += "<th class='second'>Qty</th>";
        html += "<th class='third'>Product</th>";
        html += "<th class='fourth'>Line Total</th>";
        html += "<th class='fifth'></th>";
        html += "</tr>";
        html += "</thead>";
        html += "<tbody>";

        for (i = 0; i < this.items.length; i++) {
            html += this.items[i].display();
            total += this.items[i].price;
        }

        //Total line
        html += "<tr class='totalprice'>";
        html += "<td class='thick'>Total:</td>";
        html += "<td colspan='2' class='thick'></td>";
        html += "<td class='thick'>$" + Number(total).toFixed(2) + "</td>";
        html += "<td></td>";
        html += "</tr>"

        //Checkout button
        html += "<tr class='checkoutrow'>";
        html += "<td colspan='5' class='checkout'><button id='submitbtn'>Checkout Now!</button></td>";
        html += "</tr>";
        html += "</tbody>";
        html += "</table>";

        return html;
    }
};