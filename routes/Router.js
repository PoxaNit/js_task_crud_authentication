import response from "../helpers/response.js";
import urlWithNoId from "../helpers/urlWithNoId.js";
import getEndpointId from "../helpers/getEndpointId.js";

 class Router
{

    static async handle (uri, request_body) {

        const endpoint = urlWithNoId(uri);

        const uri_id = getEndpointId(uri);

        switch (endpoint) {

            case

        }

    }

}
