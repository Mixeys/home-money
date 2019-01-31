import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, combineLatest } from "rxjs";
import * as moment from "moment";

import { CategoryService } from "../shared/services/category.service";
import { EventsService } from "../shared/services/events.service";
import { Category } from "../shared/models/category.model";
import { MPEvent } from "../shared/models/event.model";

@Component({
  selector: "mp-history-page",
  templateUrl: "./history-page.component.html",
  styleUrls: ["./history-page.component.scss"]
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  sub: Subscription;
  isLoaded = false;
  category: Category[] = [];
  events: MPEvent[] = [];
  chartData = [];
  isFilterVisible = false;
  filteredEvents: MPEvent[] = [];

  constructor(
    private categoryService: CategoryService,
    private eventsService: EventsService
  ) {}

  ngOnInit() {
    this.sub = combineLatest(
      this.categoryService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [Category[], MPEvent[]]) => {
      this.category = data[0];
      this.events = data[1];
      this.setOriginalEvents();
      this.calculateChartData();
      this.isLoaded = true;
    });
  }

  calculateChartData(): void {
    this.chartData = [];
    this.category.forEach(cat => {
      const catEvents = this.filteredEvents.filter(
        e => e.category === cat.id && e.type === "outcome"
      );
      this.chartData.push({
        name: cat.name,
        value: catEvents.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    });
  }

  private setOriginalEvents() {
    this.filteredEvents = this.events.slice();
  }

  private toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir;
  }

  openFilter() {
    this.toggleFilterVisibility(true);
  }

  onFilterApply(filterData) {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    const startPeriod = moment()
      .startOf(filterData.period)
      .startOf("d");
    const endPeriod = moment()
      .endOf(filterData.period)
      .endOf("d");
    this.filteredEvents = this.filteredEvents
      .filter(e => {
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter(e => {
        return filterData.categories.indexOf(e.category + "") !== -1;
      })
      .filter(e => {
        const momentDate = moment(e.date, "DD.MM.YYYY HH:mm:ss");
        return momentDate.isBetween(startPeriod, endPeriod);
      });
    this.calculateChartData();
  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
