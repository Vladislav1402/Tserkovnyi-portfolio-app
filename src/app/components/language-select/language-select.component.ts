import { LanguageService } from './../../services/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { InterfaceLanguageChoice } from './language-choice/language-choice.component';
import { CommonModule } from '@angular/common';
import { Component, Input } from "@angular/core";
import { Subject, take, takeUntil } from "rxjs";
import { environment } from "../../../enviroments/enviroments";
import { Languages } from "../../const/const";
import { Language, LanguageOption } from "../../types/header";

@Component({
  selector: "app-interface-language-menu",
  templateUrl: "./language-select.component.html",
  styleUrls: ["./language-select.component.scss"],
  standalone: true,
  imports: [CommonModule, InterfaceLanguageChoice]
})
export class InterfaceLanguageMenu {
  current: Language = environment.__DEFAULTLANG__ as Language;
  isOpen: boolean = false;
  languages: LanguageOption[] = Languages;
  destroy$ = new Subject();

  constructor(
    public languageService: LanguageService,
    // private userService: UserService
  ) {
    //   this.languageService.code
    //     .pipe(takeUntil(this.destroy$))
    //     .subscribe((code) => {
    //       this.current = code;
    //     });
  }

  onChanged(locale: Language) {
    this.isOpen = false;
    this.languageService.changeInterfaceLanguage(locale)
    this.current = locale
    // this.userService.setProfileLanguage(locale).pipe(take(1)).subscribe();
  }

  handleOpen() {
    this.isOpen = !this.isOpen;
  }

  ngOnDestroy() {
    this.destroy$.complete();
  }
}
