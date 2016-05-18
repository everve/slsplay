All json schemas must:

1> have a child data property for the actual payload ( either single item , or array).
2> have a root apiVersion property for versioning the schemas in the future.
3> have a data level version for ability to do optimistic updating at the DB level.
    -meaning use the conditional update where v must = v-1.

For now we have decided NOT to use the schemas to enforce or describe all validations.
Schema validations are not rich enough so we will even REPEAT all validations in code.
But it is at least a first pass to prevent garbage in, and also to allow us to sanely do
version to version migrations over time.
