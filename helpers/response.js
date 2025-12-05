
// just to standardize the response
 function response (obj) {

     const {
       message,
       success,
       data,
       code
     } = response;

     return {
       message: message,
       success: success,
       data: data,
       code: code
     }

 }

 export default response;
