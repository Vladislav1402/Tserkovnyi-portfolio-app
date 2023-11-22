import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RandomColors } from '../../random-colors/random-colors-overview/random-colors-overview.component';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio-overview.component.html',
    styleUrls: ['./portfolio-overview.component.scss'],
    standalone:true,
    imports: [RandomColors]
})

export class Portfolio {

    portfolioList: any[] = [
        {label: 'Random Colors App', link: 'randomColor'},
        {label: 'Robot List', link: 'robotList'}
    ]

    constructor(
        private router:Router
    ){}

    handleNavigate(link: string) {
        console.log('link', link);
        this.router.navigate([`/portfolio/${link}`])
    }
}