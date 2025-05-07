import { Component, ChangeDetectionStrategy, signal } from "@angular/core";

@Component({
    templateUrl: './counter-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterPageComponent {
    counterSignal = signal(10);

    increment(value: number) {
        this.counterSignal.update(currentValue => currentValue + value);
    }
    decrement(value: number) {
        this.counterSignal.update(currentValue => currentValue - value);
    }
    reset() {
        this.counterSignal.set(0);
    }
}
