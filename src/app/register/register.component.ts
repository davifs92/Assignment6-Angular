import { Component, OnInit } from '@angular/core';
import { RegisterUser } from 'src/app/RegisterUser';
import { AuthService } from 'src/app/auth.service';
import { NgForm } from "@angular/forms";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser: RegisterUser = {
    userName: '',
    password: '',
    password2: ''
  }

  warning: string;
  success: boolean = false;
  loading: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {


  }

  onSubmit(f: NgForm): void {

    if (this.registerUser.userName !== "" && this.registerUser.password === this.registerUser.password2) {
      this.loading = true;

      this.auth.register(this.registerUser).subscribe(
        (success) => {
          this.success = true;
          this.warning = null;
          this.loading = false;
        },
        (err) => {
          this.success = false;
          this.warning = err.error.message;
          this.loading = false;
        }
      );

    }

    else {
      this.warning = "Passwords doesn't match or the user is empty"
    }

  }

}
