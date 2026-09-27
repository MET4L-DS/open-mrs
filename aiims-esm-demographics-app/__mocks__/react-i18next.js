module.exports = {
  useTranslation: () => ({
    t: (key, defaultValue, options) => {
      let str = typeof defaultValue === 'string' ? defaultValue : key;
      const opts = typeof defaultValue === 'object' && defaultValue !== null ? defaultValue : options;
      if (opts && typeof opts === 'object') {
        Object.entries(opts).forEach(([k, v]) => {
          str = str.replace(new RegExp(`{{${k}}}`, 'g'), String(v));
        });
      }
      return str;
    },
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
  Trans: ({ children }) => children,
};

