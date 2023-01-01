<script>
  // Goal is to have it work with https://google.aip.dev/133
  import {client} from "./client"

  let loading = true
  let res;

  // todo this should probably be the type of CreateRequest 
  let req = {};

  async function createExample() {
    // will need to build request to pass in.
    res = await client.createExample(req) // todo pass in required fields
    loading = false
    // todo refresh page / load result
  }
  </script>


  <h3>createExample</h3>

  
    <label for="fname">name:</label><br>
    <input bind:value={req.name} ><br>
    
    <label for="fname">display_name:</label><br>
    <input bind:value={req.display_name} ><br>
    

  <button on:click={createExample}>
	  Make Create request
  </button>
  
