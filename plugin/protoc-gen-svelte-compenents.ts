#!/usr/bin/env -S npx tsx

import { createEcmaScriptPlugin, runNodeJs } from "@bufbuild/protoplugin";
import {
  literalString,
  makeJsDoc,
  localName,
  findCustomMessageOption,
} from "@bufbuild/protoplugin/ecmascript";
import { DescMessage, DescMethod, DescService, MethodKind, ScalarType } from "@bufbuild/protobuf";
import type { Schema } from "@bufbuild/protoplugin/ecmascript";

import { MyMethodDesc } from "../gen/example_pb" // This would need to be imported from a diff pkg do work in real world. TODO see how to publish pkgs to npm

const protocGengooEs = createEcmaScriptPlugin({
  name: "protoc-gen-goo-es",
  version: `v0.2.1`,
  generateTs,
});

// prettier-ignore
function generateTs(schema: Schema) {
  // for each file
  for (let i = 0; i < schema.files.length; i++) {
    let file = schema.files[i]
    for (let j = 0; j < file.services.length; j++) {
      let service = file.services[j]
      genClientFile(schema, service) // gens client for service.
      for (let k = 0; k < service.methods.length; k++) {
        let method = service.methods[k]

        let te = findCustomMessageOption(method, 50007, MyMethodDesc)

        // for each field -> gen view for Create, Get, List, Update and Delete
        // todo switch statement + have behaviour set via an annotation
        // have this be config driven

        if (method.name.startsWith("Get")) {
          genGet(schema, method)
        } else if (method.name.startsWith("List")) {
          genList(schema, method)
        } else if (method.name.startsWith("Delete")) {
          genDelete(schema, method)
        } else if (method.name.startsWith("Create")) {
          genCreate(schema, method)
        }

        if (te?.bar == "Get") {
          genGet(schema, method)
        } else if (te?.bar == "List") {
          genList(schema, method)
        } else if (te?.bar == "Delete") {
          genDelete(schema, method)
        } else if (te?.bar == "Create") {
          genCreate(schema, method)
        }
      }
    }
  }

  // will generate file with ts client
}

runNodeJs(protocGengooEs);

/*
  Get todos

  snake -> camel
  MethodName -> methodName 
  different fieldTypes show different things
*/
function genGet(schema: Schema, method: DescMethod) {
  let getResponse = method.output
  // for fields in response create view
  const f = schema.generateFile(`${method.name}.svelte`);

  // for fields in getResponse -> show

  let html = ""
  for (let i = 0; i < getResponse.fields.length; i++) {
    const currentField = getResponse.fields[i] // would probably need to recurse this in the event it is a message + do some nice stuff for alternate views.
    // will need to convert to camel case or go by index or some dumb shit or have it handled in proto
    // if user has set jsonName then use that, alt approach go from snake_case to camelCase or get the message generated by <service>_pb.ts
    let name = currentField.jsonName
    if (name == undefined) {
      name = currentField.name
    }

    name = snakeCaseToCamelCase(name)

    let out = `<p>{res.${name}}</p>`
    html += out
  }


  let methodName = method.name
  const svelteTplate = `<script>
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
    res = await client.${formatMethodName(methodName)}({name: name}) // todo pass in required fields
    loading = false
  }
  // todo probably handle this nicer
  </script>

  <h3>${methodName}</h3>
  {#if res != null}
  ${html}
  {/if}
  `

  // find out what f.preamble does
  f.print(svelteTplate)
}

// todo for this.
function genList(schema: Schema, method: DescMethod) {
  //let listResponse = method.output
  // for fields in response create view
  const f = schema.generateFile(`${method.name}.svelte`);


  let methodName = method.name

  const svelteTplate = `<script>
  // Goal is to have it work with https://google.aip.dev/132
  import { onMount } from "svelte";
  import {client} from "./client"

  let loading = true // todo use this
  let res;
  
  // call via onMount
  onMount(async () => {
    return await listExamples()
  })

  async function listExamples() {
    res = await client.${formatMethodName(methodName)}({}) // todo pass in required fields
    loading = false
  }
  // todo probably handle this nicer
  </script>

  <h3>${methodName}</h3>
  
  {#if res != null}
    {#each res.examples as item}
    <ul>
      <li>{item.name}</li>
    </ul>
    {/each}
  {/if}
  `
  /*
    should research svelte / js patterns for doing this thing nicely.
    could theoretically pass values of list in to a Get ui component.
  */
  f.print(svelteTplate)
}

