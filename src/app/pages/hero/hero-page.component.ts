import { Component, computed, signal } from "@angular/core";
import { UpperCasePipe } from "@angular/common";

@Component({
    templateUrl: './hero-page.component.html',
    imports: [UpperCasePipe]
})
export  class HeroPageComponent {
  name = signal('Spiderman');
  age = signal(25);

  heroDescription = computed(() => {
    const description = `${this.name()} - ${this.age()}`;
    return description;
  })

  capitalizedName = computed(() => {
    return this.name().toUpperCase();
  })

  changeHero() {
    this.name.update(currentValue => 'Ironman');
  }

  changeAge() {
    this.age.update(currentValue => 60);
  }

  resetForm() {
    this.name.set('Spiderman');
    this.age.set(25);
  }
}
