import { Component, OnInit } from "@angular/core";
import { Icustomer } from "../interfaces/icustomer";
import { CustomerService } from "../services/customer.service";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"],
})
export class CustomerComponent implements OnInit {
  customer: Icustomer = {
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
    email: "",
    stAddress: "",
    city: "",
    state: "",
    zip: 79423,
  };

  customers: Icustomer[] = [];

  constructor(private service: CustomerService) {}

  async ngOnInit() {
    this.customers = await this.service.getCustomers();
    console.log(this.customers);
  }

  async save() {
    const newCustomer = await this.service.addCustomer(this.customer);
    this.customers.push(newCustomer);
    console.log(newCustomer);
  }
}
