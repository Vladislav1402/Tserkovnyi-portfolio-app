import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Languages } from "../const/const";
import { Language, LanguageServerOption } from "../types/header";

@Injectable({
    providedIn:'root'
})
export class LanguageService {
  currentInterfaceLanguage$ = new Subject<Language>();
  $selectedCurrentInterfaceLanguage =
    this.currentInterfaceLanguage$.asObservable();

//   constructor(private localDataService: LocalDataService) {}

  changeInterfaceLanguage(data: Language) {
    this.currentInterfaceLanguage$.next(data);
    // this.localDataService.setData("InterfaceLang", data);
  }

  get code() {
    return this.$selectedCurrentInterfaceLanguage;
  }

  toLanguagesOptions(data: LanguageServerOption[]) {
    const langOptions = data.map((l) => ({
      id: l.language,
      isDefault: l.isDefault,
      label: Languages.find((lang:any) => lang.id === l.language)?.label || "Empty",
    }));

    return langOptions;
  }
}
