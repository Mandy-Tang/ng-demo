import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
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

  getHeroes(): Observable<Hero[]> {
    console.log('get');
    this.log('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  getHero(id: Number): Observable<Hero> {
    this.log(`HeroService: fetched hero with id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }
}
