<script lang="ts">
    export let name: string;
    export let icon: string;
    export let level: number;
  </script>
  
  <div class="skill-card">
    <div class="skill-header">
      <span class="icon">{icon}</span>
      <h3 class="skill-name">{name}</h3>
    </div>
    <div class="progress-bar">
      <div 
        class="progress-fill" 
        style={`width: ${level}%;`}
      ></div>
      <span class="percentage">{level}%</span>
    </div>
  </div>
  
  <style>
    .skill-card {
      background: var(--bg);
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
  
    .skill-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }
  
    .icon {
      font-size: 2rem;
    }
  
    .skill-name {
      margin: 0;
      font-size: 1.1rem;
      color: var(--text);
    }
  
    .progress-bar {
      height: 8px;
      background: rgba(var(--primary), 0.1);
      border-radius: 4px;
      position: relative;
    }
  
    .progress-fill {
      height: 100%;
      background: linear-gradient(to right, var(--primary), var(--secondary));
      border-radius: 4px;
      transition: width 0.5s ease;
    }
  
    .percentage {
      position: absolute;
      right: 0;
      top: -25px;
      font-size: 0.9rem;
      color: var(--text);
      opacity: 0.8;
    }
  </style>