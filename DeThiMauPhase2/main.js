function send() {
    if (validate()) {
        addData();
    }
}

function validate() {
    let isValid = true;
    let arrayFieldInput = ['full-name', 'birthday', 'classroom-block', 'classroom', 'mark-math', 'mark-physical', 'mark-chemistry'];
    arrayFieldInput.forEach(function (fieldName) {
        if (!validateFieldInput(fieldName)){
            isValid = false;
        }
    })

    if (!validateGenderSelection()) {
        isValid = false;
    }

    return isValid;
}

function validateFieldInput(fieldName) {
    let value = document.getElementById(fieldName).value;
    let errorMessage = 'Vui lòng nhập vào trường này!';
    let errorElement = document.querySelector(`.error-${fieldName}`);

    if (value === '') {
        errorElement.innerText = errorMessage;
        return false;
    } else {
        errorElement.innerText = '';
        return true;
    }
}

function validateGenderSelection() {
    let genderInputs = document.querySelectorAll('input[name="gender"]');
    let errorMessage = 'Vui lòng chọn giới tính!';
    let errorElement = document.querySelector('.error-gender');

    let isSelected = false;
    genderInputs.forEach(function(input) {
        if (input.checked) {
            isSelected = true;
        }
    });

    if (!isSelected) {
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

// Lắng nghe sự kiện input[name="gender"] trên tất cả các trường có tag là 'input'
document.querySelectorAll('input[name="gender"]').forEach(function (field) {
    field.addEventListener('click', function () {
        clearError(field.name);
    });
});

// Lắng nghe sự kiện select trên tất cả các trường có tag là 'select'
document.querySelectorAll('select').forEach(function (field) {
    field.addEventListener('change', function () {
        clearError(field.id);
    });
});

function clearError(fieldName) {
    let errorElement = document.querySelector(`.error-${fieldName}`);
    errorElement.innerText = '';
}

function validateTextName(value) {
    //  /^[a-zA-Z ]*$/
    let regex = /^[\p{L} ]*$/u;
    return regex.test(value);
}

function checkTextName(fieldName) {
    let value = document.getElementById(fieldName).value;
    let message = 'Vui lòng nhập đúng mẫu của trường này!';
    let errorElement = document.querySelector(`.error-${fieldName}`);

    if (!validateTextName(value)) {
        errorElement.innerText = message;
    } else {
        errorElement.innerText = '';
    }
}

// validate number mark
function validateNumberMark(value) {
    //  /^(10(\.0)?|([0-9](\.\d+)?))$/
    let regex = /^(10(\.0{1,2})?|[0-9](\.[0-9]{1,2})?)$/;
    return regex.test(value);
}

function checkNumberMark(fieldName) {
    let value = document.getElementById(fieldName).value;
    let message = 'Vui lòng nhập đúng điểm số, không được viết quá 2 số thập phân';
    let errorElement = document.querySelector(`.error-${fieldName}`);

    if (!validateNumberMark(value)) {
        errorElement.innerText = message;
    } else {
        errorElement.innerText = '';
    }
}

// thêm data
let studentCount = 0;
function addData() {
    let inputs = document.querySelectorAll('input');
    let valueFullName = document.getElementById('full-name').value;

    // lấy value của ô input radio
    let genderInputs  = document.querySelectorAll('input[name="gender"]');
    let valueGender = '';
    genderInputs.forEach(function(input) {
        if (input.checked) {
            valueGender = input.value;
        }
    });

    let valueBirthday = document.getElementById('birthday').value;
    let valueClassroomBlock = document.getElementById('classroom-block').value;
    let valueClassroom = document.getElementById('classroom').value;
    let valueMarkMath = parseFloat(document.getElementById('mark-math').value);
    let valueMarkPhysical = parseFloat(document.getElementById('mark-physical').value);
    let valueMarkChemistry = parseFloat(document.getElementById('mark-chemistry').value);
    let average = (valueMarkMath + valueMarkPhysical + valueMarkChemistry) / 3;

    let studentData = {
        fullName: valueFullName,
        gender: valueGender,
        birthDay: valueBirthday,
        classroomBlock: valueClassroomBlock,
        classroom: valueClassroom,
        math: valueMarkMath,
        physical: valueMarkPhysical,
        chemistry: valueMarkChemistry,
        avg: average.toFixed(2)
    }
    studentCount++;
    addToTable(studentData, studentCount);

    inputs.forEach(function (input) {
        input.value = '';
    })

    if (!valueGender) {
        valueGender = '';
    }
}

function addToTable(studentData, studentCount) {
    let tableBodyElement = document.querySelector('.table tbody');
    const rowData = document.createElement('tr');
    rowData.innerHTML = `
        <td>${studentCount}</td>
        <td>${studentData.fullName}</td>
        <td>${studentData.gender}</td>
        <td>${studentData.birthDay}</td>
        <td>${studentData.classroomBlock}</td>
        <td>${studentData.classroom}</td>
        <td>${studentData.math}</td>
        <td>${studentData.physical}</td>
        <td>${studentData.chemistry}</td>
        <td>${studentData.avg}</td>
        <td class="action">
            <button type="button" class="btn btn-outline-warning">
                <i class="far fa-edit edit"></i>
            </button>
            <button type="button" class="btn btn-outline-danger">
                <i class="far fa-trash-alt delete"></i>
            </button>
        </td>
    `;
    tableBodyElement.appendChild(rowData);
}

let tableElement = document.querySelector('.table');
let buttonSubmit = document.querySelector('.button-submit');
tableElement.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete')) {
        // Lấy hàng cần xóa, e.target sẽ trả về giá element i, gọi 2 lần parent để tới thẻ tr (i -> td -> tr)
        let rowToDelete = e.target.parentElement.parentElement.parentElement;

        // Hiển thị hộp thoại confirm để xác nhận xóa
        let confirmation = confirm('Bạn có chắc muốn xóa Row thông tin này không?');

        // Nếu người dùng nhấn OK trong confirm, xóa hàng
        if (confirmation) {
            rowToDelete.remove();
        }
    } else if (e.target.classList.contains('edit')) {
        buttonSubmit.innerText = 'Cập nhật thông tin';
        buttonSubmit.classList.add('editor')
        // Lấy row hiện tại
        let row = e.target.closest('tr');

        // Lấy các ô td trong hàng (chỉ từ ô thứ 1 đến ô thứ 8)
        let cells = row.querySelectorAll('td:nth-child(-n+8)');
        let values = [];

        // Lặp qua các ô td trong hàng và lấy giá trị tương ứng
        cells.forEach((cell, index) => {
            // Lấy input hoặc select trong ô
            let input = cell.querySelector('form input, form select');
            if (input) {
                values.push(input.value);
            } else {
                values.push(cell.textContent);
            }
        });
        // Lấy input hoặc select trong ô
        // let input = cell.querySelector('form input[type="text"], form input[type="radio"]:checked, form select');
        // if (input) {
        //     if (input.type === 'radio') {
        //         // Nếu là input radio, lấy giá trị từ thuộc tính value
        //         values.push(input.value);
        //     } else {
        //         // Nếu là input text hoặc select, lấy giá trị từ thuộc tính value hoặc innerHTML
        //         values.push(input.value || input.innerHTML);
        //     }
        // } else {
        //     // Nếu không có input hoặc select, lấy giá trị text của cell
        //     values.push(cell.textContent);
        // }

        // Lấy các phần tử input và select trong form
        let inputElements = document.querySelectorAll('form input, form select');

        // Gán các giá trị từ hàng vào các input và select tương ứng
        inputElements.forEach((input, index) => {
            // Chú ý rằng chúng ta bắt đầu từ chỉ mục 0 vì các ô input/select trong form được đánh số từ 0
            input.value = values[index + 1];
        });
        e.target.parentElement.parentElement.parentElement.remove();
    }

    // Thêm sự kiện click cho nút Add/Update Item
    buttonSubmit.addEventListener("click", function () {
        if (buttonSubmit.classList.contains("editor")) {
            // Nếu nút có class "update", nghĩa là đang ở trạng thái Update
            buttonSubmit.innerText = "Lưu thông tin"; // Chuyển nút về trạng thái Add Item
            buttonSubmit.classList.remove("editor"); // Loại bỏ class "update"
        }
    });
});

// xử lý select chọn lớp học
// Ẩn tất cả các tùy chọn trong select của lớp học ban đầu
document.querySelectorAll('#classroom option').forEach(option => {
    option.style.display = 'none';
});

// Lắng nghe sự kiện change trên select của khối lớp học
document.getElementById('classroom-block').addEventListener('change', function() {
    // Lấy giá trị của select của khối lớp học
    let selectedBlock = this.value;

    // Lấy tất cả các option trong select của lớp học
    let classroomOptions = document.getElementById('classroom').querySelectorAll('option');

    // Ẩn tất cả các option trước khi hiển thị các option tương ứng
    classroomOptions.forEach(option => {
        option.style.display = 'none';
    });

    // Hiển thị các option tương ứng với khối lớp học đã chọn
    document.querySelectorAll('#classroom option[value^="' + selectedBlock + '"]').forEach(option => {
        option.style.display = 'block';
    });
});

// check chọn ngày nhỏ hơn ngày hiện tại
// Lấy ngày hiện tại
let currentDate = new Date().toISOString().split('T')[0];

// Đặt ngày hiện tại là ngày tối đa cho ô input date
document.getElementById('birthday').max = currentDate;