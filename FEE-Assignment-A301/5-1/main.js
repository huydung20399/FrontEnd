let arrayInt = [5,3,2,8,7,6,4,1];

// Viết hàm hiển thị danh sách các giá trị chẵn trong mảng
// và tổng các giá trị chẵn trong mảng
// let sumEven = 0;
// for (let a of arrayInt) {
//     if (a % 2 === 0) {
//         console.log(a);
//         sumEven += a;
//     }
// }
// console.log('sumEven: ' + sumEven);

// Viết hàm hiển thị danh sách các giá trị lẽ trong mảng
// và tổng các giá trị lẽ trong mảng
// let sumOdd = 0;
// for (let a of arrayInt) {
//     if (a % 2 !== 0) {
//         console.log(a);
//         sumOdd += a;
//     }
// }
// console.log('sumOdd: ' + sumOdd);

// Viết hàm hiển thị danh sách các giá trị trong mảng ban đầu
// có giá trị nằm trong khoảng [a, b].
// Trong đó, a và b nhập vào từ bàn phím và a ≥ b.
// let a;
// do {
//     a = prompt('Nhap so a');
//     a = Number(a);
// } while (isNaN(a));
//
// let b;
// do {
//     b = prompt('Nhap so b');
//     b = Number(b);
// } while (isNaN(b) || !a >= b);
//
// for (let numberInRange of arrayInt) {
//     if (a >= numberInRange >= b) {
//         console.log(numberInRange);
//     }
// }

// Hàm sắp xếp mảng bằng thuật toán Selection sort
function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr;
}


// Hàm sắp xếp mảng bằng thuật toán Insertion sort
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    return arr;
}

console.log('Selection sort: ' + selectionSort(arrayInt));
console.log('Insertion sort: ' + insertionSort(arrayInt))