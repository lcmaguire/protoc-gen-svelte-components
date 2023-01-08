<script>
  // Goal is to have it work with https://google.aip.dev/133
  import {client} from "./client"

  let loading = true
  let res;

  // method desc Create

  let req = {};

  async function createExample() {
    // will need to build request to pass in.
    res = await client.createExample(req) // todo pass in required fields
    loading = false
    // should probably refresh page
  }
  // todo probably handle this nicer
  </script>


  <h3>CreateExample</h3>

  
    <label for="fname">name:</label> <br>
    <input bind:value={req.name} ><br>
    <label for="fname">displayName:</label> <br>
    <input bind:value={req.displayName} ><br>
    <label for="fname">active:</label> <br>
    <input type=checkbox  bind:checked={req.active}><br>
    <label for="fname">count:</label> <br>
    <input type=number bind:value={req.count} ><br>

  <button on:click={createExample}>
	  Make Create request
  </button>
  
