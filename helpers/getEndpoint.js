
 function getEndpoint (url) {

     const regex = /\/[a-z]+\/[1-9]*/;

     return url.match(regex)[0];

 }

 export default getEndpoint;
