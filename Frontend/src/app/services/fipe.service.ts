import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FipeData } from '../models/fipeData.model';
import { FipeModelData } from '../models/fipeModelData.model';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class FipeService {

  private baseUrl = "https://parallelum.com.br/fipe/api/v1/"
  private httpClient = inject(HttpClient)

  constructor() { }

  getBrand(vehicles:string){
    return this.httpClient.get<FipeData[]>(this.baseUrl + vehicles + "/marcas")
  }

  getModels(vehicles:string, idBrand:string){
    return this.httpClient.get<FipeModelData>(this.baseUrl + vehicles + "/marcas/" + idBrand + "/modelos")
  }

  getYears(vehicles:string, idBrand:string, idModels:string ){
    return this.httpClient.get<FipeData[]>(this.baseUrl + vehicles + "/marcas/" + idBrand + "/modelos/" + idModels + "/anos")
  }

  getCar(vehicles:string, idBrand:string, idModels:string, idYear:string){
    return this.httpClient.get<Car>(this.baseUrl + vehicles + "/marcas/" + idBrand + "/modelos/" + idModels + "/anos/" + idYear)
  }


}
