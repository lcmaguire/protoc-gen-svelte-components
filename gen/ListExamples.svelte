<script>
  // Goal is to have it work with https://google.aip.dev/132
  import { onMount } from "svelte";
  import {client} from "./client"

  let loading = true
  let res;
  
  // call via onMount
  onMount(async () => {
    return await listExamples()
  })

  async function listExamples() {
    res = await client.listExamples({}) 
    loading = false
  }
 
  </script>

  <h3>ListExamples</h3>
  
  {#if res != null}
    {#each res.examples as item}
    <ul>
      <li>{item.name}</li>
    </ul>
    {/each}
  {/if}
  
