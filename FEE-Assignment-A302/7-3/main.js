// java script thuần
function send() {
    if (validate()) {
        addData();
    } else {
        alert('Please enter all field!');
    }
}


// check validate cho các field khi để trống
function validate() {
    // validate field trống
    // validateField('first-name');
    // validateField('last-name');
    // validateField('email');
    // validateField('phone');
    // validateField('address');
    // validateField('city');
    // validateField('zip-code');
    // validateField('name-on-card');
    // validateField('credit');
    // validateField('month');
    // validateField('year');
    // validateField('cvv');
    let isValid = true;

    let fieldsToValidate = ['first-name', 'last-name', 'email', 'phone', 'address', 'city', 'zip-code', 'name-on-card', 'credit', 'month', 'year', 'cvv'];
    fieldsToValidate.forEach(function (fieldName) {
        if (!validateField(fieldName)) {
            isValid = false;
        }
    })

    if (!submitForm()) {
        isValid = false;
    }

    return isValid;
}

function validateField(fieldName) {
    let value = document.getElementById(fieldName).value;
    let errorMessage = 'Please enter in this field!';
    let errorElement = document.querySelector(`.error-${fieldName}`);

    if (value === '') {
        errorElement.innerText = errorMessage;
        return false;
    } else {
        errorElement.innerText = '';
        return true;
    }
}


// xóa lỗi khi đang nhập vào ô input
// Lắng nghe sự kiện input trên tất cả các trường có tag là 'input'
document.querySelectorAll('input').forEach(function (field) {
    field.addEventListener('input', function () {
        clearError(field.id);
    });
});

function clearError(fieldName) {
    let errorElement = document.querySelector(`.error-${fieldName}`);
    errorElement.innerText = '';
}

// validate cho ô check
function submitForm() {
    let checkbox = document.getElementById('check');
    let errorMessage = document.querySelector('.error-check');

    if (!checkbox.checked) {
        errorMessage.innerText = 'Please check this box';
        return false; // Ngăn chặn việc submit form nếu checkbox chưa được tích chọn
    } else {
        errorMessage.innerText = '';
        return true; // Cho phép submit form nếu checkbox đã được tích chọn
    }
}


// check validate theo yêu cầu đề

// regex Last Name, First Name, Address, City, Name On Card
function validateTextName(value) {
    let regex = /^[a-zA-Z0-9 ]*$/;
    return regex.test(value);
}

function checkTextName(fieldName) {
    let value = document.getElementById(fieldName).value;
    let message = 'Please enter data in character form';
    let errorElement = document.querySelector(`.error-${fieldName}`);

    if (!validateTextName(value)) {
        errorElement.innerText = message;
    } else {
        errorElement.innerText = '';
    }
}

function validateNumber(value, number) {
    let regex = new RegExp(`^[0-9]{${number}}$`);
    return regex.test(value);
}

// validate phone:
function checkPhone(fieldName) {
    let value = document.getElementById(fieldName).value;
    let message = 'Please enter number 0 - 9 and do not exceed 10 number';
    let errorElement = document.querySelector(`.error-${fieldName}`);

    if (!validateNumber(value, 10)) {
        errorElement.innerText = message;
    } else {
        errorElement.innerText = '';
    }
}

// validate zip-code
function checkZipCode(fieldName) {
    let value = document.getElementById(fieldName).value;
    let message = 'Please re-enter!';
    let errorElement = document.querySelector(`.error-${fieldName}`);

    if (!validateNumber(value, 5)) {
        errorElement.innerText = message;
    } else {
        errorElement.innerText = '';
    }
}

// validate cvv
function checkCVV(fieldName) {
    let value = document.getElementById(fieldName).value;
    let message = 'Please re-enter!';
    let errorElement = document.querySelector(`.error-${fieldName}`);

    if (!validateNumber(value, 3)) {
        errorElement.innerText = message;
    } else {
        errorElement.innerText = '';
    }
}

// validate email
function validateEmail(value) {
    let regex = /^[a-zA-Z0-9._%+-]+@fsoft\.com\.vn$/;
    return regex.test(value);
}

