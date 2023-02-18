<script>
  // Goal is to have it work with https://google.aip.dev/134
  import {client} from "./client"
  export let name;
  import { onMount } from "svelte";


  let loading = true
  let res;

  // method desc CreateineFoo

  let msg = {};

  onMount(async () => {
      return await getExample() 
  })

  // todo have this func be imported
  async function getExample() {
      msg = await client.getExample({name: name}) // 
      loading = false
  }

  async function updateExample() {
    // let updateRequest = {} // todo have this be message + fieldMask for updateRequst.
    msg = await client.updateExample(msg) // 
    loading = false
  }
 
  </script>



  <h3>UpdateExample</h3>

  
    <label for="fname">name:</label> <br>
    <input bind:value={msg.name} ><br>
    <label for="fname">displayName:</label> <br>
    <input bind:value={msg.displayName} ><br>
    <label for="fname">active:</label> <br>
    <input type=checkbox  bind:checked={msg.active}><br>
    <label for="fname">count:</label> <br>
    <input type=number bind:value={msg.count} ><br>

  <button on:click={updateExample}>
	  Make Update request
  </button>
  
