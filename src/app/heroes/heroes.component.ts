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
  selectedHero: Hero;
  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }
  getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }
  constructor(private heroService: HeroService) { }
  ngOnInit() {
    this.getHeroes();
  }

}
