import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, tap} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';

  private log(message: String) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log(`fetched heroes`)),
        catchError(this.handleError('getHeroes', []))
      );
  }

  getHero(id: Number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero with id=${id}`)),
        catchError(this.handleError<Hero>(`getHero with id=${id}`))
      );
  }

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }
}
