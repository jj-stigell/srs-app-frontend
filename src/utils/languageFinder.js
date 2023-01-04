import { constants } from './constants';

export const getTranslation = (allTranslations, language) => {
  // Try to find the translation for the specified language
  let translations = allTranslations.find(function(t) {
    return t.languageId === language;
  });

  // If the translation is not found, fall back to the default language "EN"
  if (!translations) {
    translations = allTranslations.find(function(t) {
      return t.languageId === constants.general.defaultLanguage;
    });
  }

  return translations;
};
