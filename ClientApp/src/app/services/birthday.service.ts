import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BirthdayService {
  constructor(private http: HttpClient) {}

  public getBirthdays(): Observable<any> {
    return this.http.get(
      `https://cors-anywhere.herokuapp.com/https://celebritybucks.com/developers/birthdays/JSON`
    );
  }
}
