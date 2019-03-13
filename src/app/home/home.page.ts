import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface Movie {
  title: string;
}


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  movies: Movie[] = [];

  constructor(
    private readonly router: Router
  ) {

    this.movies.push({
      title: 'Movie 1 !'
    });
    this.movies.push({
      title: 'Movie 2 !'
    });
  }

  getMovies(search: string) {
    if (search.length >= 3) {
      this.movies = [
        { title: 'Movie 1' },
        { title: 'Movie 2' },
        { title: 'Movie 3' },
      ]
    } else {
      this.movies = [];
    }
  }

  showDetails(movie: Movie) {
    this.router.navigate(['/detail'], { state: { movie } });
  }
}
