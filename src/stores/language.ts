import { writable } from 'svelte/store';

export type Language = 'en' | 'es';

function createLanguageStore() {
  const { subscribe, set, update } = writable<Language>('en');

  return {
    subscribe,
    set,
    toggle: () => update(lang => lang === 'en' ? 'es' : 'en'),
    init: () => {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('language') as Language || 'en';
        set(saved);
        document.documentElement.setAttribute('data-lang', saved);
        document.documentElement.setAttribute('lang', saved === 'es' ? 'es' : 'en');
      }
    },
    save: (lang: Language) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', lang);
        document.documentElement.setAttribute('data-lang', lang);
        document.documentElement.setAttribute('lang', lang === 'es' ? 'es' : 'en');
      }
      set(lang);
    }
  };
}

export const language = createLanguageStore();
