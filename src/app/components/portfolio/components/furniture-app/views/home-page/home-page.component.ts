import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { FurnitureMain } from '../../components/main/furniture-main.component';

@Component({
    selector: 'app-furniture-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    standalone: true,
    imports: [CommonModule, FontAwesomeModule, FurnitureMain, RouterModule],
})

export class FurnitureHomePage {
    asideIsVisible = false;
    selectedCollection: string = "bedroom";
    isBurgerOpend = false;

    faArrowLeft = faArrowLeft

    constructor(private router: Router) {    }

    handleBack() {
        this.router.navigate(['/portfolio'])
    }

    toggleAside() {
        this.asideIsVisible = !this.asideIsVisible;
    }

}