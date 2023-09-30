import { Component, Input } from '@angular/core';

@Component({
  selector: 'video-reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.scss']
})
export class ReactionComponent {
  @Input() reaction: any; // Input property to receive the reaction object
  @Input()
  goToReactionTimestamp!: (timeframe: number) => void; // Input property for the function
}
