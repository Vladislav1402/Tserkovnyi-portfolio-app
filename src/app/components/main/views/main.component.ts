import { TranslateModule } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    standalone:true,
    imports: [TranslateModule]
})

export class Main implements OnInit {
    constructor() { }

    ngOnInit() { }
}