// @generated by protoc-gen-connect-web v0.8.6
// @generated from file proto/example.proto (package tutorial, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { DeleteExampleRequest, Example, GetExampleRequest, ListExampleRequest, ListExampleResponse } from "./example_pb.js";
import { Empty, MethodKind } from "@bufbuild/protobuf";

/**
 * todo make AIP approved
 *
 * @generated from service tutorial.ExampleService
 */
export declare const ExampleService: {
  readonly typeName: "tutorial.ExampleService",
  readonly methods: {
    /**
     * @generated from rpc tutorial.ExampleService.CreateExample
     */
    readonly createExample: {
      readonly name: "CreateExample",
      readonly I: typeof Example,
      readonly O: typeof Example,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc tutorial.ExampleService.GetExample
     */
    readonly getExample: {
      readonly name: "GetExample",
      readonly I: typeof GetExampleRequest,
      readonly O: typeof Example,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc tutorial.ExampleService.ListExamples
     */
    readonly listExamples: {
      readonly name: "ListExamples",
      readonly I: typeof ListExampleRequest,
      readonly O: typeof ListExampleResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc tutorial.ExampleService.UpdateExample
     */
    readonly updateExample: {
      readonly name: "UpdateExample",
      readonly I: typeof Example,
      readonly O: typeof Example,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc tutorial.ExampleService.DeleteExample
     */
    readonly deleteExample: {
      readonly name: "DeleteExample",
      readonly I: typeof DeleteExampleRequest,
      readonly O: typeof Empty,
      readonly kind: MethodKind.Unary,
    },
  }
};

