let employees = [];
const initialMessage = document.getElementById("initialMessage");
const addedEmployees = document.getElementById("addedEmployees");

function addEmployee(event) {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const professionInput = document.getElementById("profession");
  const ageInput = document.getElementById("age");
  const successMessage = document.getElementById("successMessage");
  const errorMessage = document.getElementById("errorMessage");

  const name = nameInput.value.trim();
  const profession = professionInput.value.trim();
  const age = parseInt(ageInput.value);


  if (!name || !profession || !age) {
    errorMessage.textContent =
      "Error: Please make sure all the fields are filled before adding an employee!";

    // Clear error message after 3 seconds
    setTimeout(() => {
      errorMessage.textContent = "";
    }, 3000);

    return;
  }


  const id = employees.length + 1;
  const employee = { id, name, profession, age };
  employees.push(employee);


  const employeeDiv = document.createElement("div");
  employeeDiv.className = "employee-box";
  employeeDiv.setAttribute("data-id", id);
  employeeDiv.innerHTML = `
    <div class="employee-details">
        
        <div>${id}. </div> 
        <div>Name: ${employee.name}  </div> 
        <div>Profession: ${employee.profession}   </div>
        <div>Age:  ${employee.age}  </div>
    </div>
    <button class="delete-button" onclick="deleteEmployee(${employee.id})">Delete User</button>
  `;
  addedEmployees.appendChild(employeeDiv);

  successMessage.textContent = "Success: Employee Added!";
  errorMessage.textContent = "";

  nameInput.value = "";

  professionInput.value = "";
  ageInput.value = "";

  // Hide initial message when employees are added
  initialMessage.style.display = "none";

  // Clear success message after 3 seconds
  setTimeout(() => {
    successMessage.textContent = "";
  }, 3000);
}

function deleteEmployee(id) {
  employees = employees.filter((employee) => employee.id !== id);
  const employeeDiv = document.querySelector(`.employee-box[data-id="${id}"]`);
  employeeDiv.parentNode.removeChild(employeeDiv);

  // Show initial message if no employees remaining
  if (employees.length === 0) {
    initialMessage.style.display = "block";
  }
}

const employeeForm = document.getElementById("employeeForm");
employeeForm.addEventListener("submit", addEmployee);
