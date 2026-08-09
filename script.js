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
