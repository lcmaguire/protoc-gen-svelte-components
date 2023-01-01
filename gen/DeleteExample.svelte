<script>
  // Goal is to have it work with https://google.aip.dev/135
  import GetExample from './GetExample.svelte'; // todo get the import based upon message used.

  export let name;

  import {client} from "./client"

  let loading = true
  let res;

  async function deleteExample() {
    res = await client.deleteExample({name: name}) // todo pass in required fields
    loading = false
    // should probably refresh page
  }
  // todo probably handle this nicer
  </script>

  <h3>DeleteExample</h3>
  <button on:click={deleteExample}>
	  Make Delete request
  </button>

  <GetExample name={name}/>
  
  
