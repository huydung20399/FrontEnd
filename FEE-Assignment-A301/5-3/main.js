var users = [
    { id: 1, first_name: "Eamon", last_name: "Harhoff", email: "eharhoff0@imageshack.us", gender: "Male", age: 76, salary: 18888 },
    { id: 2, first_name: "Laney", last_name: "Whittam", email: "lwhittam1@issuu.com", gender: "Female", age: 22, salary: 15018 },
    { id: 3, first_name: "Lynett", last_name: "Twinberrow", email: "ltwinberrow2@gov.uk", gender: "Female", age: 99, salary: 13343 }
];

// Sử dụng hàm filter để lọc và hiển thị các user có gender là male và age dưới 40;
// function filterGenderIsMale(user) {
//     return user.gender === 'Male';
// }
//
// function filterAge(user) {
//     return user.age < 40;
// }
//
// console.log(users.filter(filterGenderIsMale));
// console.log(users.filter(filterAge));

// Sử dụng hàm reduce để tính trung bình chung độ tuổi của các user
function totalAge(temp, user) {
    return temp + user.age;
}

console.log(users.reduce(totalAge, 0));