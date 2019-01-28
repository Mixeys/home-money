import { Component, OnInit, OnDestroy } from "@angular/core";
import { BillService } from "../shared/services/bill.service";
import { CategoryService } from "../shared/services/category.service";
import { EventsService } from "../shared/services/events.service";
import { combineLatest, Subscription } from "rxjs";
import { Category } from "../shared/models/category.model";
import { MPEvent } from "../shared/models/event.model";
import { Bill } from "../shared/models/bill.model";

@Component({
  selector: "mp-planning-page",
  templateUrl: "./planning-page.component.html",
  styleUrls: ["./planning-page.component.scss"]
})
export class PlanningPageComponent implements OnInit, OnDestroy {
  sub: Subscription;
  isLoaded = false;
  bill: Bill;
  category: Category[] = [];
  events: MPEvent[] = [];

  constructor(
    private billService: BillService,
    private categoryService: CategoryService,
    private eventsService: EventsService
  ) {}

  ngOnInit() {
    this.sub = combineLatest(
      this.billService.getBill(),
      this.categoryService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [Bill, Category[], MPEvent[]]) => {
      this.bill = data[0];
      this.category = data[1];
      this.events = data[2];
      this.isLoaded = true;
    });
  }

  getCategoryCost(cat: Category): number {
    const catEvents = this.events.filter(
      e => e.category === cat.id && e.type === "outcome"
    );
    return catEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }

  private getPercent(cat: Category): number {
    const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCatPercent(cat: Category): string {
    return this.getPercent(cat) + "%";
  }

  getCatColorClass(cat: Category): string {
    const percent = this.getPercent(cat);
    return percent < 60 ? "success" : percent >= 100 ? "danger" : "warning";
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
