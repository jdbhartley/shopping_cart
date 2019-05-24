//Stores the selected index
var cart = new Cart();

// handles the click event, sends the query
function getList() {
    $.ajax({
       url:'listproduct.php',
       complete: function (response) {
           $('#output').html(formatOutput(response.responseText));
       },
       error: function () {
           $('#output').html('Bummer: there was an error!');
       }
   });
   return false;
 }

 function formatOutput(responseTxt) {
    var res = responseTxt.split(":");
    var html = "<table>";
    html += "<th>Name</th><th>Description</th><th>Price</th><th>Add To Cart</th>"

    for (i = 0; i < res.length - 1; i = i + 5) {
        html += "<tr><td><img src='images/" + res[i+4] + "' height='200' width='200'><br><center><b>" + res[i+1] + "</b></center></td>";
        html += "<td>" + res[i + 2] + "</td>";
        html += "<td>$" + Number(res[i + 3]).toFixed(2)  + "</td>";
        html += "<td><a href='#'><img onclick='cart.addById(" + res[i] + ")' src='images/cart.png' height='50' width='50'></a></td></tr>";
    }

    html += "</table>";
    return html;
 }