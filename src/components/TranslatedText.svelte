<script lang="ts">
  import { language } from '../stores/language';
  import { t, type TranslationKey, type Language } from '../utils/translations';
  import { onMount } from 'svelte';
  
  export let key: TranslationKey;
  export let fallback: string = '';
  
  let currentLang: Language = 'en';
  
  onMount(() => {
    language.init();
  });
  
  language.subscribe((value: Language) => {
    currentLang = value;
  });
  
  $: translatedText = t(key, currentLang) || fallback;
</script>

{translatedText}
