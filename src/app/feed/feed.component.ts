import { Component, OnInit } from '@angular/core';
import { Person } from '../login/person';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Globals } from '../global';
import { debug } from 'util';
import { Feed } from './feed';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {


  private person: Person = new Person();

  private feed: Feed[] = [];

  private feedOkay = false;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router, public Global: Globals) { }

  ngOnInit() {
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
              this.loadFeed(this.person);
              console.log(this.person);
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

  loadFeed(person) {
    this.http.post(this.Global.API + '/getfeed', { token: person.token })
      .subscribe(
        res => {
          res['feed'].forEach(e => {
            this.feed.push(e);
          });
          console.log(this.feed);
        },
        err => {
          console.log("Error occured");
        }
      );
    this.feedOkay = true;
  }

}
