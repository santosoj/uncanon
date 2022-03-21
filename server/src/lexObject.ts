type Any = Term | Object | Array
type Term = string | number | boolean
type Object = {[x: PropertyKey]: Any}
type Array = Any[]

function lexObject(t: Term): Term
function lexObject(o: Object): Object
function lexObject(a: Array): Array
function lexObject(x: Any): Any
function lexObject(x: Any): Any {
  if (typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean') {
    return x
  }
  if (Array.isArray(x)) {
    return x.map(lexObject)
  }
  return Object.fromEntries(
    Object.entries(x)
    .map(([k, v]) => [k, lexObject(v)])
    .sort()
  )
}

export default lexObject
