import { Component, OnInit } from "@angular/core";
import { EventService } from "../services/event.service";
import { MatDialogRef } from "@angular/material";
import { Ievent } from "../interfaces/ievent";

@Component({
  selector: "app-event-dialog",
  templateUrl: "./event-dialog.component.html",
  styleUrls: ["./event-dialog.component.css"],
})
export class EventDialogComponent implements OnInit {
  constructor(
    private service: EventService,
    private dialogRef: MatDialogRef<EventDialogComponent>
  ) {}

  submitted = false;

  apptTypes = ["haircut", "color", "trim"];

  event = {
    id: 0,
    start: new Date(),
    end: new Date(),
    title: "",
    apptType: "",
  };

  events: Ievent[] = [];

  async save() {
    const newEvent = await this.service.addEvent(this.event);
    this.dialogRef.close(newEvent);
  }

  onSubmit() {
    this.submitted = true;
  }

  ngOnInit() {}
}
