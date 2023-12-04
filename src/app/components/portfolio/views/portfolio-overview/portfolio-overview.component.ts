import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RandomColors } from '../../random-colors/random-colors-overview/random-colors-overview.component';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

// For animation from left to right
// const listAnimation = trigger('listAnimation', [
//     transition('* <=> *', [
//      query(':enter',
//        [
//          style({ opacity: 0, transform: 'translateX(-100%)' }),
//          stagger('60ms', animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })))
//        ],
//        { optional: true }
//      ),
//      query(':leave',
//        animate('300ms', style({ opacity: 0 })),
//        { optional: true }
//      )
//     ])
//    ]);

  const listAnimation = trigger('listAnimation', [
    transition('* <=> *', [
      query(':enter',
        [
            style({ opacity: 0 }), stagger('60ms', animate('600ms ease-out', style({ opacity: 1 })))]
            ,
        { optional: true }
      ),
      query(':leave',
        animate('300ms', style({ opacity: 0 })),
        { optional: true}
      )
    ])
  ]);

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio-overview.component.html',
    styleUrls: ['./portfolio-overview.component.scss'],
    standalone:true,
    imports: [RandomColors, CommonModule],
    animations: [ listAnimation]
})

export class Portfolio {
    isInitialized = false;

    portfolioList: any[] = [
        {label: 'Random Colors App', link: 'randomColor'},
        {label: 'Robot List', link: 'robotList'},
        {label: "Todo List", link: 'todo-list' },
        {label: "Furniture App", link: 'furniture-app'},
        
    ]

    constructor(
        private router:Router
    ){}

    handleNavigate(link: string) {
        console.log('link', link);
        this.router.navigate([`/portfolio/${link}`])
    }

    ngAfterViewInit() {
        setTimeout(() => {
          this.isInitialized = true;
        });
    }
}