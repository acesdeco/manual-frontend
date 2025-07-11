export const validateRegNumber = (text: string) => {
  const regNumber = text;
  const regex = /^[1][5-9]|[2][0-4]\/EG\/CO\/[0-9]{1,4}$/;

  if (regex.test(regNumber)) {
    return true;
  } else {
    return false;
  }
};

export const validateEmail = (text: string) => {
  const regex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (regex.test(text)) {
    return true;
  } else {
    return false;
  }
};

export const checkPasswordStrength = (password: string) => {
  // Define your password strength criteria
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  // Check the criteria
  if (
    password.length >= minLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber
  ) {
    return "strong";
  } else {
    return "weak";
  }
};
