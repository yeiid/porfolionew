<script lang="ts">
  import { onMount } from 'svelte';
  import { language, type Language } from '../stores/language';
  import { t, type TranslationKey } from '../utils/translations';

  interface ProjectItem {
    id: string;
    title: string;
    image: string;
    descKey: TranslationKey;
    link: string;
    github?: string;
    technologies: string[];
    category: 'ai' | 'saas' | 'local-first' | 'systems';
    badgeKey?: TranslationKey;
    isFounder?: boolean;
    isHighlight?: boolean;
  }

  let currentLang: Language = 'en';

  onMount(() => {
    language.init();
  });

  language.subscribe((value: Language) => {
    currentLang = value;
  });

  const categories: { id: string; labelKey: TranslationKey }[] = [
    { id: 'all', labelKey: 'filterAll' },
    { id: 'ai', labelKey: 'filterAI' },
    { id: 'saas', labelKey: 'filterSaas' },
    { id: 'local-first', labelKey: 'filterLocalFirst' },
    { id: 'systems', labelKey: 'filterSystems' },
  ];

  let selectedCategory: string = 'all';

  const projects: ProjectItem[] = [
    {
      id: 'neuraljira',
      title: 'NeuralJIRA Studio',
      image: '/neuraljira-tech.jpg',
      descKey: 'projectNeuraljiraDesc',
      link: 'https://neuraljira.tech',
      technologies: ['Astro', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      category: 'saas',
      badgeKey: 'founderProject',
      isFounder: true,
      isHighlight: true,
    },
    {
      id: 'inventario-adn',
      title: 'Inventario ADN 3D',
      image: '/inventario-adn.jpg',
      descKey: 'projectInventarioAdnDesc',
      link: 'https://web.neuraljira.tech/',
      technologies: ['SaaS Multi-Tenant', 'Three.js 3D', 'PWA', 'TypeScript', 'PostgreSQL'],
      category: 'saas',
      badgeKey: 'featuredProject',
      isHighlight: true,
    },
    {
      id: 'llamacpp-cluster',
      title: 'Cluster llama.cpp RPC',
      image: '/llamacpp-cluster.jpg',
      descKey: 'projectLlamaClusterDesc',
      link: 'https://github.com/yeiid',
      github: 'https://github.com/yeiid',
      technologies: ['llama.cpp', 'RPC Cluster', 'Edge AI', 'Linux x86/ARM', 'Android Termux'],
      category: 'ai',
      badgeKey: 'edgeAiProject',
      isHighlight: true,
    },
    {
      id: 'jvsd-pos',
      title: 'JVSD POS & KDS',
      image: '/jvsd-pos.jpg',
      descKey: 'projectJvsdPosDesc',
      link: '#',
      technologies: ['Local-First', 'WebSockets', 'KDS Real-Time', 'Node.js', 'SQLite'],
      category: 'local-first',
      badgeKey: 'offlineFirstProject',
    },
    {
      id: 'gymtrack-go',
      title: 'GymTrack & Go License Server',
      image: '/gymtrack-go.jpg',
      descKey: 'projectGymtrackGoDesc',
      link: 'https://demo-html-five.vercel.app/',
      technologies: ['Go (Golang)', 'Ed25519 Cripto', 'Python / Flask', 'Offline Validation', 'SQLite'],
      category: 'systems',
    },
    {
      id: 'luzcomunidad',
      title: 'LuzComunidad 3D',
      image: '/luzcomunidad.jpg',
      descKey: 'projectLuzComunidadDesc',
      link: '#',
      technologies: ['Go', 'Vite', 'PWA Local-First', '3D Digital Twin', 'Tailwind CSS'],
      category: 'local-first',
    },
    {
      id: 'ecoraices',
      title: 'EcoRaíces',
      image: '/ecoraices-web.png',
      descKey: 'projectEcoraicesDesc',
      link: 'https://ecoraices-proyect.vercel.app/',
      technologies: ['Next.js', 'React', 'Prisma', 'SQLite', 'NextAuth'],
      category: 'saas',
    },
  ];

  function setCategory(id: string) {
    selectedCategory = id;
  }

  $: filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);
</script>

