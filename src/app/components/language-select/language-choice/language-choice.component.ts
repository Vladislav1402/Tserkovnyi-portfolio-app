import { TranslateModule } from '@ngx-translate/core';
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { environment } from "../../../../enviroments/enviroments";
import { Language, LanguageOption } from "../../../types/header";
import { CommonModule } from '@angular/common';

@Component({
  selector: "lms-interface-language-choice",
  templateUrl: "./language-choice.component.html",
  styleUrls: ["./language-choice.component.scss"],
  standalone: true,
  imports:[TranslateModule, CommonModule]
})
export class InterfaceLanguageChoice {
  @Input() current?: Language = environment.__DEFAULTLANG__ as Language;
  @Input() languages: LanguageOption[] = [];
  @Output() changed: EventEmitter<Language> = new EventEmitter<Language>();

  // constructor(public languageService: LanguageService) {}

  handleSelect(id: Language) {
    this.current = id;
    // this.languageService.changeInterfaceLanguage(id);
    this.changed.emit(id);
  }
}
