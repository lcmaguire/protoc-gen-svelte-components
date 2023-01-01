
  import {
    createConnectTransport,
    createPromiseClient,
  } from "@bufbuild/connect-web";
  import {ExampleService} from "./example_connectweb" // todo have this be done based upon out path + serviceName

const transport = createConnectTransport({
    baseUrl: "http://localhost:8080", // this should be set via config 
  })
const client = createPromiseClient(ExampleService, transport)
  
export {client}