<div class="projects-container">
  <!-- Filter Navigation Tabs -->
  <div class="filter-bar" role="tablist" aria-label="Filtrar proyectos">
    {#each categories as cat}
      <button
        type="button"
        role="tab"
        aria-selected={selectedCategory === cat.id}
        class="filter-btn {selectedCategory === cat.id ? 'active' : ''}"
        on:click={() => setCategory(cat.id)}
      >
        <span class="btn-text">{t(cat.labelKey, currentLang)}</span>
        <span class="count-badge">
          {cat.id === 'all' 
            ? projects.length 
            : projects.filter(p => p.category === cat.id).length}
        </span>
      </button>
    {/each}
  </div>

  <!-- Projects Grid -->
  <div class="projects-grid">
    {#each filteredProjects as project (project.id)}
      <article class="project-card {project.isFounder ? 'founder-card' : ''} {project.isHighlight ? 'highlight-card' : ''}">
        {#if project.badgeKey}
          <div class="badge {project.isFounder ? 'founder-badge' : 'highlight-badge'}">
            {t(project.badgeKey, currentLang)}
          </div>
        {/if}

        <figure class="card-media">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            class="project-img"
          />
          <div class="media-overlay"></div>
        </figure>

        <div class="card-body">
          <header class="card-header">
            <h3 class="project-title">{project.title}</h3>
          </header>

          <div class="tech-tags">
            {#each project.technologies as tech}
              <span class="tech-tag">{tech}</span>
            {/each}
          </div>

          <p class="project-desc">
            {t(project.descKey, currentLang)}
          </p>

          <div class="card-actions">
            {#if project.link && project.link !== '#'}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                class="action-btn primary-btn"
              >
                <span>{t('viewProject', currentLang)}</span>
                <svg viewBox="0 0 20 20" fill="currentColor" class="btn-icon">
                  <path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clip-rule="evenodd" />
                </svg>
              </a>
            {/if}

            {#if project.github}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                class="action-btn secondary-btn"
                title="GitHub"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" class="btn-icon">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>Code</span>
              </a>
            {/if}
          </div>
        </div>
      </article>
    {/each}
  </div>
</div>

<style>
  .projects-container {
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 1rem;
  }

  /* Filter Bar */
  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 3rem;
  }

  .filter-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.25rem;
    background: var(--panel);
    border: 1px solid var(--border);
    color: var(--text);
    border-radius: 9999px;
    font-size: 0.9rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.25s ease;
  }

  .filter-btn:hover {
    border-color: var(--accent);
    color: var(--white);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(var(--accent-rgb), 0.15);
  }

  .filter-btn.active {
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%);
    border-color: transparent;
    color: var(--ink);
    box-shadow: 0 4px 16px rgba(var(--accent-rgb), 0.35);
  }

  .count-badge {
    background: rgba(var(--ink-rgb), 0.2);
    padding: 0.15rem 0.5rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 700;
  }

  .filter-btn:not(.active) .count-badge {
    background: rgba(var(--text-rgb), 0.1);
    color: var(--muted);
  }

  /* Grid */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
  }

  /* Cards */
  .project-card {
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease;
  }

  .project-card:hover {
    transform: translateY(-6px);
    border-color: rgba(var(--electric-rgb), 0.4);
    box-shadow: 0 16px 32px rgba(var(--ink-rgb), 0.6), 0 0 20px rgba(var(--electric-rgb), 0.15);
  }

  .project-card.founder-card {
    border-color: rgba(var(--accent-rgb), 0.4);
    background: linear-gradient(180deg, rgba(var(--panel-rgb), 1) 0%, rgba(var(--accent-rgb), 0.05) 100%);
  }

  .project-card.founder-card:hover {
    border-color: var(--accent);
    box-shadow: 0 16px 36px rgba(var(--ink-rgb), 0.7), 0 0 24px rgba(var(--accent-rgb), 0.25);
  }

  .badge {
    position: absolute;
    top: 14px;
    right: 14px;
    padding: 0.35rem 0.8rem;
    border-radius: 20px;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    z-index: 10;
    backdrop-filter: blur(8px);
  }

  .founder-badge {
    background: var(--accent);
    color: var(--ink);
    box-shadow: 0 2px 8px rgba(var(--accent-rgb), 0.4);
  }

  .highlight-badge {
    background: rgba(var(--electric-rgb), 0.9);
    color: var(--ink);
    box-shadow: 0 2px 8px rgba(var(--electric-rgb), 0.4);
  }

  /* Media */
  .card-media {
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    position: relative;
    background: var(--deep);
    margin: 0;
  }

  .project-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    display: block;
  }

  .project-card:hover .project-img {
    transform: scale(1.05);
  }

  .media-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 60%, rgba(var(--panel-rgb), 0.9) 100%);
    pointer-events: none;
  }

  /* Card Body */
  .card-body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 0.85rem;
  }

  .project-title {
    font-size: 1.35rem;
    color: var(--white);
    margin: 0;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .tech-tag {
    background: rgba(var(--electric-rgb), 0.12);
    color: var(--electric);
    border: 1px solid rgba(var(--electric-rgb), 0.25);
    padding: 0.2rem 0.55rem;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .project-desc {
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--text);
    margin: 0;
    flex-grow: 1;
  }

  /* Actions */
  .card-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 0.5rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--border);
  }

  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 0.9rem;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .primary-btn {
    background: var(--accent);
    color: var(--ink);
  }

  .primary-btn:hover {
    background: var(--accent2);
    transform: translateX(2px);
  }

  .secondary-btn {
    background: rgba(var(--text-rgb), 0.1);
    color: var(--text);
    border: 1px solid var(--border);
  }

  .secondary-btn:hover {
    color: var(--white);
    border-color: var(--text);
  }

  .btn-icon {
    width: 1rem;
    height: 1rem;
  }

  @media (max-width: 640px) {
    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
