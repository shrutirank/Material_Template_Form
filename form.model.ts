export class Student{
    id!:number
    name!:string
    gender!:string
    hobbie!:string
    cars!:string
    add!:string
    date!:string
    // subject!:string
    // marks!:number
   subAry=new Array<Subject>();
 
}
export class Subject{
    subject!:string
    marks!:string
}