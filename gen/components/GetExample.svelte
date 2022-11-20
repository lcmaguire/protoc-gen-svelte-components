<script>

  // todo consider doing this via protogen import
  import {
    createConnectTransport,
    createPromiseClient,
  } from "@bufbuild/connect-web";
  
  // todo import stuff and add logic here
  // call code used by generated plugin

  const transport = createConnectTransport({
    baseUrl: "http://localhost:8080", // this should be set via config 
  })
  const client = createPromiseClient(ExampleService, transport)
  
  let loading = true
  let res;
  async function getExample() {
    res = await client.getExample({}) // todo pass in required fields
    loading = false
  }
  // todo probably handle this nicer
  </script>
  
  {#if res}
  <p>{res.name}</p><p>{res.display_name}</p>
  {/if}
  
