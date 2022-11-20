<script>
  // Goal is to have it work with https://google.aip.dev/131

  // todo consider doing this via protogen import
  import {
    createConnectTransport,
    createPromiseClient,
  } from "@bufbuild/connect-web";

  import {
    ExampleService
  } from "../../gen/example_connectweb" // todo have the path determind by @ or from import (or just have a ts/js file imported to this script)
  
  import GetExample from './GetExample.svelte'; // todo get the import based upon message used.

  export let name;

  // todo import stuff and add logic here
  // call code used by generated plugin
  // todo move client creation to seperate pkg and import it here.
  const transport = createConnectTransport({
    baseUrl: "http://localhost:8080", // this should be set via config 
  })
  const client = createPromiseClient(ExampleService, transport)
  
  let loading = true
  let res;

  async function deleteExample() {
    res = await client.deleteExample({name: name}) // todo pass in required fields
    loading = false
    // should probably refresh page
  }
  // todo probably handle this nicer
  </script>

  <h3>deleteExample</h3>
  <button on:click={deleteExample}>
	  Make Delete request
  </button>

  <GetExample name={name}/>
  
  
