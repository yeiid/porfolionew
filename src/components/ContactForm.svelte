<script lang="ts">
    let name = '';
    let email = '';
    let message = '';
    let isSubmitting = false;
    let submitSuccess = false;
    let submitError = '';
  
    const handleSubmit = async () => {
      isSubmitting = true;
      submitError = '';
      
      try {
        // Aquí iría tu lógica de envío
        await new Promise(resolve => setTimeout(resolve, 1000));
        submitSuccess = true;
        name = '';
        email = '';
        message = '';
      } catch (error) {
        submitError = 'Error al enviar el mensaje. Inténtalo de nuevo.';
      } finally {
        isSubmitting = false;
      }
    };
  </script>
  
  <form on:submit|preventDefault={handleSubmit} class="contact-form">
    <div class="form-group">
      <label for="name">Nombre</label>
      <input
        id="name"
        type="text"
        bind:value={name}
        required
        class="form-input"
      />
    </div>
    
    <div class="form-group">
      <label for="email">Email</label>
      <input
        id="email"
        type="email"
        bind:value={email}
        required
        class="form-input"
      />
    </div>
    
    <div class="form-group">
      <label for="message">Mensaje</label>
      <textarea
        id="message"
        bind:value={message}
        required
        class="form-input"
        rows="5"
      ></textarea>
    </div>
    
    {#if submitSuccess}
      <div class="success-message">✅ Mensaje enviado correctamente!</div>
    {:else if submitError}
      <div class="error-message">{submitError}</div>
    {/if}
    
    <button
      type="submit"
      class="submit-button"
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
    </button>
  </form>
  
  <style>
    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .form-input {
      padding: 0.8rem;
      border: 1px solid rgba(var(--primary), 0.2);
      border-radius: 8px;
      background: var(--bg);
      color: var(--text);
      transition: border-color 0.3s ease;
    }
    
    .form-input:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 2px rgba(var(--primary), 0.1);
    }
    
    .submit-button {
      background: var(--primary);
      color: white;
      padding: 1rem 2rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: transform 0.2s ease;
    }
    
    .submit-button:hover {
      transform: translateY(-2px);
    }
    
    .submit-button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    
    .success-message {
      color: var(--accent);
      padding: 1rem;
      text-align: center;
    }
    
    .error-message {
      color: #ef4444;
      padding: 1rem;
      text-align: center;
    }
  </style>