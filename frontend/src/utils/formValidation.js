export const checkIfEmpty = (input, value) => {
  if (value === "") {
    input.classList.add("invalid");
  }
};

export const inputChange = (input, value) => {
  input.classList.remove("invalid");
};

export const checkInputsOnSubmit = (errors, callback) => {
  if (errors) {
    const inputs = document.querySelectorAll("input");
    const arrOfErrKeys = Object.keys(errors);

    inputs.forEach(input => {
      return arrOfErrKeys.forEach(errName => {
        if (input.name === errName) {
          input.classList.add("invalid");
        }
      });
    });
  } else if (errors === {}) {
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
      input.classList.remove("invalid");
    });
  }
};

export const validateEmail = email => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
