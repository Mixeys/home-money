import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { NgxChartsModule } from "@swimlane/ngx-charts";

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgxChartsModule],
  exports: [ReactiveFormsModule, FormsModule, NgxChartsModule]
})
export class SharedModule {}
