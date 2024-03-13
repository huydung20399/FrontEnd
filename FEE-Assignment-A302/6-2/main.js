function Validator(options) {

    // tạo hàm thực thi validate
    function validate(inputElement,formElement, rule) {
        // lấy value user nhập trong ô input inputElement.value
        // test func: rule.test: lấy ra object test
        let errorMessage = rule.testFunction(inputElement.value);
        let errorElement = formElement.querySelector('.form-message');
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            formElement.classList.add('invalid-feedback');
        } else {
            errorElement.innerText = '';
            formElement.classList.remove('invalid-feedback');
        }
    }

    // gán giá trị form cần validate cho formElement
    let formElement = document.querySelector(options.form);

    // nếu formElement tồn tại
    if (formElement) {
        // options.rules trả về giá trị truyền trong rules
        // lặp qua mỗi rules để thực thi validator
        options.rules.forEach(function (rule) {
            // lấy các giá trị selector gán vào inputElement, lấy từ formElement
            let inputElement = formElement.querySelector(rule.selector);
            // Nếu inputElement có tồn tại, thực thi:
            if (inputElement) {
                // xử lý trường hợp blur ra khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, formElement ,rule);
                }

                // xóa lỗi khi người dùng bắt đầu nhập vào ô input
                inputElement.oninput = function () {
                    let errorElement = formElement.querySelector('.form-message');
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid-feedback');
                }
            }
        })
    }
}

Validator.isRequired = function (selector) {
    return {
        selector: selector,
        testFunction: function (value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này'
        }
    };
}

$(document).ready(function() {
    const formInput = $('#form-input');
    const inputItem = $('#input-item');
    const data = $('#data');
    const buttonClear = $('#btn-clear');

    loadTodoList();

    formInput.submit(function(e) {
        e.preventDefault();
        const textValue = inputItem.val().trim();
        addTodoItem(textValue);
        inputItem.val('');
        saveTodoList();
    });

    function addTodoItem(textValue) {
        const listItem = $('<li></li>');
        listItem.html(`
            <span>${textValue}</span>
            <i class="fas fa-edit edit" style="color: green"></i>
            <i class="far fa-times-circle delete" style="color: red"></i>
        `);
        data.append(listItem);
    }

    data.on('click', '.edit', function(e) {
        const textValue = $(this).prev().text();
        inputItem.val(textValue);
        $(this).parent().remove();
        saveTodoList();
    });

    data.on('click', '.delete', function(e) {
        $(this).parent().remove();
        saveTodoList();
    });

    buttonClear.click(function() {
        data.html('');
        localStorage.removeItem('todoList');
    });

    function loadTodoList() {
        const savedTodoList = localStorage.getItem('todoList');
        if (savedTodoList) {
            data.html(savedTodoList);
        }
    }

    function saveTodoList() {
        localStorage.setItem('todoList', data.html());
    }
});



// document.addEventListener("DOMContentLoaded", function () {
//     const formInput = document.getElementById('form-input');
//     const inputItem = document.getElementById('input-item');
//     const data = document.getElementById('data');
//     const buttonClear = document.getElementById('btn-clear');
//     const buttonAdd = document.getElementById('btn-add');
//
//     formInput.addEventListener("submit", function (e) {
//         e.preventDefault();
//         const todoText = inputItem.value.trim();
//         addTodoItem(todoText);
//         inputItem.value = "";
//     });
//
//     function addTodoItem(todoText) {
//         const listItem = document.createElement("li");
//         listItem.innerHTML = `
//             <span>${todoText}</span>
//             <i class="fas fa-edit edit" style="color: green"></i>
//             <i class="fas fa-trash delete" style="color: red"></i>
//         `;
//         data.appendChild(listItem);
//     }
//
//     data.addEventListener("click", function (e) {
//         if (e.target.classList.contains("delete")) {
//             e.target.parentElement.remove();
//         } else if (e.target.classList.contains("edit")) {
//             const todoText = e.target.previousElementSibling.textContent;
//             inputItem.value = todoText;
//             e.target.parentElement.remove();
//         }
//     });
//
//     buttonClear.addEventListener("click", function () {
//         data.innerHTML = "";
//     });
// });
