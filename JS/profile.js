const userId = JSON.parse(localStorage.getItem("userID"));
const userName = JSON.parse(localStorage.getItem("userName"));
const userEmail = JSON.parse(localStorage.getItem("userEmail"));
userAuthenticated = JSON.parse(localStorage.getItem("userAuthenticated"));
let email;
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

const form_sendRequests = document.querySelector("#form-email-request");

function renderEmail(formData) {
  email = formData.get("email");
  console.log(email);
}

form_sendRequests.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const form = document.getElementById("form-email-request");

  const formData = new FormData(evento.currentTarget);
  renderEmail(formData);

  fetch(
    `https://matter-app.herokuapp.com/api/v1/users/${userId}/invite?email=${email}`,
    {
      method: "POST",
      body: formData,
    }
  )
    .then((response) => response.json())
    .then((data) => {
      alert("Send Requests Success ✅");
      document.getElementById("form-email-request").reset();
    })
    .catch((e) => {
      document.getElementById("form-email-request").reset();
      debugger;
      alert("Somethings Wrong ❌");
    });
});

function loadData() {
  let containerWelcome = document.getElementById("welcome");
  let container2 = document.getElementById("profile-card2");
  if (userName) {
    containerWelcome.innerHTML += ` Profile: ${userName}.`;
    container2.innerHTML += `${userName}`;
  } else {
    containerWelcome.innerHTML += ` Profile: ${userEmail}.`;
    container2.innerHTML += `${userEmail}`;
  }
}
authenticated();
loadData();
