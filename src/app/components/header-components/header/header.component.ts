import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { headerButton } from '../../types/header';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone:true,
    animations: [
        trigger('trembleAnimation', [
            state('inActive', style({ transform: 'translateX(0)' })),
            transition('inActive => *', [ 
                animate('200ms ease-in', style({ transform: 'translateX(-20px)' })),
                animate('200ms ease-out', style({ transform: 'translateX(20px)' })),
                animate('200ms ease-in', style({ transform: 'translateX(-15px)' })),
                animate('200ms ease-out', style({ transform: 'translateX(15px)' })),
                animate('200ms ease-in', style({ transform: 'translateX(-10px)' })),
                animate('200ms ease-out', style({ transform: 'translateX(10px)' })),
                animate('200ms ease-in', style({ transform: 'translateX(-5px)' })),
                animate('200ms ease-out', style({ transform: 'translateX(3px)' })),
            ]),
        ])
    ],
    imports: [CommonModule]
})

export class Header  {
    @ViewChild('underline') underline!: ElementRef;
    @ViewChildren('Item') menuItemElements!: QueryList<ElementRef>;

    activeItem = 0;
    underlineState: string = 'inActive';

    constructor(
        private renderer: Renderer2,
        private router: Router
        ) {}

    headerButtons: headerButton[] = [
        { name: 'Main', state: 'inActive', link: '' },
        { name: 'Items', state: 'inActive', link: '' },
        { name: 'Portfolio', state: 'inActive', link: '/portfolio' }
    ];

    ngAfterViewInit() {
        this.activateItem(0)
    }

    activateItem(i: number) {
        this.activeItem = i
        this.headerButtons.forEach((item, index) => {
            item.state = index === i ? 'active' : 'inActive';
        });
        this.underlineState = 'inActive'

        const activeElement = this.underline?.nativeElement;
        const activeItemElement = this.menuItemElements.toArray()[i].nativeElement;

        this.renderer.setStyle(activeElement, 'left', activeItemElement?.offsetLeft + 'px');
        this.renderer.setStyle(activeElement, 'width', activeItemElement?.offsetWidth + 'px');
        this.router.navigate([this.headerButtons[i].link])
        console.log('link', this.headerButtons[i].link);
    }

    handleDone() {
        this.underlineState = 'active';
    }

}