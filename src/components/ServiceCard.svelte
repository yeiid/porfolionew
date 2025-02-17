<script lang="ts">
    export let title: string;
    export let icon: string;
    export let desc: string;
  </script>
  
  <div class="service-card">
    <div class="icon-wrapper">
      <span class="icon">{icon}</span>
    </div>
    <h3 class="title">{title}</h3>
    <p class="description">{desc}</p>
  </div>
  
  <style>
    .service-card {
      background: var(--bg);
      border: 1px solid rgba(var(--primary-rgb), 0.1);
      border-radius: 16px;
      padding: 2rem;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease-in-out;
    }
  
    .service-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(var(--primary-rgb), 0.2);
    }
  
    .icon-wrapper {
      margin-bottom: 1.5rem;
    }
  
    .icon {
      font-size: 3rem;
      display: inline-block;
      transition: transform 0.3s ease;
      will-change: transform;
    }
  
    /* Aplica el efecto hover al ícono cuando se pase el mouse sobre la tarjeta */
    .service-card:hover .icon {
      transform: rotate(15deg) scale(1.1);
    }
  
    .title {
      color: var(--primary);
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }
  
    .description {
      color: var(--text);
      opacity: 0.8;
      line-height: 1.6;
    }
  </style>
  