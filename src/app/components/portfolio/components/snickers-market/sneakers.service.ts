import { Sneakers } from './sneakers-types';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SneakersService {
    basket$ = new BehaviorSubject<Sneakers[]>([])
    $basket = this.basket$.asObservable()

    getBasket() {
        return this.$basket
    }

    setBasket(sneaker: Sneakers) {
        const currentBasket = this.basket$.value;
        const sneakerInBasket = currentBasket.find(sn => sn.id === sneaker.id)
 
        if (!sneakerInBasket) {
            sneaker.state = 'normal';
            currentBasket.push(sneaker);
        } else {
            sneakerInBasket.quantity += 1;
            return
        }
        this.basket$.next(currentBasket);
    }

    deleteSnickersFromBasket(id: string) {
        const currentBasket = this.basket$.value.filter(item => item.id !== id);
        let sneaker = currentBasket.find(basket => basket.id === id);
        if (sneaker) {
            sneaker.state = 'deleted';
            sneaker.quantity = 1;
        }
        
        this.basket$.next(currentBasket)
    }

    minusSneaker(id: string) {
        const currentBasket = this.basket$.value
       const sneaker = currentBasket.find(basket => basket.id === id);
       if(sneaker && sneaker.quantity > 1){
        sneaker.quantity --;
        this.basket$.next(currentBasket)
       } else {
         this.deleteSnickersFromBasket(id)
       }
      
    }

    plusSneaker(id: string) {
        let sneaker = this.basket$.value.find(basket => basket.id === id);
        if(sneaker){
         sneaker.quantity ++;
        }
     }

     getCalculatedPrice() {
        return this.basket$.value.length 
        ? this.basket$.value
        .map(sneaker => sneaker.quantity > 0 ? sneaker.price * sneaker.quantity : sneaker.price)
        .reduce((acc: number,item: number) =>acc += item)
        : 0
     }
}