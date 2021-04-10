import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/User';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    userName: '',
    password: '',
    _id: null

  }

  loading: boolean = false;
  warning: string;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = new User();
  }

  onSubmit(f: NgForm): void {
    if (this.user.userName !== '' && this.user.password !== '') {
      this.loading = true;

      this.auth.login(this.user).subscribe(
        (success) => {
          localStorage.setItem('access_token', success.token);
          this.router.navigate(['/newReleases']);
        },
        (err) => {
          this.warning = err.error.message;
          this.loading = false;
        }
      );
    }

    else {
      this.warning = "Username or password was not provided"
    }
  }


}
