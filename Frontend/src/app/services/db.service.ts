import { Product } from '../models/product.model';
import { Cost } from './../models/cost.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class DbService {

  private httpClient = inject(HttpClient)
  private baseUrl = "http://localhost:3000/"

  constructor() { }

  getCost(){
    return this.httpClient.get<Cost>(`${this.baseUrl}cost/1`)
  }

  updateCost(data:Cost){
    return this.httpClient.put<Cost>(`${this.baseUrl}cost/1`, data)
  }

  getProductID(id:string){
    return this.httpClient.get<Product>(`${this.baseUrl}cars/${id}`)
  }

  getAllProduct(){
    return this.httpClient.get<Product[]>(`${this.baseUrl}cars`)
  }

  postProduct(data:Product){
    console.log(data)
    return this.httpClient.post<Product>(`${this.baseUrl}cars/`, data)
  }
  
  updateProduct(data:Product, id:string){
    return this.httpClient.put<Product>(`${this.baseUrl}cars/${id}`, data)
  }

  removeProduct(id:string){
    console.log("excluir")
    return this.httpClient.delete<Product>(`${this.baseUrl}cars/${id}`)
  }
  
}
