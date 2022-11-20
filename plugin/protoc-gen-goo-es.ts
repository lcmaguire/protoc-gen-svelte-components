#!/usr/bin/env -S npx tsx

import { createEcmaScriptPlugin, runNodeJs } from "@bufbuild/protoplugin";
import {
  literalString,
  makeJsDoc,
  localName,
} from "@bufbuild/protoplugin/ecmascript";
import type { DescMethod, MethodKind } from "@bufbuild/protobuf";
import type { Schema } from "@bufbuild/protoplugin/ecmascript";

const protocGengooEs = createEcmaScriptPlugin({
  name: "protoc-gen-goo-es",
  version: `v0.2.1`,
  generateTs,
});

// prettier-ignore
function generateTs(schema: Schema) { 
  //const f = schema.generateFile("test_name" + ".ts");
  //f.print("// ESTAMOS AQUI")
  // for each file
  for (let i = 0; i < schema.files.length; i++) {
    //f.print("// file")
    let file = schema.files[i]
    // for each service in a file
    for (let j = 0; j < file.services.length; j++) {
      // for each method in a service
      let service = file.services[j]
      //f.print("// service " + service.name)
      for (let k = 0; k < service.methods.length; k++) {
        let method = service.methods[k]
        //f.print("// method " + method.name)
        // for each field -> gen view for Create, Get, List, Update and Delete
        if (method.name.includes("Get")){
          genGet(schema, method)
        }
      }
    }
  }
}

runNodeJs(protocGengooEs);


function genGet(schema: Schema, method : DescMethod){
  let getResponse = method.output
  // for fields in response create view
  const f = schema.generateFile(`${method.name}.svelte`);
  
  // for fields in getResponse -> show

  let html = ""
  for(let i = 0; i < getResponse.fields.length; i++){
    const currentField = getResponse.fields[i] // would probably need to recurse this in the event it is a message + do some nice stuff for alternate views.
    // will need to convert to camel case or go by index or some dumb shit or have it handled in proto
    // if user has set jsonName then use that, alt approach go from snake_case to camelCase or get the message generated by <service>_pb.ts
    let name = currentField.jsonName
    if (name == undefined) {
      name = currentField.name
    }

    let out = `<p>{res.${name}}</p>` 
    html += out
  }

  let ServiceName = "ExampleService" // todo dont hardcode this
  let methodName = "getExample" // todo get this from component
  const svelteTplate = `<script>
  // Goal is to have it work with https://google.aip.dev/131

  // todo consider doing this via protogen import
  import { onMount } from "svelte";
  
  import {
    createConnectTransport,
    createPromiseClient,
  } from "@bufbuild/connect-web";

  import {
    ${ServiceName}
  } from "../../gen/example_connectweb" // todo have the path determind by @ or from import (or just have a ts/js file imported to this script)
  
  export let name;

  // todo import stuff and add logic here
  // call code used by generated plugin
  // todo move client creation to seperate pkg and import it here.
  const transport = createConnectTransport({
    baseUrl: "http://localhost:8080", // this should be set via config 
  })
  const client = createPromiseClient(${ServiceName}, transport)
  
  let loading = true
  let res;
  
  // call via onMount
  onMount(async () => {
    return await getExample()
  })

  async function getExample() {
    res = await client.${methodName}({name: name}) // todo pass in required fields
    loading = false
  }
  // todo probably handle this nicer
  </script>
  
  {#if res != null}
  ${html}
  {/if}
  `

  // method.
  
  // find out what f.preamble does
  f.print(svelteTplate)
}
