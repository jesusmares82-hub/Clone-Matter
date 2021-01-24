userAuthenticated = JSON.parse(localStorage.getItem("userAuthenticated"));
let name = "";
let email = "";
let password = "";
function printFormLogin() {
  localStorage.setItem("userAuthenticated", JSON.stringify(false));

  let container = document.getElementById("card-body");
  container.innerHTML = "";
  container.innerHTML += `<form id="form-login" class="form-login" action="">
                  <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label"
                    >Email address</label
                  >
                  <input
                    type="email"
                    class="form-control"
                    name="email"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    required
                  />
                  <div id="emailHelp" class="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label"
                    >Password</label
                  >
                  <input
                    type="password"
                    name="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="register"
                    >¿No account?
                    <a id="register" onclick="registerUser()" href="#"
                      >Create one!</a
                    >
                  </label>
                </div>

                <button id="sign" type="submit" class="btn btn-block rounded-pill btn-primary">
                  Login
                </button>
              </form>`;
}

printFormLogin();

function printFormRegister() {
  let container = document.getElementById("card-body");
  container.innerHTML = "";
  container.innerHTML += `<form id="form-register" class="form-login" action="">
                <div class="mb-3">
                  <label for="name" class="form-label"
                    >User Name</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    name="name"
                    id="name"
                    required
                  />
                  
                </div>              
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label"
                    >Email address</label
                  >
                  <input
                    type="email"
                    class="form-control"
                    name="email"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    required
                  />
                  <div id="emailHelp" class="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label"
                    >Password</label
                  >
                  <input
                    type="password"
                    name="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="register"
                    >¿Already have an account? 
                    <a id="register" onclick="finishRegister()" href="#"
                      >Login!</a
                    >
                  </label>
                </div>

                <button id="sign" type="submit" class="btn btn-block rounded-pill btn-primary">
                  Submit
                </button>
              </form>`;
}

function registerUser() {
  printFormRegister();
  const form = document.getElementById("form-register");
  const button = document.getElementById("sign");
  button.textContent = "Register";
  button.classList.remove("btn-primary");
  button.classList.add("btn-warning");
  form.classList.remove("form-login");
  form.classList.add("form-register");
  register = false;
  const form_register = document.querySelector("#form-register");

  function renderUsername(formData) {
    const name = formData.get("name");
  }

  function renderEmail(formData) {
    const email = formData.get("email");
  }

  function renderPassword(formData) {
    const password = formData.get("password");
  }

  form_register.addEventListener("submit", (event) => {
    const form = document.getElementById("form-user");
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    renderUsername(formData);
    renderEmail(formData);
    renderPassword(formData);
    fetch("https://matter-app.herokuapp.com/api/v1/users", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Register Success ✅");
        document.getElementById("form-register").reset();
        finishRegister();
      })
      .catch((e) => {
        alert("Somethings Wrong ❌");
        document.getElementById("form-register").reset();
      });
  });
}

const form_login = document.querySelector("#form-login");

function renderUsername(formData) {
  const name = formData.get("name");
}

function renderEmail(formData) {
  email = formData.get("email");
}

function renderPassword(formData) {
  password = formData.get("password");
}

form_login.addEventListener("submit", (event) => {
  const form = document.getElementById("form-login");
  event.preventDefault();
  const formData = new FormData(event.currentTarget);

  renderEmail(formData);
  renderPassword(formData);
  fetch(`https://matter-app.herokuapp.com/api/v1/auth/login`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      loginValidate(data);
    })
    .catch((e) => {
      document.getElementById("form-login").reset();
      alert("Somethings Wrong ❌");
    });
});

function finishRegister() {
  window.location = "./index.html";
}

function loginValidate(data) {
  let bandera = 0;
  const users = data;

  let i = 0;

  if (email === users.email) {
    bandera = 1;
    alert("Login Success ✅");
    //bootbox.alert("This is the default alert!");
    localStorage.setItem("userID", JSON.stringify(users.id));
    localStorage.setItem("userName", JSON.stringify(users.name));
    localStorage.setItem("userEmail", JSON.stringify(users.email));
    localStorage.setItem("user", JSON.stringify(users));
    localStorage.setItem("userAuthenticated", JSON.stringify(true));
    localStorage.setItem("flag", JSON.stringify(true));
    localStorage.setItem("flag2", JSON.stringify(true));
    window.location = "./home.html";
  }

  if (bandera == 0) {
    alert("Usuario no encontrado. ❌");
    localStorage.setItem("userAuthenticated", JSON.stringify(false));
  }

  document.getElementById("form-login").reset();
}

userAuthenticated = JSON.parse(localStorage.getItem("userAuthenticated"));
