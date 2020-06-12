import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Icustomer } from "../interfaces/icustomer";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  constructor(
    private httpClient: HttpClient,
    @Inject("BASE_URL") private baseUrl: string
  ) {}

  async getCustomers() {
    return this.httpClient
      .get<Icustomer[]>(this.baseUrl + "customer")
      .toPromise();
  }

  async addCustomer(customer: Icustomer) {
    return await this.httpClient
      .post<Icustomer>(this.baseUrl + "customer", customer)
      .toPromise();
  }
}
