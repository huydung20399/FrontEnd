function inputInfor() {
    const person = {};
    person.fullName = prompt('Nhap ho va ten');

    let dobString = prompt('Nhap ngay sinh(dd-MM-yyyy)');
    person.dob = new Date(dobString);

    person.gender = prompt('Nhap gioi tinh');
    return person;
}

// ham tinh tuoi user
function calculateAge(birthday) {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// ham hien thi thong tin nguoi dung
function displayUser(person) {
    console.log('Ho ten: ' + person.fullName);
    console.log('Ngay sinh: ' + person.dob.toDateString());
    console.log('Gioi tinh: ' + person.gender)
    console.log('So tuoi: ' + calculateAge(person.dob))
}

displayUser(inputInfor());