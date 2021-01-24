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
      loadData2();
      document.getElementById("form-email-request").reset();
    })
    .catch((e) => {
      document.getElementById("form-email-request").reset();
      alert(`Somethings Wrong ${e} ❌`);
    });
});

function loadData2() {
  let container = document.getElementById("card-advisors");
  fetch(`https://matter-app.herokuapp.com/api/v1/users/${userId}/invitations`)
    .then((response) => response.json())
    .then((data) => {
      let i = 0;
      data.forEach((element) => {
        container.innerHTML += `<li class="list-group-item"> <a href="#" style="text-decoration:none"> <img
                        class="img-fluid px-3 px-sm-4 mt-3 mb-4"
                        style="width: 100px"
                        src="./IMG/matter_profile.png"
                        alt=""
                      /> <span class="ml-3">${data[i].user_invited.email}</span> <p class="ml-3"> Requested: ${data[i].user_invited.created_at}</p> </a> </li>`;
        i++;
      });
    })
    .catch((e) => {
      console.log(e);
      //alert("Somethings Wrong 1❌");
    });
}
loadData2();
authenticated();
