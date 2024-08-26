import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Sneakers } from '../../sneakers-types';

@Component({
  selector: 'app-sneakers-card',
  templateUrl: './sneakers-card.component.html',
  styleUrls: ['./sneakers-card.component.scss'],
  standalone: true,
  imports: [CommonModule]
})

export class SneakersCard {
  @Input() sneaker!: Sneakers;
  @Input() isBasket: boolean = false;
  @Output() onAddToBasket = new EventEmitter<Sneakers>()
  @Output() onDeleteFromBasket = new EventEmitter<void>()

  handleAddToBasket(sneaker: Sneakers) {
    this.onAddToBasket.emit(sneaker)
  }

  handleDeleteFromBasket() {
    this.onDeleteFromBasket.emit()
  }
}