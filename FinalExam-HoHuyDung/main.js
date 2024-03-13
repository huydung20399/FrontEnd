let tableDSElemnt = document.querySelector('.danh-sach-san-pham');
let rowElement = document.querySelectorAll('tbody tr');
tableDSElemnt.addEventListener('click', function (e) {
    // lấy ra hàng vừa nhấn vào edit
    let rowDataToEdit = e.target.parentElement.parentElement.parentElement;
    if (e.target.classList.contains('edit')) {
        let tdMSPElement = rowDataToEdit.querySelector('.ds-ma-san-pham');
        let tdTSPElement = rowDataToEdit.querySelector('.ds-ten-san-pham');
        let tdDMSPElement = rowDataToEdit.querySelector('.ds-danh-muc-san-pham');
        let tdText = tdMSPElement.textContent;

        // lấy các element của các ô input cần gán giá trị
        let inputMaSP = document.getElementById('ma-san-pham');
        let inputTenSP = document.getElementById('ten-san-pham');
        let inputDanhMucSP = document.getElementById('danh-muc-san-pham');

        // gán các giá trị vào ô input
        inputMaSP.value = tdMSPElement.textContent;
        inputTenSP.value = tdTSPElement.textContent;
        inputDanhMucSP.value = tdDMSPElement.textContent;

        document.getElementById('button-xuat-kho').disabled = false;
    }
})

// validate đơn giá
function validateNumber(value) {
    let regex = /^\d*\.?\d+$/;
    return regex.test(value);
}

function checkValidateNumber(fieldName) {
    let value = document.getElementById(fieldName).value;
    let message = 'Đơn giá phải lớn hơn 0';
    let errorElement = document.querySelector(`.error-${fieldName}`);

    if (!validateNumber(value)) {
        errorElement.innerText = message;
        return false;
    } else {
        errorElement.innerText = '';
        return true;
    }
}

// validate cho số lượng xuất kho
function checkInputSoLuongXuatKho(fieldName) {
    let value = document.getElementById(fieldName).value;
    let message = 'Số lượng xuất kho phải lớn hơn 0 và nhỏ hơn số lượng còn lại';
    let errorElement = document.querySelector(`.error-${fieldName}`);
    let tdSoLuongCon = document.querySelector('.ds-so-luong-con');
    let valueSoLuong = parseInt(tdSoLuongCon.textContent);

    if (!validateNumber(value)) {
        errorElement.innerText = message;
        return false;
    } else if (value > valueSoLuong) {
        errorElement.innerText = message;
        return false;
    } else {
        errorElement.innerText = '';
        return true;
    }

}

document.getElementById('so-luong-xuat-kho').addEventListener('blur', function () {
    checkInputSoLuongXuatKho('so-luong-xuat-kho');
})


// xét ngày tối đa là ngày hiện tại
let currentDate = new Date().toISOString().split('T')[0];

// Đặt ngày hiện tại là ngày tối đa cho ô input date
document.getElementById('ngay-xuat-kho').max = currentDate;

// add data
function send() {
    if (validate()) {
        addData();
    } else {
        alert('Vui long nhap lai')
    }
}

function validate() {
    let isValid = true;
    if (!checkValidateNumber('don-gia')) {
        isValid = false;
    }
    if (!checkInputSoLuongXuatKho('so-luong-xuat-kho')) {
        isValid = false;
    }

    return isValid;
}

let numerical = 0;
function addData() {
    let inputs = document.querySelectorAll('input');

    let valueMaSP = document.getElementById('ma-san-pham').value;
    let valueTenSP = document.getElementById('ten-san-pham').value;
    let valueDMSP = document.getElementById('danh-muc-san-pham').value;
    let valueSLXK = document.getElementById('so-luong-xuat-kho').value;
    let valueDonGia = parseFloat(document.getElementById('don-gia').value);
    let valueNgayXuat = document.getElementById('ngay-xuat-kho').value;
    let valueThanhTien = valueSLXK * valueDonGia;

    let dataSanPham = {
        maSP: valueMaSP,
        tenSP: valueTenSP,
        danhMucSP: valueDMSP,
        soLuongXK: valueSLXK,
        donGia: valueDonGia,
        ngayXuatKho: valueNgayXuat,
        thanhTien: valueThanhTien
    };
    numerical++;
    addIntoTable(dataSanPham, numerical);

    inputs.forEach(function (input) {
        input.value = '';
    })
}

let tongSoLuong = 0;
let tongSoTien = 0;
function addIntoTable(dataSanPham, numerical) {
    let tableTbodyElement = document.querySelector('.danh-sach-xuat-kho tbody');
    let rowData = document.createElement('tr');
    rowData.innerHTML = `
        <td>${numerical}</td>
        <td>${dataSanPham.maSP}</td>
        <td>${dataSanPham.tenSP}</td>
        <td>${dataSanPham.danhMucSP}</td>
        <td>${dataSanPham.soLuongXK}</td>
        <td>${dataSanPham.donGia}</td>
        <td>${dataSanPham.ngayXuatKho}</td>
        <td>${dataSanPham.thanhTien}</td>
        <td class="action">
            <i class="fas fa-times delete"></i>
        </td>
    `;
    tableTbodyElement.appendChild(rowData);

    // cập nhật
    tongSoLuong += parseInt(dataSanPham.soLuongXK);
    document.getElementById('tong-so-luong-xuat-kho').textContent = tongSoLuong;

    tongSoTien += dataSanPham.thanhTien;
    document.getElementById('tong-thanh-tien').textContent = tongSoTien;

    let tdSoLuongCon = document.querySelector('.ds-so-luong-con');
    let valueSoLuong = parseInt(tdSoLuongCon.textContent);
    valueSoLuong -= parseInt(dataSanPham.soLuongXK);
    // tdSoLuongCon.textContent = valueSoLuong;
}

let tableDSXKElement = document.querySelector('.danh-sach-xuat-kho');
tableDSXKElement.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete')) {
        // Lấy hàng cần xóa, e.target sẽ trả về giá element i, gọi 2 lần parent để tới thẻ tr (i -> td -> tr)
        let rowToDelete = e.target.parentElement.parentElement;

        // Hiển thị hộp thoại confirm để xác nhận xóa
        let confirmation = confirm('Bạn có chắc muốn xóa Row này không?');

        // Nếu người dùng nhấn OK trong confirm, xóa hàng
        if (confirmation) {
            rowToDelete.remove();
        }
    }
})