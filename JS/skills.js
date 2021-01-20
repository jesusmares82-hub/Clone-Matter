const userId = JSON.parse(localStorage.getItem("userID"));
const userName = JSON.parse(localStorage.getItem("userName"));
const userEmail = JSON.parse(localStorage.getItem("userEmail"));
userAuthenticated = JSON.parse(localStorage.getItem("userAuthenticated"));
console.log(userId);

function authenticated() {
  if (userAuthenticated) {
  } else {
    alert("No has iniciado sesión, por favor inicia sesión. 🚫");
    window.location = "./index.html";
  }
}

function skillsScore() {
  let container = document.getElementById("skill1");
  container.innerHTML = "";
  let container2 = document.getElementById("skill2");
  container2.innerHTML = "";
  let container3 = document.getElementById("skill3");
  container3.innerHTML = "";

  fetch(`https://matter-app.herokuapp.com/api/v1/skills`)
    .then((response) => response.json())
    .then((data) => {
      container.innerHTML += `${data[0].name}`;
      container2.innerHTML += `${data[1].name}`;
      container3.innerHTML += `${data[2].name}`;
    })
    .catch((e) => {
      debugger;
      alert("Somethings Wrong ❌");
    });
}

skillsScore();
authenticated();
