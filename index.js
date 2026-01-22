const API_URL = "https://jsonplaceholder.typicode.com/posts";

let addBtn = document.querySelector(".add-employee");
let cancelButton = document.querySelector(".cancel-button");
let model = document.querySelector("#modal");

let id = document.getElementById("id");
let firstName = document.getElementById("first-name"); // Title
let lastName = document.getElementById("last-name");   // Body
let fullName = document.getElementById("full-name");   // User ID

const form = document.getElementById("employee-form");
let tableBody = document.getElementById("table-body");

let employeeData = [];
let editIndex = -1;

// Open Modal
addBtn.onclick = () => model.classList.add("active");

// Close Modal
cancelButton.onclick = () => {
  model.classList.remove("active");
  resetForm();
};

// GET - Fetch all posts
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    employeeData = data;
    renderTable();
  })
  .catch(err => console.error(err));

// Form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (editIndex === -1) {
    addEmployee();
  } else {
    updateEmployee();
  }
});

// add new data - POST

  document.getElementById('submit').addEventListener('click', function(e){
    e.preventDefault();
    var obj = {
      title: document.getElementById('first-name').value,
      body: document.getElementById('last-name').value,
      userId: document.getElementById('full-name').value,
    };
    fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({ obj }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
  employeeData.push(obj);
  renderTable();
  alert("Added Successfully!");
  model.classList.remove("active");
  resetForm();
  })



// DELETE
function deleteEmployee(index) {
  const postId = employeeData[index].id;

  fetch(`${API_URL}/${postId}`, { method: "DELETE" })
    .then(() => {
      employeeData.splice(index, 1);
      renderTable();
      alert("Deleted Successfully!");
    })
    .catch(err => console.error(err));
}

// EDIT
function editEmployee(index) {
  editIndex = index;
  const data = employeeData[index];

  id.value = data.id;
  firstName.value = data.title;
  lastName.value = data.body;
  fullName.value = data.userId;

  model.classList.add("active");
}

// RENDER TABLE
function renderTable() {
  tableBody.innerHTML = "";

  employeeData.map((post, index) => {
    let row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${post.userId}</td>
      <td>${post.id}</td>
      <td>${post.title}</td>
      <td>${post.body}</td>
      <td>
        <button class="edit-button" onclick="editEmployee(${index})">Edit</button>
        <button class="delete-button" onclick="deleteEmployee(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// RESET FORM
function resetForm() {
  form.reset();
  editIndex = -1;
}
