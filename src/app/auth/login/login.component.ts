import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { AuthService } from "../../shared/services/auth.service";
import { UsersService } from "../../shared/services/users.service";
import { User } from "src/app/shared/models/user.model";
import { Message } from "../../shared/models/message.model";

@Component({
  selector: "mp-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: Message;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.message = new Message("danger", "");
    this.route.queryParams.subscribe((params: Params) => {
      if (params["nowCanLogin"]) {
        this.showMessage("Теперь вы можете зайти в систему", "success");
      }
    });
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  private showMessage(text: string, type: string = "danger") {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = "";
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;

    this.usersService.getUserByEmail(formData.email).subscribe((user: User) => {
      if (user) {
        if (user.password === formData.password) {
          this.message.text = "";
          window.localStorage.setItem("user", JSON.stringify(user));
          this.authService.login();
          this.router.navigate(["/system", "bill"]);
        } else {
          this.showMessage("Пароль не верный.");
        }
      } else {
        this.showMessage("Такого пользователя не существует.");
      }
    });
  }
}
