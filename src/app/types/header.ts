export interface headerButton {
    name: string,
    link: string
}

export interface Robot {
    id: number,
    name: string,
    email: string
}

export type Language =
  | "en"
  | "es"
  | "po"
  | "fr"
  | "de"
  | "it"
  | "ko"
  | "jp"
  | "zh"
  | "th"
  | "nl"
  | "";

  export type LanguageOption = {
    label: string;
    id: Language;
    isDefault?: boolean;
  };
  
  export type LanguageServerOption = {
    language: Language;
    isDefault: boolean;
  };
  