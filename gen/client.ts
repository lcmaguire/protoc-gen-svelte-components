
  import {
    createConnectTransport,
    createPromiseClient,
  } from "@bufbuild/connect-web";
  import {ExampleService} from "./example_connectweb"

const transport = createConnectTransport({
    baseUrl: "http://localhost:8080", // this should be set via config 
  })
const client = createPromiseClient(ExampleService, transport)
  
export {client}
