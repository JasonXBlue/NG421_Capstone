import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class BirthdayService {
  constructor(private http: HttpClient) {}

  public getBirthdays() {
    return this.http.get(
      `https://cors-anywhere.herokuapp.com/https://celebritybucks.com/developers/birthdays/JSON`
    );
  }
}
