import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


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
    private readonly router: Router,
    public alertController: AlertController
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
}
