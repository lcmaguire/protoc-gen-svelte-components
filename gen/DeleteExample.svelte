<script>
  // Goal is to have it work with https://google.aip.dev/135
  import GetExample from './GetExample.svelte'; 

  export let name;

  import {client} from "./client"

  let loading = true
  let res;

  async function deleteExample() {
    res = await client.deleteExample({name: name}) // 
    loading = false
    // should probably refresh page
  }
 
  </script>

  <h3>DeleteExample</h3>
  <button on:click={deleteExample}>
	  Make Delete request
  </button>

  <GetExample name={name}/>
  
  
