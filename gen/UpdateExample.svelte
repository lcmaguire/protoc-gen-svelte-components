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
      return await getExample() // TODO maybe this should be handled outside of this func (msg passed in.)
  })

  // todo have this func be imported
  async function getExample() {
      msg = await client.getExample({name: name}) // todo pass in required fields
      loading = false
  }

  async function updateExample() {
    // will need to build request to pass in.
    // let updateRequest = {} // todo have this be message + fieldMask for updateRequst.
    msg = await client.updateExample(msg) // todo pass in required fields
    loading = false
    // should probably refresh page
  }
  // todo probably handle this nicer
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
  
