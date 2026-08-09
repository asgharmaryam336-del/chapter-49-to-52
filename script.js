/* =========================================================
   QUESTION 1
   Signup form - display form data in the page on submission
   ========================================================= */

const signupForm = document.getElementById("signupForm");
const signupOutput = document.getElementById("signupOutput");

signupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    signupOutput.innerHTML = "<p>Passwords do not match. Please try again.</p>";
    return;
  }

  signupOutput.innerHTML = `
    <p>Full Name: ${fullName}</p>
    <p>Email: ${email}</p>
    <p>Password: ${password}</p>
  `;

  signupForm.reset();
});


/* =========================================================
   QUESTION 2
   Content area with items - "Read more" reveals full detail
   ========================================================= */

const readMoreButtons = document.querySelectorAll(".read-more-btn");

readMoreButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const fullDetail = btn.previousElementSibling;

    if (fullDetail.style.display === "none") {
      fullDetail.style.display = "block";
      btn.textContent = "Read less";
    } else {
      fullDetail.style.display = "none";
      btn.textContent = "Read more";
    }
  });
});


/* =========================================================
   QUESTION 3
   Student table - Add / Edit / Delete
   ========================================================= */

let students = [];
let editingIndex = null;

const studentForm = document.getElementById("studentForm");
const studentTableBody = document.getElementById("studentTableBody");

const editForm = document.getElementById("editForm");
const editFormTitle = document.getElementById("editFormTitle");
const editName = document.getElementById("editName");
const editRollNo = document.getElementById("editRollNo");
const editClassName = document.getElementById("editClassName");
const cancelEditBtn = document.getElementById("cancelEditBtn");


function renderTable() {
  studentTableBody.innerHTML = "";

  students.forEach(function (student, index) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${student.name}</td>
      <td>${student.rollNo}</td>
      <td>${student.className}</td>
      <td>
        <button class="edit-btn" data-index="${index}">Edit</button>
        <button class="delete-btn" data-index="${index}">Delete</button>
      </td>
    `;

    studentTableBody.appendChild(row);
  });
}


// Add new student
studentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("studentName").value;
  const rollNo = document.getElementById("rollNo").value;
  const className = document.getElementById("className").value;

  students.push({ name, rollNo, className });

  renderTable();
  studentForm.reset();
});


// Delete / Edit buttons (event delegation on table body)
studentTableBody.addEventListener("click", function (e) {

  if (e.target.classList.contains("delete-btn")) {
    const index = Number(e.target.dataset.index);
    students.splice(index, 1);
    renderTable();
  }

  if (e.target.classList.contains("edit-btn")) {
    const index = Number(e.target.dataset.index);
    editingIndex = index;

    const student = students[index];
    editName.value = student.name;
    editRollNo.value = student.rollNo;
    editClassName.value = student.className;

    editFormTitle.style.display = "block";
    editForm.style.display = "block";
  }

});


// Update student (submit hidden edit form)
editForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (editingIndex === null) return;

  students[editingIndex] = {
    name: editName.value,
    rollNo: editRollNo.value,
    className: editClassName.value
  };

  renderTable();

  editingIndex = null;
  editForm.reset();
  editFormTitle.style.display = "none";
  editForm.style.display = "none";
});


// Cancel edit
cancelEditBtn.addEventListener("click", function () {
  editingIndex = null;
  editForm.reset();
  editFormTitle.style.display = "none";
  editForm.style.display = "none";
});
