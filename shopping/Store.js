function displayCart() {
    document.getElementById("output").innerHTML = cart.display();
}

function deleteItem(name) {
    alert("deleting");
    cart.deleteItem(name);
}

// handles the click event, sends the query
function getCPPHTML(product) {
    $.ajax({
       url:'./cpp/productCPPFormatter.php?imgPath=' + product.imgPath + '&qty=' + product.qty + '&name=' + product.name + '&price=' + Number(product.price).toFixed(2),
       complete: function (response) {
          alert(response.responseText);
       },
       error: function () {
           product.html = 'Bummer: there was an error!';
       }
   });
   return false;
 }