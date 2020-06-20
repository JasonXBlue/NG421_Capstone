import {
  Component,
  OnInit,
  Injectable,
  PipeTransform,
  Pipe,
} from "@angular/core";
import { Ibirthday } from "../interfaces/ibirthday";
import { HttpClient } from "@angular/common/http";

@Pipe({ name: "values" })
@Component({
  selector: "app-api-birthday",
  templateUrl: "./api-birthday.component.html",
  styleUrls: ["./api-birthday.component.css"],
})
@Injectable()
export class ApiBirthdayComponent implements OnInit, PipeTransform {
  private CELEB_URL =
    "https://cors-anywhere.herokuapp.com/https://celebritybucks.com/developers/birthdays/JSON";

  birthdays: Ibirthday[] = [];

  constructor(private httpClient: HttpClient) {}

  transform(value, args: string[]): any {
    let values = [];
    for (let key in value) {
      values.push(value[key]);
    }
    return values;
  }

  async getBirthdays() {
    return await this.httpClient.get<Ibirthday[]>(this.CELEB_URL).toPromise();
  }

  async ngOnInit() {
    //const data = await this.getBirthdays();
    this.birthdays = await this.getBirthdays();
    console.log(this.birthdays);
  }
}