function checkEmail(fieldName) {
    let value = document.getElementById(fieldName).value;
    let message = 'Please enter according form: example@fsoft.com.vn';
    let errorElement = document.querySelector(`.error-${fieldName}`);

    if (!validateEmail(value)) {
        errorElement.innerText = message;
    } else {
        errorElement.innerText = '';
    }
}

// validate month
function validateMonth(value) {
    let regex = /^(0[1-9]|1[0-2])$/;
    return regex.test(value);
}

function checkMonth(fieldName) {
    let value = document.getElementById(fieldName).value;
    let message = 'Please enter month 01 - 12!';
    let errorElement = document.querySelector(`.error-${fieldName}`);

    if (!validateMonth(value)) {
        errorElement.innerText = message;
    } else {
        errorElement.innerText = '';
    }
}

// validate year
function validateYear(value) {
    let regex = /^(200[1-9]|20[1-9][0-9]|2[1-9][0-9]{2}|[3-9][0-9]{3})$/;
    return regex.test(value);
}

function checkYear(fieldName) {
    let value = document.getElementById(fieldName).value;
    let message = 'Please re-enter';
    let errorElement = document.querySelector(`.error-${fieldName}`);

    if (!validateYear(value)) {
        errorElement.innerText = message;
    } else {
        errorElement.innerText = '';
    }
}

// validate credit card number
function validateCreditNumber(value) {
    let regex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    return regex.test(value);
}

function checkCreditNumber(fieldName) {
    let value = document.getElementById(fieldName).value;
    let message = 'Please enter according to xxxx-xxxx-xxxx-xxxx';
    let errorElement = document.querySelector(`.error-${fieldName}`);

    if (!validateCreditNumber(value)) {
        errorElement.innerText = message;
    } else {
        errorElement.innerText = '';
    }
}

// automatically add - after entering 4 numbers
let creditInputElement = document.getElementById('credit');
creditInputElement.addEventListener('input', function (event) {
    let value = event.target.value.replace(/\D/g, ''); // Loại bỏ tất cả các ký tự không phải số
    value = value.replace(/(.{4})/g, '$1-'); // Thêm dấu "-" sau mỗi cụm 4 số
    // Loại bỏ dấu "-" cuối cùng nếu có
    if (value.endsWith('-')) {
        value = value.slice(0, -1);
    }

    // Kiểm tra chiều dài của giá trị
    if (value.length >= 19) { // Nếu đã đủ 16 số và 3 dấu "-", tổng cộng là 19 ký tự
        // Ngăn người dùng nhập thêm
        event.target.value = value.slice(0, 19);
    } else {
        event.target.value = value;
    }
});


// save data into table
function addData() {
    let inputs = document.querySelectorAll('input');

    let valueFirstName = document.getElementById('first-name').value;
    let valueLastName = document.getElementById('last-name').value;
    let valueEmail = document.getElementById('email').value;
    let valuePhone = document.getElementById('phone').value;
    let valueAddress = document.getElementById('address').value;
    let valueZipcode = document.getElementById('zip-code').value;
    let valueNameOnCard = document.getElementById('name-on-card').value;
    let valueCreditCard = document.getElementById('credit').value;
    let valueExpMonth = document.getElementById('month').value;
    let valueExpYear = document.getElementById('year').value;
    let valueCvv = document.getElementById('cvv').value;

    let userData = {
        firstName: valueFirstName,
        lastName: valueLastName,
        email: valueEmail,
        phone: valuePhone,
        address: valueAddress,
        zipCode: valueZipcode,
        nameOnCard: valueNameOnCard,
        creditCardNumber: valueCreditCard,
        expMonth: valueExpMonth,
        expYear: valueExpYear,
        cvv: valueCvv
    };
    addToTable(userData);
    saveToLocalStorage(userData);

    inputs.forEach(function (input) {
        input.value = '';
    })
}

