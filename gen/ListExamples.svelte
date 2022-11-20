<script>
  // Goal is to have it work with https://google.aip.dev/132

  // todo consider doing this via protogen import
  import { onMount } from "svelte";
  
  import {
    createConnectTransport,
    createPromiseClient,
  } from "@bufbuild/connect-web";

  import {
    ExampleService
  } from "../../gen/example_connectweb" // todo have the path determind by @ or from import (or just have a ts/js file imported to this script)
  
  // todo import stuff and add logic here
  // call code used by generated plugin
  // todo move client creation to seperate pkg and import it here.
  const transport = createConnectTransport({
    baseUrl: "http://localhost:8080", // this should be set via config 
  })
  const client = createPromiseClient(ExampleService, transport)
  
  let loading = true // todo use this
  let res;
  
  // call via onMount
  onMount(async () => {
    return await listExamples()
  })

  async function listExamples() {
    res = await client.listExamples({}) // todo pass in required fields
    loading = false
  }
  // todo probably handle this nicer
  </script>

  <h3>listExamples</h3>
  
  {#if res != null}
    {#each res.examples as item}
    <ul>
      <li>{item.name}</li>
    </ul>
    {/each}
  {/if}
  
