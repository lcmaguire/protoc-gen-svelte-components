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


function genGet(schema: Schema, method:DescMethod){
  let getResponse = method.output

  // for fields in response create view
  const f = schema.generateFile(`${method.name}.svelte`);
  
  // for fields in getResponse -> show

  let html = ""
  for(let i = 0; i < getResponse.fields.length; i++){
    const currentField = getResponse.fields[i] // would probably need to recurse this in the event it is a message + do some nice stuff for alternate views.
    // would need currentField + 
    // this needs to be fieldName, maybe res.${fieldName}
    //currentField.name
    let out = `<p>{res.${currentField.name}}</p>` 
    html += out
  }

  let ServiceName = "ExampleService" // todo dont hardcode this
  let methodName = "getExample" // todo get this from component
  const svelteTplate = `<script>

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
  const client = createPromiseClient(${ServiceName}, transport)
  
  let loading = true
  let res;
  async function getExample() {
    res = await client.${methodName}({}) // todo pass in required fields
    loading = false
  }
  // todo probably handle this nicer
  </script>
  
  {#if res}
  ${html}
  {/if}
  `
  // find out what f.preamble does
  f.print(svelteTplate)
}

