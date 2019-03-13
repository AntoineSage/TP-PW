import { Component, OnInit } from '@angular/core';
import { Movie } from '../home/home.page';
import { Router } from '@angular/router';
import { moveEmbeddedView } from '@angular/core/src/view';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  movie: Movie = { title: 'TOTO' };

  constructor(
    private router: Router
  ) {
    this.movie = this.router.getCurrentNavigation().extras.state.movie;
  }

  ngOnInit() {
  }

}
