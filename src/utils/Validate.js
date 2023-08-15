function Validate(name, value, errors) {
  switch (name) {
    case 'username':
      let usernameError =
        value.length < 7 ? 'Username should be at-least 6 characters long' : '';
      errors.username = usernameError;
      break;
    case 'email':
      let emailError =
        value.indexOf('@') === -1 ? 'Email should contain @' : '';
      errors.email = emailError;
      break;
    case 'password':
      let passwordError;
      if (value.length < 7) {
        passwordError = 'Password should be at-least 6 characters';
      }
      let re = /^(?=.*\d)(?=.*[a-z])/;
      if (!re.test(value)) {
        passwordError = 'Password must contain a letter and a number';
      }
      errors.password = passwordError;
      break;
      // case 'title':
      //   let titleError;
      //   if(value.length <= 0){
      //     titleError = 'title can not blank';
      //   }
      //   errors.title = titleError
      //   break;
    default:
      return errors;
  }
}

// function notEmpty(value, name) {
//   if (value.length <= 0) {
//     return `${name} should not be empty`;
//   }
//   return "";
// }

export default Validate;