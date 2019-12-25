export interface RequestModel<T>{
    count:number,
    next:string,
    previous:number,
    results:T[]
}