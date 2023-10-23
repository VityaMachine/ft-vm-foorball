type LangStateType = "ua" | "en";

interface ILangProviderValue {
  language: LangStateType;
  changeLanguageHandler: (lang: LangStateType) => void;
}
