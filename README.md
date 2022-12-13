# protoc-gen-svelte-components

Will generate svelte components based upon a proto schema.

Currently works based upon RPC method prefix for endpoints that follow AIP's to a certain extent. 

at time of writing supports the following.

|                     | connect-go RPC |
|---------------------|---------|
| create     |    :white_check_mark:       | 
| list      |   :white_check_mark:        |
| get |    :white_check_mark:     |
| delete |    :white_check_mark:     |


for generating a go gRPC server based upon proto see [protoc-gen-go-goo](https://github.com/lcmaguire/protoc-gen-go-goo)
