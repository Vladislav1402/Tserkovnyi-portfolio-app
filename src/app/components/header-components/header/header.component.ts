import { LanguageService } from './../../../services/language.service';
import { Subject, takeUntil } from 'rxjs';
import { InterfaceLanguageMenu } from './../../language-select/language-select.component';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { headerButton } from '../../../types/header';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
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
    imports: [CommonModule, TranslateModule, InterfaceLanguageMenu]
})

export class Header {
    @ViewChild('underline') underline!: ElementRef;
    @ViewChildren('Item') menuItemElements!: QueryList<ElementRef>;

    activeItem = 0;
    underlineState: string = 'inActive';
    translatedHeaderButtons: headerButton[] = [];
    destroy$ = new Subject();

    headerButtons: headerButton[] = [
        { name: "header-main", link: 'main' },
        { name: "header-items", link: 'items' },
        { name: "header-portfolio", link: 'portfolio' }
    ];

    constructor(
        private renderer: Renderer2,
        private router: Router,
        private translate: TranslateService,
        private langService: LanguageService
    ) {
        this.langService.currentInterfaceLanguage$
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.setInitialState(this.activeItem))
    }

    getTranslatedName(name: string): string {
        return this.translate.instant(name);
    }

    ngAfterViewInit(): void {
        this.headerButtons.forEach((btn, index) =>
            btn.link === `${this.router.url.split("/")[1]}`
                ? this.activeItem = index
                : '')
        this.setInitialState(this.activeItem);
    }

    setInitialState(i: number) {
        console.log('i', i);
        const activeElement = this.underline?.nativeElement;
        const activeItemElement = this.menuItemElements?.toArray()[i].nativeElement;

        setTimeout(() => {
            this.renderer?.setStyle(activeElement, 'left', activeItemElement?.offsetLeft + 'px');
            this.renderer?.setStyle(activeElement, 'width', activeItemElement?.offsetWidth + 'px');
        }, 10);
    }

    activateItem(i: number) {
        this.underlineState = 'active';
        this.activeItem = i;
        this.setInitialState(i)
        this.router.navigate([this.headerButtons[i].link])
    }

    isActive(link: string) {
        return link === `${this.router.url.split("/")[1]}`;
    }

    handleDone() {
        this.underlineState = 'inActive'
    }

}