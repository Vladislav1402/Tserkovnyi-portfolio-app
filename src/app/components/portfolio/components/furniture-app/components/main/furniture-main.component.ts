import { FurnitureCollection } from './../furniture-collection/furniture-collection.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import Swiper from 'swiper';

@Component({
    selector: 'app-furniture-main',
    templateUrl: './furniture-main.component.html',
    styleUrls: ['./furniture-main.component.scss'],
    standalone: true,
    imports: [CommonModule, FontAwesomeModule, FurnitureCollection],
})

export class FurnitureMain  {

    ngAfterViewInit() {
        new Swiper('.swiper', {
            slidesPerView: 1,
            spaceBetween: 10,
            loop: true

        })
    }
}