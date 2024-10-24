import kurdish from "@/assets/languages/kurdish.json";
import arabic from "@/assets/languages/arabic.json";
import english from "@/assets/languages/english.json";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en: english,
    kr: kurdish,
    ar: arabic,
  },
}));
