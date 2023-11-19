import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Header } from '../header-components/header/header.component';

@Component({
    selector: 'app-inner-wrapper',
    templateUrl: './inner-wrapper.component.html',
    styleUrls: ['./inner-wrapper.component.scss'],
    standalone:true,
    imports: [Header, RouterModule],
})

export class InnerWrapper implements OnInit {
    constructor() { }

    ngOnInit() { }
}