import { Component, OnInit } from "@angular/core";
import { BirthdayService } from "../services/birthday.service";

@Component({
  selector: "app-api-birthday",
  templateUrl: "./api-birthday.component.html",
  styleUrls: ["./api-birthday.component.css"],
})
export class ApiBirthdayComponent implements OnInit {
  articles;

  constructor(private apiService: BirthdayService) {}

  ngOnInit() {
    this.apiService.getBirthdays().subscribe((data: any) => {
      console.log(data);
      this.articles = data["Birthdays"];
    });
  }
}

// credit to celebritybucks.com for celebrity birthday info via their API
