import { Component } from "@angular/core";

@Component({
    templateUrl: './counter-page.component.html',
})
export class CounterPageComponent {
    public counter: number = 10;

    increment(value: number) {
        this.counter += value;
    }
    decrement(value: number) {
        this.counter -= value;
    }
    reset() {
        this.counter = this.counter;
    }
}
