import {
    createConnectTransport,
    createPromiseClient,
  } from "@bufbuild/connect-web";

  import {
    ExampleService
  } from "./example_connectweb" // todo have the path determind by @ or from import (or just have a ts/js file imported to this script)
  

const transport = createConnectTransport({
    baseUrl: "http://localhost:8080", // this should be set via config 
  })
const client = createPromiseClient(ExampleService, transport)
  
export {client}