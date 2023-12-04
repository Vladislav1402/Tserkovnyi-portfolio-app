import { Breadcrumbs } from './../breadcrumbs/breadcrumbs.component';
import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
    selector: 'app-furniture-blog',
    templateUrl: './furniture-blog.component.html',
    styleUrls: ['./furniture-blog.component.scss'],
    standalone: true,
    imports: [Breadcrumbs]
})

export class FurnitureBlog implements OnInit {
    swiper: Swiper | undefined;
    constructor() { }

    ngOnInit() { }

    ngAfterViewInit() {
        this.swiper = new Swiper('.swiper', {
            slidesPerView: 1,
            spaceBetween: 10,
            loop: true

        })
    }

    slideNext() {
        if (this.swiper) {
          this.swiper.slideNext();
        }
      }
    
     slidePrev() {
        if (this.swiper) {
          this.swiper.slidePrev();
        }
      }
}