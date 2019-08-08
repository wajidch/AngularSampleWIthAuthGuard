import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-deposite-requests',
  templateUrl: './deposite-requests.component.html',
  styleUrls: ['./deposite-requests.component.css']
})
export class DepositeRequestsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
}
  }


