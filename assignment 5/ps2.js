


document.getElementById("saveName").addEventListener("click", function() {

    let name = document.getElementById("studentName").value;

    localStorage.setItem("studentName", name);

    document.getElementById("message1").textContent = "Name saved successfully!";

});




document.getElementById("displayName").addEventListener("click", function() {

    let name = localStorage.getItem("studentName");

    if (name) {
        document.getElementById("result1").textContent = name;
    } else {
        document.getElementById("result1").textContent = "No student name found.";
    }

});




document.getElementById("saveEmail").addEventListener("click", function() {

    let email = document.getElementById("email").value;

    localStorage.setItem("email", email);

    let savedEmail = localStorage.getItem("email");

    document.getElementById("result2").textContent = "Saved Email: " + savedEmail;

});



document.getElementById("saveUsername").addEventListener("click", function() {

    let username = document.getElementById("username").value;

    localStorage.setItem("username", username);

    document.getElementById("result3").textContent = "Username: " + username;

});


document.getElementById("removeUsername").addEventListener("click", function() {

    localStorage.removeItem("username");

    document.getElementById("result3").textContent = "Username removed successfully.";

});



document.getElementById("saveCity").addEventListener("click", function() {

    let city = document.getElementById("city").value;

    localStorage.setItem("city", city);

    document.getElementById("result4").textContent = "City saved successfully!";

});


document.getElementById("displayCity").addEventListener("click", function() {

    let city = localStorage.getItem("city");

    if (city) {
        document.getElementById("result4").textContent = "City: " + city;
    } else {
        document.getElementById("result4").textContent = "No city found.";
    }

});