function genDelete(schema: Schema, method: DescMethod) {
  // let getResponse = method.output
  // for fields in response create view
  const f = schema.generateFile(`${method.name}.svelte`);

  // for fields in getResponse -> show

  let methodName = method.name
  const svelteTplate = `<script>
  // Goal is to have it work with https://google.aip.dev/135
  import GetExample from './GetExample.svelte'; // todo get the import based upon message used.

  export let name;

  import {client} from "./client"

  let loading = true
  let res;

  async function deleteExample() {
    res = await client.${formatMethodName(methodName)}({name: name}) // todo pass in required fields
    loading = false
    // should probably refresh page
  }
  // todo probably handle this nicer
  </script>

  <h3>${methodName}</h3>
  <button on:click={deleteExample}>
	  Make Delete request
  </button>

  <GetExample name={name}/>
  
  `

  f.print(svelteTplate)
}

function genCreate(schema: Schema, method: DescMethod) {
  let getResponse = method.output
  // for fields in response create view
  const f = schema.generateFile(`${method.name}.svelte`);

  // for fields in getResponse -> show

  //let te = method.proto.options?.toJsonString()
  //let te = method.proto.options?.getType().
  //f.print(te)
  // https://github.com/bufbuild/protobuf-es/blob/main/docs/writing_plugins.md#message-options find message option 
  //const option = findCustomMessageOption(method, 50007, ServiceOptions)

  let te = findCustomMessageOption(method, 50007, MyMethodDesc)


  let html = ""
  html = htmlFromMessage(html, method.input)

  let methodName = method.name 
  const svelteTplate = `<script>
  // Goal is to have it work with https://google.aip.dev/133
  import {client} from "./client"

  let loading = true
  let res;

  // method desc ${te?.bar}

  let req = {};

  async function createExample() {
    // will need to build request to pass in.
    res = await client.${formatMethodName(methodName)}(req) // todo pass in required fields
    loading = false
    // should probably refresh page
  }
  // todo probably handle this nicer
  </script>


  <h3>${methodName}</h3>

  ${html}

  <button on:click={createExample}>
	  Make Create request
  </button>
  `

  f.print(svelteTplate)
}

function htmlFromMessage(input: string, mess : DescMessage) {
  for (let i = 0; i < mess.fields.length; i++) {
    const currentField = mess.fields[i] // would probably need to recurse this in the event it is a message + do some nice stuff for alternate views.
    let name = currentField.jsonName
    if (name == undefined) {
      name = currentField.name
    }
    //currentField.kind
    // todo conditional html template based upon type of field
    // func for return input type based upon field type.
    let out = `
    <label for="fname">${name}:</label> <br>
    `
    if (currentField.scalar == ScalarType.BOOL ){
      // if bool do x
      out += `<input type=checkbox  bind:checked={req.${name}}>`
    }
    if (currentField.scalar == ScalarType.STRING ){
      out += `<input bind:value={req.${name}} >`
    }
    // for now just do 1 for all numeric types
    if (currentField.scalar == ScalarType.INT32 || currentField.scalar == ScalarType.INT64 ){
      out += `<input type=number bind:value={req.${name}} >` // may have to use value https://svelte.dev/tutorial/numeric-inputs
    }

    if (currentField.scalar == ScalarType.UINT32 || currentField.scalar == ScalarType.UINT64 ){
      out += `<input type=number bind:value={req.${name}} min=0>` // may have to use value https://svelte.dev/tutorial/numeric-inputs
    }
    // TODO select / drop down for enum
    // problem will be with nested fields not containing Req. as bind val ( i guess field name passed in could help with this.)
    input += out + "<br>"
    
    // https://svelte.dev/tutorial/text-inputs consider
  }
  return input
}

// import from generated code https://github.com/bufbuild/protobuf-es/blob/main/docs/writing_plugins.md#importing-from-protoc-gen-es-generated-code
function genClientFile(schema: Schema, service: DescService) {
  let serviceName = service.name
  let tplate = `
  import {
    createConnectTransport,
    createPromiseClient,
  } from "@bufbuild/connect-web";
  import {${serviceName}} from "./example_connectweb" // todo have this be done based upon out path + serviceName

const transport = createConnectTransport({
    baseUrl: "http://localhost:8080", // this should be set via config 
  })
const client = createPromiseClient(${serviceName}, transport)
  
export {client}
`

  const f = schema.generateFile(`client.ts`); // todo make it specific to service name 

  f.import(service.methods[0].input)
  
  //f.import(service.name, "")
  f.print(tplate)
}


// TODO move below funcs to sep pkg / file
function snakeCaseToCamelCase(input: string) {
  // todo have early exit for this func
  for (let i = 0; i < input.length; i++) {
    let res = input.replace("_", "")
    if (res == input) {
      continue
    }
    let undrescoreIndex = input.indexOf("_")
    input = res
    input = input.substring(0, undrescoreIndex) + input.charAt(undrescoreIndex).toLocaleUpperCase() + input.substring(undrescoreIndex + 1)

  }
  return input
}

// sets methodNames first character to be lowerCase.
function formatMethodName(input: string) {
  let firstChar = input.charAt(0).toLocaleLowerCase()
  let out = firstChar + input.substring(1)
  return out
}