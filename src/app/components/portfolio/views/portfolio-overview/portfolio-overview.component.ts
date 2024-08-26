import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
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
      { optional: true }
    )
  ])
]);

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio-overview.component.html',
  styleUrls: ['./portfolio-overview.component.scss'],
  standalone: true,
  imports: [RandomColors, CommonModule],
  animations: [listAnimation]
})

export class Portfolio {
  @ViewChild('items') items!: ElementRef;
  isInitialized = false;
  // gradient: string = 'red';

  portfolioList: any[] = [
    { label: "Sapper App", link: 'sapper' },
    { label: "Snickers Market", link: 'snickers' },
    { label: "Furniture App", link: 'furniture-app' },
    { label: 'Random Colors App', link: 'randomColor' },
    { label: 'Robot List', link: 'robotList' },
    { label: "Todo List", link: 'todo-list' },
  ]

  constructor(
    private router: Router,
    private renderer: Renderer2
  ) {}

  updateGradient(event: MouseEvent) {
    const element = (event.target as HTMLElement);
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.right - rect.left;
    const percent = (x / width) * 100; // Percentage of the element's width.

    const startPercent = `${percent}%`;
    const endPercent = `${(150 - percent)}%`;

    element.style.setProperty('--start-percent', startPercent);
    element.style.setProperty('--end-percent', endPercent);

  }

  handleNavigate(link: string) {
    this.router.navigate([`/portfolio/${link}`])
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isInitialized = true;
    });
  }
}