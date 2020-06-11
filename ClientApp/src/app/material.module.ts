import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";

@NgModule({
  declarations: [],
  imports: [CommonModule, MatTableModule, MatCardModule],
  exports: [MatTableModule, MatCardModule],
})
export class MaterialModule {}
