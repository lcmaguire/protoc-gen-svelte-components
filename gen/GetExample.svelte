<script>
  // Goal is to have it work with https://google.aip.dev/131

  // todo consider doing this via protogen import
  import { onMount } from "svelte";
  
  import {
    createConnectTransport,
    createPromiseClient,
  } from "@bufbuild/connect-web";


  export let name;

  import {client} from "./client"

  let loading = true
  let res;
  
  // call via onMount
  onMount(async () => {
    return await getExample()
  })

  async function getExample() {
    res = await client.getExample({name: name}) // todo pass in required fields
    loading = false
  }
  // todo probably handle this nicer
  </script>

  <h3>getExample</h3>
  {#if res != null}
  <p>{res.name}</p><p>{res.display_name}</p>
  {/if}
  