function addToTable(userData) {
    let tableBodyElement = document.querySelector('.table tbody');
    const rowData = document.createElement('tr');
    rowData.innerHTML = `
        <td>${userData.firstName}</td>
        <td>${userData.lastName}</td>
        <td>${userData.email}</td>
        <td>${userData.phone}</td>
        <td>${userData.address}</td>
        <td>${userData.zipCode}</td>
        <td>${userData.nameOnCard}</td>
        <td>${userData.creditCardNumber}</td>
        <td>${userData.expMonth}</td>
        <td>${userData.expYear}</td>
        <td>${userData.cvv}</td>
        <td class="action">
            <i class="fas fa-user-edit edit"></i>
            <i class="fas fa-trash delete"></i>
        </td>
    `;
    tableBodyElement.appendChild(rowData);

    // cách 2: insert row vào table, lưu ý: thêm thẻ tbody vào table
    // let table = document.querySelector('.table tbody');
    // let row = table.insertRow();
    // let keys = Object.keys(userData);
    // keys.forEach(function(key, index) {
    //     let cell = row.insertCell(index);
    //     cell.textContent = userData[key];
    // });
}

function saveToLocalStorage(userData) {
    let storedData = localStorage.getItem('userData');
    let dataArray = storedData ? JSON.parse(storedData) : [];
    dataArray.push(userData);
    localStorage.setItem('userData', JSON.stringify(dataArray));
}

// xử lý modal
let tableElement = document.querySelector('.table');
tableElement.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete')) {
        // Lấy hàng cần xóa, e.target sẽ trả về giá element i, gọi 2 lần parent để tới thẻ tr (i -> td -> tr)
        let rowToDelete = e.target.parentElement.parentElement;

        // Hiển thị hộp thoại confirm để xác nhận xóa
        let confirmation = confirm('Are you sure you want to delete this Record data?');

        // Nếu người dùng nhấn OK trong confirm, xóa hàng
        if (confirmation) {
            rowToDelete.remove();
        }
    } else if (e.target.classList.contains('edit')) {
        // Lấy các giá trị trong hàng (row) hiện tại
        let row = e.target.parentElement.parentElement;
        let cells = row.querySelectorAll('td');
        let values = [];
        cells.forEach(cell => {
            values.push(cell.textContent);
        });

        // Lấy phần tử input trong form
        let inputElements = document.querySelectorAll('.form-common input');

        // Gán các giá trị từ hàng vào các input tương ứng
        inputElements.forEach((input, index) => {
            input.value = values[index];
        });
    }
});


