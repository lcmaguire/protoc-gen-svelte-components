<script>
  // Goal is to have it work with https://google.aip.dev/133

  // todo consider doing this via protogen import
  import {
    createConnectTransport,
    createPromiseClient,
  } from "@bufbuild/connect-web";

  import {
    ExampleService
  } from "../../gen/example_connectweb" // todo have the path determind by @ or from import (or just have a ts/js file imported to this script)
  
  // todo import stuff and add logic here
  // call code used by generated plugin
  // todo move client creation to seperate pkg and import it here.
  const transport = createConnectTransport({
    baseUrl: "http://localhost:8080", // this should be set via config 
  })
  const client = createPromiseClient(ExampleService, transport)
  
  let loading = true
  let res;

  // Create

  let req = {};

  async function createExample() {
    // will need to build request to pass in.
    res = await client.createExample(req) // todo pass in required fields
    loading = false
    // should probably refresh page
  }
  // todo probably handle this nicer
  </script>


  <h3>createExample</h3>

  
    <label for="fname">name:</label><br>
    <input bind:value={req.name} ><br>
    
    <label for="fname">display_name:</label><br>
    <input bind:value={req.display_name} ><br>
    

  <button on:click={createExample}>
	  Make Create request
  </button>
  
