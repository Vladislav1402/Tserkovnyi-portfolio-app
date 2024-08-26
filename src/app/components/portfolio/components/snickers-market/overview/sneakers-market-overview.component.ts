import { SneakersFilter } from './../components/sneakers-filter/sneakers-filter.component';
import { SneakersService } from './../sneakers.service';
import { SneakersBasket } from './../components/sneakers-basket/sneakers-basket.component';
import { SneakersCard } from '../components/sneakers-card/sneakers-card.component';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Sneakers } from '../sneakers-types';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../sneakers-filter.pipe';
import { trigger, transition, animate, style, query, stagger } from '@angular/animations';

@Component({
   selector: 'app-snickers-market-overview',
   templateUrl: './sneakers-market-overview.component.html',
   styleUrls: ['./sneakers-market-overview.component.scss'],
   standalone: true,
   animations: [
      trigger('filter', [
         transition(':leave', [
            animate(300, style({
               opacity: 0,
            }))
         ])
      ])
   ],
   imports: [SneakersCard, SneakersBasket, CommonModule, SneakersFilter, FormsModule, ReactiveFormsModule, FilterPipe]
})

export class SneakersMarket {
   form!: FormGroup;

   constructor(
      private cdRef: ChangeDetectorRef,
      private sneakersService: SneakersService,
      private fb: FormBuilder
   ) {
      this.form = this.fb.group(
         {
            filter: [],
            selectedSortOption: 'az',
         }
      )
      this.basket$ = this.sneakersService.getBasket()
   }

   animationState: boolean = false;
   basketOpened = false;
   basket$!: Observable<Sneakers[]>;
   totalPrice = 0;
   _value = false;

   sneackers: Sneakers[] = [
      { lable: 'Sneakers Nike Blazer Mid Suede', id: '0', img: '/assets/images/snickers/card-1.jpg', price: 300, quantity: 1, state: 'deleted' },
      { lable: 'Nike Air Max 270', id: '1', img: '/assets/images/snickers/card-2.jpg', price: 200, quantity: 1, state: 'deleted' },
      { lable: 'Nike Blazer Mid Suede', id: '2', img: '/assets/images/snickers/card-3.jpg', price: 250, quantity: 1, state: 'deleted' },
      { lable: 'Puma X Aka Boku Future Rider', id: '3', img: '/assets/images/snickers/card-4.jpg', price: 230, quantity: 1, state: 'deleted' },
      { lable: 'Under Armour Curry 8', id: '4', img: '/assets/images/snickers/card-5.jpg', price: 120, quantity: 1, state: 'deleted' },
      { lable: 'Nike Kyrie 7', id: '5', img: '/assets/images/snickers/card-6.jpg', price: 220, quantity: 1, state: 'deleted' },
      { lable: 'Jordan Air Jordan 11', id: '6', img: '/assets/images/snickers/card-7.jpg', price: 350, quantity: 1, state: 'deleted' },
      { lable: 'Nike LeBron XVIII', id: '7', img: '/assets/images/snickers/card-8.jpg', price: 430, quantity: 1, state: 'deleted' },
      { lable: 'Nike Lebron XVIII Low', id: '8', img: '/assets/images/snickers/card-9.jpg', price: 235, quantity: 1, state: 'deleted' },
   ]

   selectedSortOption: string = '';

   handleDisckClick(value: boolean) {
      this._value = value
   }

   sortSneakers() {
      switch (this.form.get('selectedSortOption')?.value) {
         case 'az':
            this.sneackers.sort((a, b) => a.lable.localeCompare(b.lable));
            break;
         case 'za':
            this.sneackers.sort((a, b) => b.lable.localeCompare(a.lable));
            break;
         case 'low-high':
            this.sneackers.sort((a, b) => a.price - b.price);
            break;
         case 'high-low':
            this.sneackers.sort((a, b) => b.price - a.price);
            break;
      }
      this.animationState = !this.animationState;
      setTimeout(() => {
         this.animationState = !this.animationState
      }, 200)
      this.cdRef.detectChanges();
   }

   handleDelete(i: number) {
      this.sneackers.splice(i, 1)
   }

   get filterPipe() {
      return this.form?.get("filter")?.value
   }


   handleToggleBasket() {
      this.basketOpened = !this.basketOpened;
   }

   getCalculatedPrice() {
      return this.sneakersService.basket$.value.length
         ? this.sneakersService.basket$.value
            .map(sneaker => sneaker.quantity > 0 ?
                this.calculateWithDiscount(sneaker.price) 
                * sneaker.quantity 
                : sneaker.price)
            .reduce((acc: number, item: number) => acc += item)
         : 0
   }

   calculateWithDiscount(price: number) {
     return this._value ? price - (price * 0.1) : price
   }

   handleAddToBasket(sneaker: Sneakers) {
      this.sneakersService.setBasket(sneaker)
   }

}