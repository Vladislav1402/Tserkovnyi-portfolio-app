import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs.component';

@Component({
    selector: 'app-furniture-about',
    templateUrl: './furniture-about.component.html',
    styleUrls: ['./furniture-about.component.scss'],
    standalone: true,
    imports: [RouterModule, Breadcrumbs]
})

export class FurnitureAbout implements OnInit {
    popupIsOpened = false
    
    constructor() { }


    ngOnInit() { }
}