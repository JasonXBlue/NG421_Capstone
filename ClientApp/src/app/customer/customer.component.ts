import { Component, OnInit, ViewChild } from "@angular/core";
import { Icustomer } from "../interfaces/icustomer";
import { CustomerService } from "../services/customer.service";
import { Directive } from "@angular/core";
import { Validator, AbstractControl, NG_VALIDATORS } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { CustomerDialogComponent } from "../customer-dialog/customer-dialog.component";
import { MatTableDataSource, MatSort } from "@angular/material";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MaterialModule } from "../material.module";
import { MatPaginator } from "@angular/material/paginator";
import { MatButtonModule } from "@angular/material/button";

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

  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "gender",
    "phone",
    "email",
    "stAddress",
    "city",
    "state",
    "zip",
    "actions",
  ];
  dataSource = new MatTableDataSource<Icustomer>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private service: CustomerService, public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(CustomerDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.loadCustomersDataSource();
    });
  }

  async ngOnInit() {
    await this.loadCustomersDataSource();
  }

  async loadCustomersDataSource() {
    const data = await this.service.getCustomers();
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  async applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async save() {
    const newCustomer = await this.service.addCustomer(this.customer);
    this.customers.push(newCustomer);
    console.log(newCustomer);
  }

  async delete(customer) {
    await this.service.deleteCustomer(customer.id);
    await this.loadCustomersDataSource();
  }
}
