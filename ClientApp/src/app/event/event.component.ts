import { Component, OnInit, ViewChild } from "@angular/core";
import { Ievent } from "../interfaces/ievent";
import { EventService } from "../services/event.service";
import { MaterialModule } from "../material.module";
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
} from "@angular/material";
import { EventDialogComponent } from "../event-dialog/event-dialog.component";

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.css"],
})
export class EventComponent implements OnInit {
  event: Ievent = {
    id: 0,
    start: new Date(),
    end: new Date(),
    title: "",
    apptType: "",
  };

  events: Ievent[] = [];

  displayedColumns: string[] = ["start", "end", "title", "apptType", "actions"];

  dataSource = new MatTableDataSource<Ievent>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private service: EventService, public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(EventDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.loadCustomersDataSource();
    });
  }

  async ngOnInit() {
    await this.loadCustomersDataSource();
  }

  async loadCustomersDataSource() {
    const data = await this.service.getEvents();
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
    const newEvent = await this.service.addEvent(this.event);
    this.events.push(newEvent);
    console.log(newEvent);
  }

  async delete(event) {
    await this.service.deleteEvent(event.id);
    await this.loadCustomersDataSource();
    //this.events = this.events.filter((c) => c.id !== event.id);
  }
}