// JQuery
// $(document).ready(function () {
//     // check validate cho các field khi để trống
//     function validate() {
//         let isValid = true;
//
//         let fieldsToValidate = ['first-name', 'last-name', 'email', 'phone', 'address', 'city', 'zip-code', 'name-on-card', 'credit', 'month', 'year', 'cvv'];
//         fieldsToValidate.forEach(function (fieldName) {
//             if (!validateField(fieldName)) {
//                 isValid = false;
//             }
//         });
//
//         if (!submitForm()) {
//             isValid = false;
//         }
//
//         return isValid;
//     }
//
//     function validateField(fieldName) {
//         let value = $('#' + fieldName).val();
//         let errorMessage = 'Please enter in this field!';
//         let errorElement = $(`.error-${fieldName}`);
//
//         if (value === '') {
//             errorElement.text(errorMessage);
//             return false;
//         } else {
//             errorElement.text('');
//             return true;
//         }
//     }
//
//     // xóa lỗi khi đang nhập vào ô input
//     // Lắng nghe sự kiện input trên tất cả các trường có tag là 'input'
//     $('input').on('input', function () {
//         clearError($(this).attr('id'));
//     });
//
//     function clearError(fieldName) {
//         let errorElement = $(`.error-${fieldName}`);
//         errorElement.text('');
//     }
//
//     // validate cho ô check
//     function submitForm() {
//         let checkbox = $('#check');
//         let errorMessage = $('.error-check');
//
//         if (!checkbox.prop('checked')) {
//             errorMessage.text('Please check this box');
//             return false; // Ngăn chặn việc submit form nếu checkbox chưa được tích chọn
//         } else {
//             errorMessage.text('');
//             return true; // Cho phép submit form nếu checkbox đã được tích chọn
//         }
//     }
//
//     // check validate theo yêu cầu đề
//
//     // regex Last Name, First Name, Address, City, Name On Card
//     function validateLastName(value) {
//         let regex = /^[a-zA-Z0-9 ]*$/;
//         return regex.test(value);
//     }
//
//     function checkTextName(fieldName) {
//         let value = $('#' + fieldName).val();
//         let message = 'Please enter data in character form';
//         let errorElement = $(`.error-${fieldName}`);
//
//         if (!validateLastName(value)) {
//             errorElement.text(message);
//         } else {
//             errorElement.text('');
//         }
//     }
//
//     function validateNumber(value, number) {
//         let regex = new RegExp(`^[0-9]{${number}}$`);
//         return regex.test(value);
//     }
//
//     // validate phone:
//     function checkPhone(fieldName) {
//         let value = $('#' + fieldName).val();
//         let message = 'Please enter number 0 - 9 and do not exceed 10 number';
//         let errorElement = $(`.error-${fieldName}`);
//
//         if (!validateNumber(value, 10)) {
//             errorElement.text(message);
//         } else {
//             errorElement.text('');
//         }
//     }
//
//     // validate zip-code
//     function checkZipCode(fieldName) {
//         let value = $('#' + fieldName).val();
//         let message = 'Please re-enter!';
//         let errorElement = $(`.error-${fieldName}`);
//
//         if (!validateNumber(value, 5)) {
//             errorElement.text(message);
//         } else {
//             errorElement.text('');
//         }
//     }
//
//     // validate cvv
//     function checkCVV(fieldName) {
//         let value = $('#' + fieldName).val();
//         let message = 'Please re-enter!';
//         let errorElement = $(`.error-${fieldName}`);
//
//         if (!validateNumber(value, 3)) {
//             errorElement.text(message);
//         } else {
//             errorElement.text('');
//         }
//     }
//
//     // validate email
//     function validateEmail(value) {
//         let regex = /^[a-zA-Z0-9._%+-]+@fsoft\.com\.vn$/;
//         return regex.test(value);
//     }
//
//     function checkEmail(fieldName) {
//         let value = $('#' + fieldName).val();
//         let message = 'Please enter according form: example@fsoft.com.vn';
//         let errorElement = $(`.error-${fieldName}`);
//
//         if (!validateEmail(value)) {
//             errorElement.text(message);
//         } else {
//             errorElement.text('');
//         }
//     }
//
//     // validate month
//     function validateMonth(value) {
//         let regex = /^(0[1-9]|1[0-2])$/;
//         return regex.test(value);
//     }
//
//     function checkMonth(fieldName) {
//         let value = $('#' + fieldName).val();
//         let message = 'Please enter month 01 - 12!';
//         let errorElement = $(`.error-${fieldName}`);
//
//         if (!validateMonth(value)) {
//             errorElement.text(message);
//         } else {
//             errorElement.text('');
//         }
//     }
//
//     // validate year
//     function validateYear(value) {
//         let regex = /^(200[1-9]|20[1-9][0-9]|2[1-9][0-9]{2}|[3-9][0-9]{3})$/;
//         return regex.test(value);
//     }
//
//     function checkYear(fieldName) {
//         let value = $('#' + fieldName).val();
//         let message = 'Please re-enter';
//         let errorElement = $(`.error-${fieldName}`);
//
//         if (!validateYear(value)) {
//             errorElement.text(message);
//         } else {
//             errorElement.text('');
//         }
//     }
//
//     // validate credit card number
//     function validateCreditNumber(value) {
//         let regex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
//         return regex.test(value);
//     }
//
//     function checkCreditNumber(fieldName) {
//         let value = $('#' + fieldName).val();
//         let message = 'Please enter according to xxxx-xxxx-xxxx-xxxx';
//         let errorElement = $(`.error-${fieldName}`);
//
//         if (!validateCreditNumber(value)) {
//             errorElement.text(message);
//         } else {
//             errorElement.text('');
//         }
//     }
//
//     // automatically add - after entering 4 numbers
//     let creditInputElement = $('#credit');
//     creditInputElement.on('input', function (event) {
//         let value = $(this).val().replace(/\D/g, ''); // Loại bỏ tất cả các ký tự không phải số
//         value = value.replace(/(.{4})/g, '$1-'); // Thêm dấu "-" sau mỗi cụm 4 số
//         // Loại bỏ dấu "-" cuối cùng nếu có
//         if (value.endsWith('-')) {
//             value = value.slice(0, -1);
//         }
//
//         // Kiểm tra chiều dài của giá trị
//         if (value.length >= 19) { // Nếu đã đủ 16 số và 3 dấu "-", tổng cộng là 19 ký tự
//             // Ngăn người dùng nhập thêm
//             $(this).val(value.slice(0, 19));
//         } else {
//             $(this).val(value);
//         }
//     });
//
//     // save data into table
//     function addData() {
//         let inputs = $('input');
//
//         let valueFirstName = $('#first-name').val();
//         let valueLastName = $('#last-name').val();
//         let valueEmail = $('#email').val();
//         let valuePhone = $('#phone').val();
//         let valueAddress = $('#address').val();
//         let valueZipcode = $('#zip-code').val();
//         let valueNameOnCard = $('#name-on-card').val();
//         let valueCreditCard = $('#credit').val();
//         let valueExpMonth = $('#month').val();
//         let valueExpYear = $('#year').val();
//         let valueCvv = $('#cvv').val();
//
//         let userData = {
//             firstName: valueFirstName,
//             lastName: valueLastName,
//             email: valueEmail,
//             phone: valuePhone,
//             address: valueAddress,
//             zipCode: valueZipcode,
//             nameOnCard: valueNameOnCard,
//             creditCardNumber: valueCreditCard,
//             expMonth: valueExpMonth,
//             expYear: valueExpYear,
//             cvv: valueCvv
//         };
//         addToTable(userData);
//         saveToLocalStorage(userData);
//
//         inputs.val('');
//     }
//
//     function addToTable(userData) {
//         let tableBodyElement = $('.table tbody');
//         const rowData = $('<tr>').html(`
//             <td>${userData.firstName}</td>
//             <td>${userData.lastName}</td>
//             <td>${userData.email}</td>
//             <td>${userData.phone}</td>
//             <td>${userData.address}</td>
//             <td>${userData.zipCode}</td>
//             <td>${userData.nameOnCard}</td>
//             <td>${userData.creditCardNumber}</td>
//             <td>${userData.expMonth}</td>
//             <td>${userData.expYear}</td>
//             <td>${userData.cvv}</td>
//             <td class="action">
//                 <i class="fas fa-user-edit edit"></i>
//                 <i class="fas fa-trash delete"></i>
//             </td>
//         `);
//         tableBodyElement.append(rowData);
//     }
//
//     function saveToLocalStorage(userData) {
//         let storedData = localStorage.getItem('userData');
//         let dataArray = storedData ? JSON.parse(storedData) : [];
//         dataArray.push(userData);
//         localStorage.setItem('userData', JSON.stringify(dataArray));
//     }
//
//     // xử lý modal
//     $('.table').on('click', function (e) {
//         if ($(e.target).hasClass('delete')) {
//             // Lấy hàng cần xóa, e.target sẽ trả về giá element i, gọi 2 lần parent để tới thẻ tr (i -> td -> tr)
//             let rowToDelete = $(e.target).parent().parent();
//
//             // Hiển thị hộp thoại confirm để xác nhận xóa
//             let confirmation = confirm('Are you sure you want to delete this Record data?');
//
//             // Nếu người dùng nhấn OK trong confirm, xóa hàng
//             if (confirmation) {
//                 rowToDelete.remove();
//             }
//         } else if ($(e.target).hasClass('edit')) {
//             // Lấy các giá trị trong hàng (row) hiện tại
//             let row = $(e.target).parent().parent();
//             let values = [];
//             row.find('td').each(function () {
//                 values.push($(this).text());
//             });
//
//             // Gán các giá trị từ hàng vào các input tương ứng
//             $('.form-common input').each(function (index) {
//                 $(this).val(values[index]);
//             });
//         }
//     });
// });