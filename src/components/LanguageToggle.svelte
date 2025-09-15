<script lang="ts">
  import { language } from '../stores/language';
  import { onMount } from 'svelte';
  
  let currentLang = 'en';
  
  language.subscribe(value => {
    currentLang = value;
  });
  
  function toggleLanguage() {
    const newLang = currentLang === 'en' ? 'es' : 'en';
    language.save(newLang);
  }
  
  onMount(() => {
    language.init();
  });
</script>

<button 
  class="language-toggle" 
  on:click={toggleLanguage}
  aria-label="Toggle language"
>
  <span class="flag">{currentLang === 'en' ? '🇪🇸' : '🇺🇸'}</span>
  <span class="text">{currentLang === 'en' ? 'ES' : 'EN'}</span>
</button>

<style>
  .language-toggle {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 50px;
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    font-size: 1rem;
  }

  .language-toggle:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.25);
    background: var(--secondary);
  }

  .flag {
    font-size: 1.3rem;
  }

  .text {
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  @media (max-width: 768px) {
    .language-toggle {
      bottom: 1.5rem;
      right: 1.5rem;
      padding: 0.8rem 1.2rem;
    }
    
    .flag {
      font-size: 1.1rem;
    }
    
    .text {
      font-size: 0.9rem;
    }
  }
</style>
