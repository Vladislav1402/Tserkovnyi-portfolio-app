import { Breadcrumbs } from './../breadcrumbs/breadcrumbs.component';
import { Component, OnInit } from '@angular/core';
import { Swiper } from 'swiper';

@Component({
    selector: 'app-furniture-contacts',
    templateUrl: './furniture-contacts.component.html',
    styleUrls: ['./furniture-contacts.component.scss'],
    standalone: true,
    imports: [Breadcrumbs]
})

export class FurnitureContacts  {
    ngAfterViewInit() {
        new Swiper('.swiper', {
            slidesPerView: 1,
            spaceBetween: 10,
            loop: true

        })
    }
}