import { Injectable } from "@angular/core";
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { CalendarEvent, CalendarView } from "angular-calendar";
import { HttpClient } from "@angular/common/http";
import { startOfYear, subYears } from "date-fns";

// @Injectable({
//   providedIn: 'root'
// })

// get your own key from https://holidayapi.com/
const HOLIDAY_API_KEY = "b8df5924-7580-491b-b7d9-095c436ac8aa";

// change this to your own country
const COUNTRY_CODE = "US";

interface Holiday {
  date: string;
  name: string;
}

type CalendarEventWithMeta = CalendarEvent<
  { type: "holiday"; holiday: Holiday } | { type: "normal" }
>;

export class HolidayApiService implements OnInit {
  view: CalendarView = CalendarView.Month;

  viewDate = startOfYear(subYears(new Date(), 1));

  events: CalendarEventWithMeta[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchHolidays();
  }

  private fetchHolidays() {
    this.http
      .get<{ holidays: Holiday[] }>("https://holidayapi.com/v1/holidays", {
        params: {
          country: COUNTRY_CODE,
          year: String(new Date().getFullYear() - 1),
          key: HOLIDAY_API_KEY,
        },
      })
      .subscribe(({ holidays }) => {
        this.events = holidays.map((holiday) => {
          return {
            start: new Date(holiday.date),
            title: holiday.name,
            allDay: true,
            meta: {
              type: "holiday",
              holiday,
            },
          };
        });
        this.cdr.markForCheck();
      });
  }
}
