import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
  createHero(name: string): void {
    name = name.trim();
    if (name) {
      this.heroService.createHero({name} as Hero).subscribe(
        hero => {
          this.heroes.push(hero);
        }
      );
    }
  }
  deleteHero(hero: Hero): void {
    this.heroService.deleteHero(hero).subscribe(
      _ => {
        this.heroes = this.heroes.filter(item => item !== hero);
      }
    );
  }
  constructor(private heroService: HeroService) { }
  ngOnInit() {
    this.getHeroes();
  }

}
