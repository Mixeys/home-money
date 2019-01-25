import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgForm } from "@angular/forms";

import { Category } from "../../shared/models/category.model";
import { CategoryService } from "../../shared/services/category.service";
import { Message } from "../../../shared/models/message.model";

@Component({
  selector: "mp-edit-category",
  templateUrl: "./edit-category.component.html",
  styleUrls: ["./edit-category.component.scss"]
})
export class EditCategoryComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();
  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.onCategoryChange();
    this.message = new Message("success", "");
  }

  onSubmit(form: NgForm) {
    let { capacity, name } = form.value;
    if (capacity < 0) capacity *= -1;
    const category = new Category(name, capacity, +this.currentCategoryId);
    this.categoryService
      .updateCategory(category)
      .subscribe((category: Category) => {
        this.onCategoryEdit.emit(category);
        this.message.text = "Категория успешно отредактирована.";
        window.setTimeout(() => (this.message.text = ""), 5000);
      });
  }

  onCategoryChange() {
    this.currentCategory = this.categories.find(
      c => c.id === +this.currentCategoryId
    );
  }
}
