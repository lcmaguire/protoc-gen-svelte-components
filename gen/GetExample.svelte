<script>
  // Goal is to have it work with https://google.aip.dev/131
  import { onMount } from "svelte";
  export let name;

  import {client} from "./client"

  let loading = true
  let res;
  
  // call via onMount
  onMount(async () => {
    return await getExample()
  })

  async function getExample() {
    res = await client.getExample({name: name}) // 
    loading = false
  }
 
  </script>

  <h3>GetExample</h3>
  {#if res != null}
  <p>{res.name}</p><p>{res.displayName}</p><p>{res.active}</p><p>{res.count}</p>
  {/if}
  
