const validateEmail = email => {
  let emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info)\b/;
  return emailRegex.test(email);
};

const isEmpty = string => {
  if (string.trim() == "") return true;
  else return false;
};

exports.emailValidation = email => {
  let errors = {};
  if (isEmpty(email)) {
    errors.email = "Email Must not be empty";
  } else if (!validateEmail(email)) {
    errors.email = "Invalid email please try again";
  }
  return errors["email"] !== undefined ? errors : true;
};
