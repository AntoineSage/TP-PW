import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { apiKey } from 'src/tmdb';
import { HttpClient } from '@angular/common/http';

export interface Movie {
  title: string;
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
}

interface TMDBReponse {
  results: Movie[];
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  movies: Promise<Movie[]> = Promise.resolve([]);

  constructor(
    private readonly router: Router,
    public alertController: AlertController,
    public http: HttpClient
  ) {

  }

  getMovies(search: string) {
    if (search.length >= 3) {
      this.movies = this.searchMovies(search);
    } else {
      this.movies = Promise.resolve([]);
    }
  }

  showDetails(movie: Movie) {
    this.router.navigate(['/detail'], { state: { movie } });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Random movie ?',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Show details',
          handler: () => {
            this.showDetails(this.movies[1]);
          }
        }
      ]
    });

    await alert.present();
  }

  private searchMovies(search: string): Promise<Movie[]> {
    return this.askTMDB('search', { query: search });
  }

  private async askTMDB(api: string, params: object): Promise<Movie[]> {
    const { results } = await this.http.get<TMDBReponse>(
      `https://api.themoviedb.org/3/${api}/movie`,
      { params: { api_key: apiKey, ...params } }
    ).toPromise();
    return results;
  }
}
