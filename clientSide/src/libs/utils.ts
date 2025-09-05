import useStore from "../store";

export const useTextLang = (englishText, nepaliText) => {
  const language = useStore((state) => state.language);
  return language === "en" ? englishText : nepaliText;
};
