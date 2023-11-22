import { LanguageService } from './services/language.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { takeUntil, take, Subject } from 'rxjs';
import { Language } from './types/header';
import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroments/enviroments';

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LanguageService]
 })
export class AppComponent {

  destroyed$ = new Subject();

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
  ) {
    this.languageService.$selectedCurrentInterfaceLanguage
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.switchLanguage.bind(this));
  }

  switchLanguage(language: Language) {
    this.translate.use(language);
  }

  ngOnDestroy() {
    this.destroyed$.complete();
  }
}
