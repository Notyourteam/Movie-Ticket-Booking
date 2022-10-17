import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constant } from '../Utilities/constant';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Movie } from '../Utilities/movie';

@Injectable({
  providedIn: 'root',
})
export class ApiConsumerService {
  constructor(private httpClient: HttpClient) {}

  getAllMovieDetail(): Observable<Movie[]> {
    return this.httpClient
      .get<Movie[]>(Constant.getEndpoint.toString())
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteAMovie(id: number): Observable<Movie> {
    return this.httpClient
      .delete<Movie>(`${Constant.deleteEndPoint}/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }
  handleError(er: any) {
    return throwError(() => {
      console.log(er);
    });
  }
  editUser(movie:Movie): Observable<Movie> {
    const header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    return this.httpClient
      .put<Movie>(`${Constant.deleteEndPoint}/${movie.id}`,movie, { headers: header })
      .pipe(retry(1), catchError(this.handleError));
  }
}
