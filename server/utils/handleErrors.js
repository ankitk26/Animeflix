module.exports.handleLoginErrors = (email, password) => {
  const errors = {};
  if (email.trim() === "") {
    errors.email = "Email is required";
  }
  if (password.trim() === "") {
    errors.password = "Password is required";
  }

  return { errors, valid: Object.keys(errors).length < 1 };
};

module.exports.handleRegisterErrors = (
  email,
  name,
  password,
  confirmPassword
) => {
  const errors = {};
  if (email.trim() === "") {
    errors.email = "Email is required";
  } else {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegexp.test(email)) {
      errors.email = "Email is invalid";
    }
  }

  if (name.trim() === "") {
    errors.name = "Name is required";
  }

  if (password.trim() === "") {
    errors.password = "Password is required";
  } else if (password.trim() !== confirmPassword.trim()) {
    errors.password = "Passwords don't match";
  } else if (password.trim().length < 6) {
    errors.password = "Password should be atleast 6 characters long";
  }

  return { errors, valid: Object.keys(errors).length < 1 };
};
