import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../global';
import { Person } from '../login/person';
import { Profile } from './profile';
import { Feed } from '../feed/feed';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private person: Person = new Person();

  private profile: Person = new Person();

  private content: Feed[] = [];

  private username: string;

  private profileOkay = false;

  constructor(private http: HttpClient, private router: Router, public Global: Globals, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.username = params['username'];
    });
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser == null) {
      this.router.navigate(['./login']);
    } else {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.http.post(this.Global.API + '/auth', { access_token: currentUser.access_token })
        .subscribe(
          res => {
            if (res['auth'] == true) {
              this.person = currentUser;
              this.loadProfile(this.username, this.person);
            } else {
              localStorage.clear();
              this.router.navigate(['./login']);
            }
          },
          err => {
            console.log("Error occured");
            localStorage.clear();
            this.router.navigate(['./login']);
          }
        );

    }
  }


  loadProfile(nick, person) {
    this.http.post(this.Global.API + '/getprofile', { nick: nick, id: person.id })
      .subscribe(
        res => {
          this.profile = res['profile'][0];
          if (person.nick == nick) {
            this.profile.network = -1;
          }
          else if (res['network'][0] != undefined) {
            this.profile.network = res['network'][0]['typeId'];
          } else {
            this.profile.network = 0;
          }

          res['contents'].forEach(e => {
            this.content.push(e);
          });

        },
        err => {
          console.log("Error occured");
        }
      );
    this.profileOkay = true;
  }
}
