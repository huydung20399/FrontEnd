document.addEventListener("DOMContentLoaded", function () {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const errorMessage = document.getElementById("error-message");
    const todoList = document.getElementById("todo-list");
    const clearBtn = document.getElementById("clear-btn");
    const addItemBtn = document.getElementById("add-item-btn");

    todoForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const todoText = todoInput.value.trim();
        if (todoText === "") {
            errorMessage.innerText = "Please enter a valid todo item.";
            return;
        }
        errorMessage.innerText = "";
        addTodoItem(todoText);
        todoInput.value = "";
    });

    function addTodoItem(todoText) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${todoText}</span>
            <i class="fas fa-edit edit"></i>
            <i class="fas fa-trash delete"></i>
        `;
        todoList.appendChild(listItem);
    }

    todoList.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete")) {
            e.target.parentElement.remove();
        } else if (e.target.classList.contains("edit")) {
            const todoText = e.target.previousElementSibling.textContent;
            todoInput.value = todoText;
            e.target.parentElement.remove();
            addItemBtn.innerText = "Update Item";
            addItemBtn.classList.add('update');
        }
    });

    clearBtn.addEventListener("click", function () {
        todoList.innerHTML = "";
    });

    // Thêm sự kiện click cho nút Add/Update Item
    addItemBtn.addEventListener("click", function () {
        if (addItemBtn.classList.contains("update")) {
            // Nếu nút có class "update", nghĩa là đang ở trạng thái Update
            addItemBtn.innerText = "Add Item"; // Chuyển nút về trạng thái Add Item
            addItemBtn.classList.remove("update"); // Loại bỏ class "update"
        }
    });
});