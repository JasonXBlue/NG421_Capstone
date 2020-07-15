import { Component, OnInit } from "@angular/core";
import { CustomerComponent } from "../customer/customer.component";
import { AbstractControl } from "@angular/forms";
import { Icustomer } from "../interfaces/icustomer";
import { CustomerService } from "../services/customer.service";
import { MatDialog, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-customer-dialog",
  templateUrl: "./customer-dialog.component.html",
  styleUrls: ["./customer-dialog.component.css"],
})
export class CustomerDialogComponent {
  constructor(
    private service: CustomerService,
    private dialogRef: MatDialogRef<CustomerDialogComponent>
  ) {}

  submitted = false;

  genders = ["M", "F"];

  states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "DC",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  customer = {
    id: 0,
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
    email: "",
    stAddress: "",
    city: "",
    state: "",
    zip: "",
  };

  customers: Icustomer[] = [];

  async save() {
    const newCustomer = await this.service.addCustomer(this.customer);
    this.dialogRef.close(newCustomer);
  }

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

  ngOnInit() {}
}
