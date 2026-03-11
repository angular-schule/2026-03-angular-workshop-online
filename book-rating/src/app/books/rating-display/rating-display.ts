import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-rating-display',
  template: `
    <span class="badge text-bg-secondary rounded-pill" role="img" aria-label="Bewertung: {{ value() }} Sterne">
      @for(_ of starsArray(); track $index) {⭐️} {{ value() }}
    </span>
  `,
})
export class RatingDisplay {
  readonly value = input.required<number>();
  protected readonly starsArray = computed(() => new Array(Math.max(0, this.value())));
}
