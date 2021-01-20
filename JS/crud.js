let users = [
  {
    id: 1,
    name: "Erik",
    age: 29,
    email: "erik@academlo.com",
    social: [
      { name: "facebook", url: "facebook/erik" },
      { name: "twitter", url: "twitter/erik" },
    ],
    gender: "Male",
  },
  {
    id: 2,
    name: "Georg",
    age: 33,
    email: "georg@academlo.com",
    social: [
      { name: "facebook", url: "facebook/georg" },
      { name: "twitter", url: "twitter/georg" },
    ],
    gender: "Male",
  },
  {
    id: 3,
    name: "Andrea",
    age: 42,
    email: "andrea@hotmail.com",
    social: [
      { name: "facebook", url: "facebook/andrea" },
      { name: "twitter", url: "twitter/andrea" },
    ],
    gender: "Female",
  },
  {
    id: 4,
    name: "Oscar",
    age: 31,
    email: "oscar@academlo.com",
    social: [
      { name: "facebook", url: "facebook/oscar" },
      { name: "twitter", url: "twiter/oscar" },
    ],
    gender: "Male",
  },
  {
    id: 5,
    name: "Daniela",
    age: 22,
    email: "andrea@uaq.mx",
    social: [
      { name: "facebook", url: "facebook/andrea" },
      { name: "twitter", url: "twitter/andrea" },
    ],
    gender: "Female",
  },
];
userAuthenticated = JSON.parse(localStorage.getItem("userAuthenticated"));

let updating = false;
let updatingId = -1;
function printUsers() {
  // 1. Obtenga el elemento html en el que quiero poner los usuarios
  // 2. Genero el html de los usuarios
  // 3. Pongo el html en el elemento obtenido
  const container = document.getElementById("container-users");
  let html = "";
  users.forEach((user) => {
    html += `<tr>
           <td>${user.name}</td>
           <td>${user.email}</td>
           <td>
            <button onClick="deleteUser(${user.id})" class="btn btn-danger">
              Eliminar
              </button>
           </td>
           <td>
            <button onClick="enableupdateUser(${user.id})" class="btn btn-warning">
              Actualizar
              </button>
           </td>
           </tr>`;
  });
  container.innerHTML = html;
}

function deleteUser(id) {
  // como obtengo el indice del elemento si lo que yo recibo es el id. findIndex
  const index = users.findIndex((user) => user.id == id);
  users.splice(index, 1);
  //console.log(users);
  printUsers();
  //alert(`Se va a eliminar el usuario con el id ${id}`);
}

function enableupdateUser(id) {
  updatingId = id;
  const user = users.find((user) => user.id === id);
  const inputName = document.getElementById("name");
  inputName.value = user.name;
  document.getElementById("email").value = user.email;
  updating = true;

  const button = document.getElementById("save");
  button.textContent = "Actualizar";
  button.classList.remove("btn-primary");
  button.classList.add("btn-warning");
  document.getElementById("cancel").classList.remove("d-none");
}

function addUser() {
  //obtener el valor del input
  // agregar el usuario al arregko
  //imprimo nuevamente los usuarios
  if (updating) {
    updateUser();
    return;
  }
  const inputName = document.getElementById("name");
  const name = inputName.value;
  const email = document.getElementById("email").value;
  let id = 1;
  if (users.length > 0) {
    id = users[users.length - 1].id + 1;
  }

  const newUser = {
    name,
    email,
    id,
  };
  users.push(newUser);
  printUsers();

  // limpiamos el formulario
  document.getElementById("form-user").reset();
}

function updateUser() {
  const user = users.find((user) => user.id === updatingId);
  const inputName = document.getElementById("name");
  const name = inputName.value;

  const email = document.getElementById("email").value;
  user.name = name;
  user.email = email;

  printUsers();

  // limpiamos el formulario
  document.getElementById("form-user").reset();
  cancelEdition();
  //updating = false;
  //updatingId = -1;
  //const button = document.getElementById("save");
  //button.textContent = "Submit";
  //button.classList.remove("btn-warning");
  //button.classList.add("btn-primary");
}

function cancelEdition() {
  // limpiamos el formulario
  document.getElementById("form-user").reset();

  updating = false;
  updatingId = -1;
  const button = document.getElementById("save");
  button.textContent = "Submit";
  button.classList.remove("btn-warning");
  button.classList.add("btn-primary");
  document.getElementById("cancel").classList.add("d-none");
}

function closeSesion() {
  localStorage.setItem("userAuthenticated", JSON.stringify(false));
  window.location = "./index.html";
}
function authenticated() {
  if (userAuthenticated) {
    printUsers();
  } else {
    alert("No has iniciado sesión, por favor inicia sesión.");
    window.location = "./index.html";
  }
}
authenticated();
