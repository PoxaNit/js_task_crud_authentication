
 function validateEmail (email) {

     const regex = /[a-zA-Z][a-zA-Z0-9]+\.[a-z]+\.com/;

     return regex.test(email);

 }

 export default validateEmail;
