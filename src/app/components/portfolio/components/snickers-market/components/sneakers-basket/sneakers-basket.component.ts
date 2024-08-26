import { FormsModule } from '@angular/forms';
import { SneakersService } from './../../sneakers.service';
import { SneakersCard } from '../sneakers-card/sneakers-card.component';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import type { Sneakers } from '../../sneakers-types';
import { Observable } from 'rxjs/internal/Observable';
import { trigger, transition, animate, style, query, stagger, state, group, sequence, animateChild, keyframes } from '@angular/animations';

@Component({
    selector: 'app-sneakers-basket',
    templateUrl: './sneakers-basket.component.html',
    styleUrls: ['./sneakers-basket.component.scss'],
    standalone: true,
    imports: [CommonModule, SneakersCard, FormsModule],
    animations: [
        trigger('basketIn', [
            transition(':leave', [
                animate(200, style({
                    opacity: 0,
                    height: 0
                }))
            ])
        ])
    ]

})


export class SneakersBasket {
    @Input() opened: boolean = false;
    @Input() totalPrice: number = 0;
    @Output() onCloseModal = new EventEmitter<void>();
    @Output() onAddToBasket = new EventEmitter<Sneakers>()
    @Output() onDiscountClick = new EventEmitter<boolean>()

    animationInitialized: boolean = false;
    basketOpened = false;
    basket$!: Observable<Sneakers[]>;
    _value: boolean = false;

    constructor(private sneakersService: SneakersService) {
        this.basket$ = this.sneakersService.getBasket()
    }

    trackById(index: number, sneaker: Sneakers): string {
        return sneaker.id;
    }

    handleAddToBasket(sneaker: Sneakers) {
        this.onAddToBasket.emit(sneaker)
    }

    handleDeleteSneaker(id: string) {
        this.sneakersService.deleteSnickersFromBasket(id)
    }

    handleMinusSneaker(id: string) {
        this.sneakersService.minusSneaker(id)
    }

    handlePlusSneaker(id: string) {
        this.sneakersService.plusSneaker(id)
    }

    getSnickerTotalPrice(sneaker: Sneakers) {
        return sneaker.price * sneaker.quantity
    }

    closeModal() {
        this.onCloseModal.emit()
    }

    handleClickDiscount() {
        this.onDiscountClick.emit(this._value)
    }
}