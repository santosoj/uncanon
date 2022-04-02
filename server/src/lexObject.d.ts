declare type Any = Term | Object | Array
declare type Term = string | number | boolean
declare type Object = {
  [x: PropertyKey]: Any
}
declare type Array = Any[]
declare function lexObject(t: Term): Term
declare function lexObject(o: Object): Object
declare function lexObject(a: Array): Array
declare function lexObject(x: Any): Any
export default lexObject
