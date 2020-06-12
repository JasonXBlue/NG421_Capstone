import { Component, OnInit } from "@angular/core";
import { Ievent } from "../interfaces/ievent";
import { EventService } from "../services/event.service";

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.css"],
})
export class EventComponent implements OnInit {
  event: Ievent = {
    id: 1,
    start: new Date(),
    end: new Date(),
    title: "",
    apptType: "",
  };

  events: Ievent[] = [];

  constructor(private service: EventService) {}

  async ngOnInit() {
    this.events = await this.service.getEvents();
    console.log(this.events);
  }

  async save() {
    const newEvent = await this.service.addEvent(this.event);
    this.events.push(newEvent);
    console.log(newEvent);
  }
}
