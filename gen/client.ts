
import {
  createConnectTransport,
  createPromiseClient,
} from "@bufbuild/connect-web";
import {ExampleService} from "./example_connectweb"

const transport = createConnectTransport({
  baseUrl: "http://localhost:8080", // TODO have this be an env var.
})
const client = createPromiseClient(ExampleService, transport)
  
export {client}

