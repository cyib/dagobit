import { Component, OnInit, EventEmitter } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from './user';
import { Person } from './person';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Title } from '../../../node_modules/@angular/platform-browser';
import { Globals } from '../global'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: User = new User();
  private person: Person = new Person();
  private okay = true;

  constructor(private authService: AuthService, private http: HttpClient, private router: Router, public Global: Globals) {

  }

  ngOnInit() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser != null) {
      this.router.navigate(['./feed']);
    }
  }

  fnlogin() {
    if (Object.keys(this.user).length > 0 && this.user.username != "" && this.user.password != "") {
      this.http.post(this.Global.API + '/user', { username: this.user.username, password: this.user.password })
        .subscribe(
          res => {
            if (Object.keys(res).length > 0) {
              this.person = res['data'];
              this.person.token = res['access_token'];
              localStorage.setItem('currentUser',
                JSON.stringify(
                  {
                    name: this.person.name,
                    nick: this.person.nick,
                    age: this.person.age,
                    id: this.person.id,
                    access_token: this.person.token
                  }
                )
              );
              this.router.navigate(['./feed']);
            } else {
              this.okay = false;
            }
          },
          err => {
            console.log("Error occured");
            this.okay = false;
          }
        );
    } else {
      this.okay = false;
    }

  }
}
