import { FurnitureCollection } from './../furniture-collection/furniture-collection.component';
import { Breadcrumbs } from './../breadcrumbs/breadcrumbs.component';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss'],
    standalone: true,
    imports: [Breadcrumbs, FurnitureCollection]
})

export class FurnitureGallery implements OnInit {
    constructor() { }

    ngOnInit() { }
}