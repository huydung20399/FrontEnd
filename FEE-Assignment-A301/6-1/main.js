function validate(input) {
    const creditCardRegex = /^\d{16}$/;
    const numberRegex = /^\d+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlRegex = /^(http|https)?:\/\/[^\s/$.?#].[^\s]*$/;
    const alphaNumericRegex = /^[a-zA-Z0-9]+$/;

    if (creditCardRegex.test(input)) {
        return "Credit card number is valid.";
    } else if (numberRegex.test(input)) {
        return "Input is a valid number.";
    } else if (emailRegex.test(input)) {
        return "Input is a valid email.";
    } else if (urlRegex.test(input)) {
        return "Input is a valid URL.";
    } else if (alphaNumericRegex.test(input)) {
        return "Input contains only alphabet and numbers.";
    } else {
        return "Input does not match any validation criteria.";
    }
}

// Example usage:
console.log(validate("1234567890123456")); // Credit card number is valid.
console.log(validate("123456")); // Input is a valid number.
console.log(validate("example@example.com")); // Input is a valid email.
console.log(validate("http://www.w3schools.com/")); // Input is a valid URL.
console.log(validate("abc123")); // Input contains only alphabet and numbers.
console.log(validate("abc@123")); // Input does not match any validation criteria.
