<script lang="ts">
  import { onMount } from 'svelte';
  
  let theme: 'light' | 'dark' = 'light';
  
  onMount(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    theme = savedTheme;
    document.documentElement.setAttribute('data-theme', theme);
  });
  
  const toggleTheme = () => {
    theme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };
</script>

<button on:click={toggleTheme} class="theme-switcher">
  {theme === 'light' ? '🌙' : '☀️'}
</button>

<style>
  .theme-switcher {
    position: fixed;
    top: 1.5rem;
    right: 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.8rem;
    transition: transform 0.3s ease;
    z-index: 9999;
  }
  
  .theme-switcher:hover {
    transform: rotate(15deg);
  }
</style>