import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { ApiConsumerService } from 'src/app/services/config.service';
import { Movie } from 'src/app/Utilities/movie';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  movies: Movie[] = [];
  constructor(private service: ApiConsumerService,
    private router: Router) {}

  ngOnInit(): void {
    this.getAllMovie();
  }

  getAllMovie() {
    this.service.getAllMovieDetail().subscribe((data: Movie[]) => {
      this.movies = data;
      console.log(this.movies)
    });
  }
  goToForm(movie: Movie){
    const navigationExtras: NavigationExtras = {state: movie};
      this.router.navigate(['form'], navigationExtras);
  }
}
