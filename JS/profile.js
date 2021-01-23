const userId = JSON.parse(localStorage.getItem("userID"));
const userName = JSON.parse(localStorage.getItem("userName"));
const userEmail = JSON.parse(localStorage.getItem("userEmail"));
userAuthenticated = JSON.parse(localStorage.getItem("userAuthenticated"));

let containerWelcome = document.getElementById("welcome");
let container2 = document.getElementById("profile-card2");

flag = JSON.parse(localStorage.getItem("flag"));
console.log(userId);

function authenticated() {
  if (userAuthenticated) {
    if (flag) {
      if (userName) {
        alert("Bienvenido " + userName + " 😀");
      } else {
        alert("Bienvenido " + userEmail + " 😀");
      }
    }
    localStorage.setItem("flag", JSON.stringify(false));
  } else {
    alert("No has iniciado sesión, por favor inicia sesión. 🚫");
    window.location = "./index.html";
  }
}

const form_updateProfile = document.querySelector("#form-edit");

form_updateProfile.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const user = { name };
  user.name = name;
  fetch(`https://matter-app.herokuapp.com/api/v1/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.status === 200) {
        alert("Update Success ✅");
        localStorage.setItem("userName", JSON.stringify(user.name));
        containerWelcome = "";
        container2 = "";
        loadData();
        window.location = "./profile.html";
        document.getElementById("form-edit").reset();
      } else if (response.status === 204) {
        alert("Somethings Wrong ❌");
        document.getElementById("form-edit").reset();
      }
    })
    .catch((e) => {
      document.getElementById("form-edit").reset();
      alert("Somethings Wrong ❌");
    });
});

function loadData() {
  if (userName) {
    containerWelcome.innerHTML += ` Profile: ${userName}.`;
    container2.innerHTML += `${userName}`;
    document.getElementById("name").value = `${userName}`;
  } else {
    containerWelcome.innerHTML += `Profiless: ${userEmail}.`;
    container2.innerHTML += `${userEmail}`;
    document.getElementById("name").value = `${userName}`;
  }
}
authenticated();
loadData();
