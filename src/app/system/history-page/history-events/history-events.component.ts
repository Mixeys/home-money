import { Component, OnInit, Input } from "@angular/core";
import { Category } from "../../shared/models/category.model";
import { MPEvent } from "../../shared/models/event.model";

@Component({
  selector: "mp-history-events",
  templateUrl: "./history-events.component.html",
  styleUrls: ["./history-events.component.scss"]
})
export class HistoryEventsComponent implements OnInit {
  @Input() category: Category[] = [];
  @Input() events: MPEvent[] = [];
  searchValue = "";
  searchPlaceholder = "Сумма";
  searchField = "amount";

  constructor() {}

  ngOnInit() {
    this.events.forEach(e => {
      e.catName = this.category.find(c => c.id === e.category).name;
    });
  }

  getEventClass(e: MPEvent) {
    return {
      label: true,
      "label-danger": e.type === "outcome",
      "label-success": e.type === "income"
    };
  }

  changeCriteria(field: string) {
    const nameMap = {
      amount: "Сумма",
      date: "Дата",
      category: "Категория",
      type: "Тип"
    };
    this.searchPlaceholder = nameMap[field];
    this.searchField = field;
  }
}
