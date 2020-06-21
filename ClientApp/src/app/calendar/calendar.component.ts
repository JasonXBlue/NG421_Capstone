import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Injectable,
  Input,
} from "@angular/core";
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  parseISO,
} from "date-fns";
import { Subject, Observable } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from "angular-calendar";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { EventService } from "../services/event.service";
import { HolidayApiService } from "../services/holiday-api.service";
import { Holiday } from "../interfaces/holiday";
import { Ievent } from "../interfaces/ievent";
import { EventDialogComponent } from "../event-dialog/event-dialog.component";
import { MatDialog } from "@angular/material";

const colors: any = {
  red: {
    primary: "#ad2121",
    secondary: "#FAE3E3",
  },
  blue: {
    primary: "#1e90ff",
    secondary: "#D1E8FF",
  },
  yellow: {
    primary: "#e3bc08",
    secondary: "#FDF1BA",
  },
};

@Component({
  selector: "app-calendar",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./calendar.component.css"],
  templateUrl: "./calendar.component.html",
})
@Injectable({
  providedIn: "root",
})
export class CalendarComponent {
  @ViewChild("modalContent", { static: true }) modalContent: TemplateRef<any>;

  name = new FormControl("");
  editApptForm: FormGroup;

  view: CalendarView = CalendarView.Week;

  //exclude Sunday as non-working day for client
  excludeDays: number[] = [0];

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  isDragging = false;

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: "Edit",
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent("Edited", event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: "Delete",
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent("Deleted", event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    //   {
    //     start: subDays(startOfDay(new Date()), 1),
    //     end: addDays(new Date(), 1),
    //     title: "A 3 day event",
    //     color: colors.red,
    //     actions: this.actions,
    //     allDay: true,
    //     resizable: {
    //       beforeStart: true,
    //       afterEnd: true,
    //     },
    //     draggable: true,
    //   },
    //   {
    //     start: startOfDay(new Date()),
    //     title: "An event with no end date",
    //     color: colors.yellow,
    //     actions: this.actions,
    //   },
    //   {
    //     start: subDays(endOfMonth(new Date()), 3),
    //     end: addDays(endOfMonth(new Date()), 3),
    //     title: "A long event that spans 2 months",
    //     color: colors.blue,
    //     allDay: true,
    //   },
    //   {
    //     start: addHours(startOfDay(new Date()), 2),
    //     end: addHours(new Date(), 2),
    //     title: "A draggable and resizable event",
    //     color: colors.yellow,
    //     actions: this.actions,
    //     resizable: {
    //       beforeStart: true,
    //       afterEnd: true,
    //     },
    //     draggable: true,
    //   },
  ];

  activeDayIsOpen: boolean = true;

  appts: Ievent[] = [];

  // holidays: CalendarEvent[] = [];
  holidays: Holiday[] = [];

  @Input()
  result$: Observable<any>;

  constructor(
    private modal: NgbModal,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private Eservice: EventService,
    private holiday: HolidayApiService,
    private Holiday: HolidayApiService,
    public dialog: MatDialog
  ) {
    this.result$ = holiday.getHolidays();
  }

  openDialog() {
    const dialogRef = this.dialog.open(EventDialogComponent);
    this.refresh.next();

    // dialogRef.afterClosed().subscribe((result) => {
    //   this.loadCustomersDataSource();
    // });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    if (this.isDragging) {
      return;
    }
    this.isDragging = true;

    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();

    setTimeout(() => {
      this.isDragging = false;
    }, 1000);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: "lg" });
  }

  addEvent(): void {
    this.modal.open(this.modalContent, { size: "lg" });
  }

  hourSegmentClicked(event) {
    let newEvent: CalendarEvent = {
      start: event.date,
      end: addHours(event.date, 1),
      title: "Enter name:",
      cssClass: "custom-event",
      color: {
        primary: "#488aff",
        secondary: "#bbd0f5",
      },
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    };
    this.events.push(newEvent);
    this.refresh.next();
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
    this.modal.dismissAll();
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  dayHeaderClicked(evn) {
    this.viewDate = evn.day.date; //get the clicked date value
  }

  async ngOnInit() {
    this.appts = await this.Eservice.getEvents();

    this.refresh.next();
    this.editApptForm = this.fb.group({
      title: [""],
    });
    // this.appts = await this.Eservice.getEvents();

    this.result$.subscribe((res) => {
      this.holidays = res.holidays;
      console.log(this.holidays);

      return this.holidays;
    });

    // this.holidays.forEach((holiday) => {
    //   this.events.push({
    //     start: new Date(holiday.start),
    //     end: new Date(holiday.end),
    //     title: holiday.title,
    //     color: colors.red,
    //     actions: this.actions,
    //     allDay: true,
    //     resizable: {
    //       beforeStart: true,
    //       afterEnd: true,
    //     },
    //     draggable: true,
    //   });
    // });

    this.appts.forEach((appt) => {
      this.events.push({
        start: new Date(appt.start),
        end: new Date(appt.end),
        title: appt.title,
        color: colors.red,
        actions: this.actions,
        // allDay: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        draggable: true,
      });
    });

    this.holidays.forEach((hol) => {
      this.events.push({
        // start: new Date(parseISO("hol.date")),
        // end: new Date(parseISO("hol.date")),
        start: new Date(`${hol.date}`),
        end: new Date(`${hol.date}`),
        // end: new Date(hol.date),
        title: hol.name,
        color: colors.blue,
        actions: this.actions,
        // meta: {
        //   type: 'holiday',
        //   holiday,
        // }
      });
    });

    // this.events.push({
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: "jjjjj",
    //   color: colors.red,
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // });
  }
}
