import translationsEn from '../translations/en.json';

export const retrieveLang = function (langCode) {
  switch (langCode) {
    case 'En': {
      return translationsEn;
    }
    default: {
      return {};
    }
  }
}

