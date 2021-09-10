const validateEmail = email => {
  let emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info)\b/;
  return emailRegex.test(email);
};

const isEmpty = string => {
  if (string.trim() === "") return true;
  else return false;
};

exports.validateEmail = email => {
  let errors = {};
  if (isEmpty(email)) {
    errors.email = "Must not be empty";
  } else if (!validateEmail(email)) {
    errors.email = "Invalid email";
  }
  return Object.keys(email).length != 0 ? errors : true;
};
