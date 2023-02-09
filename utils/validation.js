export default function login_validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  // validation for password
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Must be greater then 8 and less then 20 characters long";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  return errors;
}

export function registerValidate(values) {
  const errors = {};

  if (!values.userName) {
    errors.userName = "Required";
  }

  //email
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  // validation for password
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Must be greater then 8 and less then 20 characters long";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  // validate confirm password
  //   if (!values.cpassword) {
  //     errors.cpassword = "Required";
  //   } else if (values.password !== values.cpassword) {
  //     errors.cpassword = "Password Not Match...!";
  //   } else if (values.cpassword.includes(" ")) {
  //     errors.cpassword = "Invalid Confirm Password";
  //   }

  return errors;
}

export function carDetailValidation(values) {
  const errors = {};

  if (!values.registerYear) {
    errors.registerYear = "Required";
  }

  if (!values.carBrand) {
    errors.carBrand = "Required";
  }

  if (!values.carModel) {
    errors.carModel = "Required";
  }

  if (!values.carFuelType) {
    errors.carFuelType = "Required";
  }

  if (!values.kilometerDriven) {
    errors.kilometerDriven = "Required";
  }

  return errors;
}

//contact US -------------------------
export function contactUsValidation(values) {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.subject) {
    errors.subject = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  }

  if (!values.message) {
    errors.message = "Required";
  }

  return errors;
}
