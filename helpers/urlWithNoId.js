import getEndpoint from "./getEndpoint.js";

 function urlWithNoId (url) {

     const endpoint = getEndpoint(url);

     const divided = endpoint.split("/");

     if (typeof divided[divided.length - 1] === "number") {

         return `/${divided[0]}`;

     }

     return endpoint;

 }

 export default urlWithNoId;
