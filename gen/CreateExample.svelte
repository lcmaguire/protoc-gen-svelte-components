<script>
  // Goal is to have it work with https://google.aip.dev/133

  // todo consider doing this via protogen import
  import {
    createConnectTransport,
    createPromiseClient,
  } from "@bufbuild/connect-web";

  import {client} from "./client"

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
  
