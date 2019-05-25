function displayCart() {
    document.getElementById("output").innerHTML = cart.display();
}

function deleteItem(name) {
    alert("deleting");
    cart.deleteItem(name);
}

function displayLogin() {
    var html = '<h1>Login</h1><form action="login.php" method="post" name="login">'
    html += '<p>Email Address: <input type="text" name="email" size="20" maxlength="60" /> </p>'
    html += '<p>Password: <input type="password" name="pass" size="20" maxlength="20" /></p>'
    html += '<p><input type="submit" name="submit" value="Login" /></p></form>'
    document.getElementById("output").innerHTML = html;

    //Override the submit button
    $('form[name=login]').submit(function (e) {
        e.preventDefault();
        var email = document.getElementsByName("email")[0].value;
        var password = document.getElementsByName("pass")[0].value;
        login(email, password);
    });
}

function displayCreateAcc() {
    var html = '<h1>Create Account</h1><form action="createacc.php" method="post" name="createacc">';
    html += '<p>First Name: <input type="text" name="firstname" size="20" maxlength="20" /> </p>';
    html += '<p>Last Name: <input type="text" name="lastname" size="20" maxlength="20" /> </p>';
    html += '<p>Email Address: <input type="text" name="email" size="20" maxlength="60" /> </p>';
    html += '<p>Password: <input type="password" name="pass" size="20" maxlength="20" /></p>';
    html += '<p>Password must contain atlease one lowercase, uppercase, number, special character and be atleast 8 characters long.</p>';
    html += '<p><input type="submit" name="submit" value="Create Account" /></p></form>';
    document.getElementById("output").innerHTML = html;

    //Override the submit button
    $('form[name=createacc]').submit(function (e) {
        e.preventDefault();
        var firstname = document.getElementsByName("firstname")[0].value;
        var lastname = document.getElementsByName("lastname")[0].value;
        var email = document.getElementsByName("email")[0].value;
        var password = document.getElementsByName("pass")[0].value;

        //Regex for email
        var emailfilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var passfilter = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if (emailfilter.test(email)) {
            if (passfilter.test(password)) {
                CreateAcc(firstname, lastname, email, password);
            } else {
                alert("Invalid Password Entered must be 8 characters long, one uppercase, one lowercase, one digit and one special character.");
            }
        } else {
            alert("Invalid Email Entered");
        }
    });
}

//Admin Functions
function productAdd() {
    var html = '<h1>Add Product</h1><form action="addproduct.php" method="post" name="addproduct">';
    html += '<p>Product Name: <input type="text" name="name" size="20" maxlength="20" /> </p>';
    html += '<p>Product Description <textarea name="desc" ></textarea> </p>';
    html += '<p>Price: <input type="text" name="price" size="20" maxlength="20" /></p>';
    html += '<p>Image Path: <input type="text" name="imgPath" size="20" maxlength="60" /> </p>';
    html += '<p><input type="submit" name="submit" value="Add Product" /></p></form>';
    document.getElementById("output").innerHTML = html;

    //Override the submit button
    $('form[name=addproduct]').submit(function (e) {
        e.preventDefault();
        var name = document.getElementsByName("name")[0].value;
        var desc = document.getElementsByName("desc")[0].value;
        var price = document.getElementsByName("price")[0].value;
        var imgPath = document.getElementsByName("imgPath")[0].value;
        UploadProduct(name, desc, price, imgPath);
    });
}

function UploadProduct(name, desc, price, imgPath) {
    $.ajax({
        url: 'addproduct.php?name=' + name + '&desc=' + desc + '&price=' + price + '&imgPath=' + imgPath,
        complete: function (response) {
            alert("Product Added");
            displayAdmin()
        },
        error: function () {
            alert('Bummer: there was an error!');
        }
    });
    return false;
}

function editProductByID(id, name, desc, price, imgPath) {
    var html = '<h1>Edit Product</h1><form action="editproduct.php" method="post" name="editproduct">';
    html += '<p>Product Name: <input type="text" name="name" size="20" maxlength="20" value="' + name + '" /> </p>';
    html += '<p>Product Description <textarea name="desc" >' + desc + '</textarea> </p>';
    html += '<p>Price: <input type="text" name="price" size="20" maxlength="20" value="' + price + '" /></p>';
    html += '<p>Image Path: <input type="text" name="imgPath" size="20" maxlength="60" value="' + imgPath + '" /> </p>';
    html += '<p><input type="submit" name="submit" value="Submit" /></p></form>';
    document.getElementById("output").innerHTML = html;

    //Override the submit button
    $('form[name=editproduct]').submit(function (e) {
        e.preventDefault();
        var name = document.getElementsByName("name")[0].value;
        var desc = document.getElementsByName("desc")[0].value;
        var price = document.getElementsByName("price")[0].value;
        var imgPath = document.getElementsByName("imgPath")[0].value;
        UploadEditedProduct(name, desc, price, imgPath, id);
    });
}

