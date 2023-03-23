const input = document.getElementById("todo-input");
const toggle = document.getElementById("todo-btn");
const alertContainer = document.querySelector(".list-group");
const apiUrl = "https://crudcrud.com/api/3f08263c66a54a5f90a115e210a82d8c/tasks";

const savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
    alertContainer.innerHTML = savedTasks;
}

toggle.addEventListener("click", function () {
    const task = input.value;
    const alertMsg = `
    <li class="list-group-item" data-id="">
      ${task}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </li>
  `;
    alertContainer.innerHTML += alertMsg;
    input.value = "";

    localStorage.setItem("tasks", alertContainer.innerHTML);

    const alerts = alertContainer.querySelectorAll(".alert");
    alerts.forEach((alert) => {
        alert.addEventListener("click", function (event) {
            const alertId = event.target.closest(".alert").getAttribute("data-id");
            if (alertId) {
                fetch(`${apiUrl}/${alertId}`, {
                    method: "DELETE",
                })
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    .catch((error) => console.log(error));
            }
            alert.classList.toggle("text-decoration-line-through");
        });
    });

    const closeButtons = alertContainer.querySelectorAll(".btn-close");
    closeButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const alert = button.parentElement;
            const alertId = alert.getAttribute("data-id");
            if (alertId) {
                fetch(`${apiUrl}/${alertId}`, {
                    method: "DELETE",
                })
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    .catch((error) => console.log(error));
            }
            alert.remove();
            localStorage.setItem("tasks", alertContainer.innerHTML);
        });
    });
    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            task: task
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const newAlert = alertContainer.querySelector(`[data-id=""]`);
            newAlert.setAttribute("data-id", data._id);
        })
        .catch((error) => console.log(error));
});

window.addEventListener("load", function () {
    const alerts = alertContainer.querySelectorAll(".list-group");
    alerts.forEach((alert) => {
        alert.addEventListener("click", function (event) {
            const alertId = event.target.closest(".list-group").getAttribute("data-id");
            if (alertId) {
                fetch(`${apiUrl}/${alertId}`, {
                    method: "DELETE",
                })
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    .catch((error) => console.log(error));
            }
            alert.classList.toggle("text-decoration-line-through");
        });
    });

    const closeButtons = alertContainer.querySelectorAll(".btn-close");
    closeButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const alert = button.parentElement;
            alert.remove();
            localStorage.setItem("tasks", alertContainer.innerHTML);
        });
    });
});
