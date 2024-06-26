export interface Product{
    id?:string,
    vehiclesType:string,
    brand:{
      id:string,
      name:string  
    },
    model:{
        id:string,
        name:string
    },
    year:{
        id:string,
        name:string
    },
    buyValor:number,
    buyDate:string,
    sellValor:number,
    sellDate:string,
    plate:string,
    renavam:string,
    status:string,
    seller:{
        name:string,
        cpf:string
    },
    buyer:{
        name:string,
        cpf:string
    }
}