function UploadEditedProduct(name, desc, price, imgPath, id) {
    $.ajax({
        url: 'editproduct.php?name=' + name + '&desc=' + desc + '&price=' + price + '&imgPath=' + imgPath + '&id=' + id,
        complete: function (response) {
            alert(response.responseText);
            getListForEdit()
        },
        error: function () {
            alert('Bummer: there was an error!');
        }
    });
    return false;
}

function DeleteProduct(id) {
    $.ajax({
        url: 'deleteproduct.php?id=' + id,
        complete: function (response) {
            alert(response.responseText);
            getListForEdit()
        },
        error: function () {
            alert('Bummer: there was an error!');
        }
    });
    return false;
}

function getUserList() {
    $.ajax({
        url: 'listusers.php',
        complete: function (response) {
            $('#output').html(formatUserList(response.responseText));
        },
        error: function () {
            $('#output').html('Bummer: there was an error!');
        }
    });
    return false;
}

function formatUserList(responseTxt) {
    var res = responseTxt.split(":");
    var html = "<table>";
    html += "<th>ID</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Password</th><th>Edit</th><th>Delete</th>"

    for (i = 0; i < res.length - 1; i = i + 5) {
        var id = res[i];
        var firstname = res[i + 1];
        var lastname = res[i + 2];
        var email = res[i + 3];
        var password = res[i + 4];

        html += "<tr><td><p>" + id + "</td>";
        html += "<td>" + firstname + "</td>";
        html += "<td>" + lastname + "</td>";
        html += "<td>" + email + "</td>";
        html += "<td>" + password + "</td>";
        html += "<td><a onclick='editUserByID(\"" + id + "\", \"" + firstname + "\", \"" + lastname + "\", \"" + email + "\", \"" + password + "\")' href= '#'>Edit User</a></td>";
        html += "<td><a onclick='deleteUser(\"" + id + "\")' href= '#'>Delete User</a></td></tr>";
    }

    html += "</table>";
    return html;
}

function editUserByID(id, firstname, lastname, email, password) {
    var html = '<h1>Edit User</h1><form action="edituser.php" method="post" name="edituser">';
    html += '<p>First Name: <input type="text" name="firstname" size="20" maxlength="20" value="' + firstname + '" /> </p>';
    html += '<p>Last Name: <input type="text" name="lastname" size="20" maxlength="20" value="' + lastname + '" /> </p>';
    html += '<p>Email Address: <input type="text" name="email" size="20" maxlength="40" value="' + email + '" /> </p>';
    html += '<p>Password: <input type="text" name="password" size="20" maxlength="20" value="' + password + '" /> </p>';
    html += '<p><input type="submit" name="submit" value="Submit" /></p></form>';
    document.getElementById("output").innerHTML = html;

    //Override the submit button
    $('form[name=edituser]').submit(function (e) {
        e.preventDefault();
        var first = document.getElementsByName("firstname")[0].value;
        var last = document.getElementsByName("lastname")[0].value;
        var address = document.getElementsByName("email")[0].value;
        var pass = document.getElementsByName("password")[0].value;
        UploadEditedUser(first, last, address, pass, id);
    });
}

function UploadEditedUser(first, last, email, pass, id) {
    $.ajax({
        url: 'edituser.php?first=' + first + '&last=' + last + '&email=' + email + '&pass=' + pass + '&id=' + id,
        complete: function (response) {
            alert(response.responseText);
            getUserList();
        },
        error: function () {
            alert('Bummer: there was an error!');
        }
    });
    return false;
}

function deleteUser(id) {
    $.ajax({
        url: 'deleteaccount.php?id=' + id,
        complete: function (response) {
            alert(response.responseText);
            getUserList();
        },
        error: function () {
            alert('Bummer: there was an error!');
        }
    });
    return false;
}

function displayAdmin() {
    var html = '<div id="menu" class="menu"><h1>Administrator Panel</h1>';
    html += "<a onclick='productAdd()' href='#'>Add Product</a>";
    html += "<a onclick='getListForEdit()' href='#'>Edit Product</a>";
    html += "<a onclick='getUserList()' href='#'>Edit Users</a></div>";
    document.getElementById("output").innerHTML = html;
}

function CreateAcc(firstname, lastname, email, password) {
    $.ajax({
        url: 'createacc.php?firstname=' + firstname + '&lastname=' + lastname + '&email=' + email + '&password=' + password,
        complete: function (response) {
            alert(response.responseText);
            displayLogin();
        },
        error: function () {
            alert('Bummer: there was an error!');
        }
    });
    return false;
}

function login(email, password) {
    $.ajax({
        url: 'login.php?email=' + email + '&password=' + password,
        complete: function (response) {
            alert(response.responseText);
            if (response.responseText == "Logged In") {
                $('#firstname').html('Welcome back ' + getCookie("firstname"));
                location.reload();
            }
        },
        error: function () {
            alert('Bummer: there was an error!');
        }
    });
    return false;
}

function logout() {
    loggedin = false;
    document.cookie = "firstname=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    location.reload();
}