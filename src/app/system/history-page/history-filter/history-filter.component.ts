import { Component, Output, EventEmitter, Input, OnInit } from "@angular/core";

import { Category } from "../../shared/models/category.model";

@Component({
  selector: "mp-history-filter",
  templateUrl: "./history-filter.component.html",
  styleUrls: ["./history-filter.component.scss"]
})
export class HistoryFilterComponent {
  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();
  timePeriods = [
    { type: "d", label: "День" },
    { type: "w", label: "Неделя" },
    { type: "M", label: "Месяц" }
  ];
  selectedPeriod = "d";
  types = [
    { type: "income", label: "Доход" },
    { type: "outcome", label: "Расход" }
  ];
  @Input() categories: Category[] = [];
  selectTypes = [];
  selectCategories = [];

  closeFilter() {
    this.selectCategories = [];
    this.selectTypes = [];
    this.selectedPeriod = "d";
    this.onFilterCancel.emit();
  }

  private calculateInputParams(field: string, checked: boolean, value: string) {
    if (checked) {
      this[field].indexOf(value) === -1 ? this[field].push(value) : null;
    } else {
      this[field] = this[field].filter(i => i !== value);
    }
  }

  handleChangeType({ checked, value }) {
    this.calculateInputParams("selectTypes", checked, value);
  }

  handleChangeCategory({ checked, value }) {
    this.calculateInputParams("selectCategories", checked, value);
  }

  applyFilter() {
    this.onFilterApply.emit({
      types: this.selectTypes,
      categories: this.selectCategories,
      period: this.selectedPeriod
    });
  }
}
