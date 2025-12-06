import getEndpoint from "./getEndpoint.js";

 function getEndpointId (url) {

     const divided = url.split("/");

     if (typeof divided[divided.length - 1] === "number") {

         return divided[divided.length - 1];

     }

     return null;

 }

 export default getEndpointId;
