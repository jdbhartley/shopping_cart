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
    var html = '<h1>Create Account</h1><form action="createacc.php" method="post" name="createacc">'
    html += '<p>First Name: <input type="text" name="firstname" size="20" maxlength="20" /> </p>'
    html += '<p>Last Name: <input type="text" name="lastname" size="20" maxlength="20" /> </p>'
    html += '<p>Email Address: <input type="text" name="email" size="20" maxlength="60" /> </p>'
    html += '<p>Password: <input type="password" name="pass" size="20" maxlength="20" /></p>'
    html += '<p><input type="submit" name="submit" value="Create Account" /></p></form>'
    document.getElementById("output").innerHTML = html;
    
    //Override the submit button
    $('form[name=createacc]').submit(function (e) {
        e.preventDefault();
        var firstname = document.getElementsByName("firstname")[0].value;
        var lastname = document.getElementsByName("lastname")[0].value;
        var email = document.getElementsByName("email")[0].value;
        var password = document.getElementsByName("pass")[0].value;
        CreateAcc(firstname, lastname, email, password);
    });
 }
 
  function CreateAcc(firstname, lastname, email, password) {
    $.ajax({
       url:'createacc.php?firstname=' + firstname + '&lastname=' + lastname + '&email=' + email + '&password=' + password,
       complete: function (response) {
           alert(response.responseText);
       },
       error: function () {
           alert('Bummer: there was an error!');
       }
   });
   return false;
 }
 
 function login(email, password) {
    $.ajax({
       url:'login.php?email=' + email + '&password=' + password,
       complete: function (response) {
           alert(response.responseText);
           $('#firstname').html('Welcome back ' + getCookie("firstname"));
           location.reload();
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
 
 function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}