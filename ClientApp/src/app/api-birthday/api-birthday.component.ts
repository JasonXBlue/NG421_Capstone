import { Component, OnInit, Injectable, Pipe } from "@angular/core";
import { BirthdayService } from "../services/birthday.service";

@Pipe({ name: "values" })
@Component({
  selector: "app-api-birthday",
  templateUrl: "./api-birthday.component.html",
  styleUrls: ["./api-birthday.component.css"],
})
@Injectable()
export class ApiBirthdayComponent implements OnInit {
  articles;

  constructor(private apiService: BirthdayService) {}

  ngOnInit() {
    this.apiService.getBirthdays().subscribe((data) => {
      console.log(data);
      this.articles = data["articles"];
    });
  }
}
