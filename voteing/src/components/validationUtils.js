// validationUtils.js

export const validateName = (name) => /^[A-Za-z\s]+$/.test(name);
export const isValidEmail = (email) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
export const isValidPhoneNumber = (phoneNumber) => /^[0-9]{10}$/.test(phoneNumber);
export const isValidPassword = (password) => password.length >= 6;

export const handleBlur = (name, value, errors, setErrors, password) => {
  let newErrors = { ...errors };

  switch (name) {
    case "userName":
      if (!value) {
        newErrors.userName = "Please enter your Name";
      } else if (!validateName(value)) {
        newErrors.userName = "Please enter a valid Name (characters only A to Z)";
      } else {
        delete newErrors.userName;
      }
      break;
    case "email":
      if (!value) {
        newErrors.email = "Please enter your Email";
      } else if (!isValidEmail(value)) {
        newErrors.email = "Please enter a valid email address";
      } else {
        delete newErrors.email;
      }
      break;
    case "phoneNumber":
      if (!value) {
        newErrors.phoneNumber = "Please enter your Phone Number";
      } else if (!isValidPhoneNumber(value)) {
        newErrors.phoneNumber = "Please enter a valid phone number";
      } else {
        delete newErrors.phoneNumber;
      }
      break;
    case "password":
      if (!value) {
        newErrors.password = "Please enter your Password";
      } else if (!isValidPassword(value)) {
        newErrors.password = "Password must be at least 6 characters long";
      } else {
        delete newErrors.password;
      }
      break;
    case "confirmPassword":
      if (!value) {
        newErrors.confirmPassword = "Please confirm your Password";
      } else if (value !== password) {
        newErrors.confirmPassword = "Passwords not matching";
      } else {
        delete newErrors.confirmPassword;
      }
      break;
    default:
      break;
  }

  setErrors(newErrors);
};
