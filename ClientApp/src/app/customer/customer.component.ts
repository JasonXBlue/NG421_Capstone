import { Component, OnInit } from "@angular/core";
import { Icustomer } from "../interfaces/icustomer";
import { CustomerService } from "../services/customer.service";
import { Directive } from "@angular/core";
import { Validator, AbstractControl, NG_VALIDATORS } from "@angular/forms";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"],
})
export class CustomerComponent implements OnInit {
  customer: Icustomer = {
    id: 0,
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

  async delete(customer) {
    await this.service.deleteCustomer(customer.id);
    this.customers = this.customers.filter((c) => c.id !== customer.id);
  }

  // ************************************************

  submitted = false;

  genders = ["m", "f"];

  onSubmit() {
    this.submitted = true;
  }

  showFormControls(form: any) {
    return (
      form &&
      form.controls["customer.firstName"] &&
      form.controls["customer.firstName"].value
    );
  }

  ValidatePhone(control: AbstractControl): { [key: string]: any } | null {
    if (control.value && control.value.length != 10) {
      return { phoneNumberInvalid: true };
    }
    return null;
  }
}
