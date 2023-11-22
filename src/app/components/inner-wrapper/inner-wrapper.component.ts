import { TranslateModule } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Header } from '../header-components/header/header.component';

@Component({
    selector: 'app-inner-wrapper',
    templateUrl: './inner-wrapper.component.html',
    styleUrls: ['./inner-wrapper.component.scss'],
    standalone:true,
    imports: [Header, RouterModule, TranslateModule],
})

export class InnerWrapper implements OnInit {
    constructor() { }

    ngOnInit() { }
}