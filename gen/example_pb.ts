// @generated by protoc-gen-es v0.2.1 with parameter "target=ts"
// @generated from file example.proto (package tutorial, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";

/**
 * @generated from message tutorial.Example
 */
export class Example extends Message<Example> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * @generated from field: string display_name = 2;
   */
  displayName = "";

  constructor(data?: PartialMessage<Example>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "tutorial.Example";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "display_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Example {
    return new Example().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Example {
    return new Example().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Example {
    return new Example().fromJsonString(jsonString, options);
  }

  static equals(a: Example | PlainMessage<Example> | undefined, b: Example | PlainMessage<Example> | undefined): boolean {
    return proto3.util.equals(Example, a, b);
  }
}

/**
 * @generated from message tutorial.GetExampleRequest
 */
export class GetExampleRequest extends Message<GetExampleRequest> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  constructor(data?: PartialMessage<GetExampleRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "tutorial.GetExampleRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetExampleRequest {
    return new GetExampleRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetExampleRequest {
    return new GetExampleRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetExampleRequest {
    return new GetExampleRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetExampleRequest | PlainMessage<GetExampleRequest> | undefined, b: GetExampleRequest | PlainMessage<GetExampleRequest> | undefined): boolean {
    return proto3.util.equals(GetExampleRequest, a, b);
  }
}

/**
 * @generated from message tutorial.DeleteExampleRequest
 */
export class DeleteExampleRequest extends Message<DeleteExampleRequest> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  constructor(data?: PartialMessage<DeleteExampleRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "tutorial.DeleteExampleRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteExampleRequest {
    return new DeleteExampleRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteExampleRequest {
    return new DeleteExampleRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteExampleRequest {
    return new DeleteExampleRequest().fromJsonString(jsonString, options);
  }

  static equals(a: DeleteExampleRequest | PlainMessage<DeleteExampleRequest> | undefined, b: DeleteExampleRequest | PlainMessage<DeleteExampleRequest> | undefined): boolean {
    return proto3.util.equals(DeleteExampleRequest, a, b);
  }
}

/**
 * @generated from message tutorial.ListExampleRequest
 */
export class ListExampleRequest extends Message<ListExampleRequest> {
  constructor(data?: PartialMessage<ListExampleRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "tutorial.ListExampleRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListExampleRequest {
    return new ListExampleRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListExampleRequest {
    return new ListExampleRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListExampleRequest {
    return new ListExampleRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ListExampleRequest | PlainMessage<ListExampleRequest> | undefined, b: ListExampleRequest | PlainMessage<ListExampleRequest> | undefined): boolean {
    return proto3.util.equals(ListExampleRequest, a, b);
  }
}

/**
 * @generated from message tutorial.ListExampleResponse
 */
export class ListExampleResponse extends Message<ListExampleResponse> {
  /**
   * @generated from field: repeated tutorial.Example examples = 1;
   */
  examples: Example[] = [];

  constructor(data?: PartialMessage<ListExampleResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "tutorial.ListExampleResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "examples", kind: "message", T: Example, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListExampleResponse {
    return new ListExampleResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListExampleResponse {
    return new ListExampleResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListExampleResponse {
    return new ListExampleResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ListExampleResponse | PlainMessage<ListExampleResponse> | undefined, b: ListExampleResponse | PlainMessage<ListExampleResponse> | undefined): boolean {
    return proto3.util.equals(ListExampleResponse, a, b);
  }
}

