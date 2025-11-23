<script lang="ts">
    import { onMount } from 'svelte';
    import { language } from '../stores/language';
    import { t, type Language } from '../utils/translations';
    import emailjs from '@emailjs/browser';
    import confetti from 'canvas-confetti';
    
    let name = '';
    let email = '';
    let message = '';
    let isSubmitting = false;
    let submitSuccess = false;
    let submitError = '';
    let currentLang: Language = 'en';
    let formElement: HTMLFormElement;
    
    // EmailJS Configuration from Environment Variables
    const SERVICE_ID = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY;
    
    language.subscribe(value => {
        currentLang = value;
    });

    const triggerConfetti = () => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const random = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            
            confetti({ ...defaults, particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };
  
    const handleSubmit = async () => {
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
          submitError = 'EmailJS configuration is missing. Please check your .env file.';
          console.error('Missing EmailJS keys:', { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY });
          return;
      }

      isSubmitting = true;
      submitError = '';
      
      try {
        await emailjs.sendForm(
            SERVICE_ID,
            TEMPLATE_ID,
            formElement,
            PUBLIC_KEY
        );
        
        submitSuccess = true;
        triggerConfetti();
        name = '';
        email = '';
        message = '';
        
        setTimeout(() => {
            submitSuccess = false;
        }, 5000);
      } catch (error) {
        console.error('EmailJS Error:', error);
        submitError = t('contactError', currentLang) || 'Error sending message. Please try again.';
      } finally {
        isSubmitting = false;
      }
    };
  </script>
  
  <form 
    bind:this={formElement}
    on:submit|preventDefault={handleSubmit} 
    class="contact-form"
  >
    <div class="form-group">
      <div class="input-wrapper">
        <input
          id="name"
          name="user_name"
          type="text"
          bind:value={name}
          required
          class="form-input"
          placeholder=" "
        />
        <label for="name" class="floating-label">{t('contactName', currentLang)}</label>
      </div>
    </div>
    
    <div class="form-group">
      <div class="input-wrapper">
        <input
          id="email"
          name="user_email"
          type="email"
          bind:value={email}
          required
          class="form-input"
          placeholder=" "
        />
        <label for="email" class="floating-label">{t('contactEmail', currentLang)}</label>
      </div>
    </div>
    
    <div class="form-group">
      <div class="input-wrapper">
        <textarea
          id="message"
          name="message"
          bind:value={message}
          required
          class="form-input textarea"
          rows="5"
          placeholder=" "
        ></textarea>
        <label for="message" class="floating-label">{t('contactMessage', currentLang)}</label>
      </div>
    </div>
    
    {#if submitSuccess}
      <div class="success-message" role="alert">
        <span class="icon">✅</span>
        {t('contactSuccess', currentLang) || 'Message sent successfully!'}
      </div>
    {:else if submitError}
      <div class="error-message" role="alert">
        <span class="icon">❌</span>
        {submitError}
      </div>
    {/if}
    
    <button
      type="submit"
      class="submit-button"
      disabled={isSubmitting}
    >
      {#if isSubmitting}
        <span class="spinner"></span>
        {t('contactSending', currentLang) || 'Sending...'}
      {:else}
        {t('contactSend', currentLang)}
        <span class="icon">✈️</span>
      {/if}
    </button>
  </form>
  
  <style>
    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      background: rgba(var(--bg), 0.6);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      padding: 2.5rem;
      border-radius: 24px;
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(var(--text), 0.05);
      position: relative;
      overflow: hidden;
    }

    /* Glass gradient effect */
    .contact-form::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
        pointer-events: none;
        z-index: 0;
    }

    .form-group {
      position: relative;
      z-index: 1;
    }

    .input-wrapper {
        position: relative;
    }
    
    .form-input {
      width: 100%;
      padding: 1rem 1.25rem;
      border: 1px solid rgba(var(--text), 0.1);
      border-radius: 12px;
      background: rgba(var(--bg), 0.5);
      color: var(--text);
      transition: all 0.3s ease;
      font-family: inherit;
      font-size: 1rem;
      outline: none;
    }

    .textarea {
        resize: vertical;
        min-height: 120px;
    }
    
    .form-input:focus {
      border-color: var(--primary);
      background: rgba(var(--bg), 0.8);
      box-shadow: 0 0 0 4px rgba(var(--primary), 0.1);
    }

    /* Floating Label */
    .floating-label {
        position: absolute;
        left: 1rem;
        top: 1rem;
        padding: 0 0.25rem;
        color: var(--text);
        opacity: 0.6;
        font-size: 1rem;
        pointer-events: none;
        transition: all 0.3s ease;
        background: transparent;
    }

    .form-input:focus + .floating-label,
    .form-input:not(:placeholder-shown) + .floating-label {
        top: -0.6rem;
        left: 0.8rem;
        font-size: 0.8rem;
        opacity: 1;
        color: var(--primary);
        background: var(--bg);
        font-weight: 600;
    }
    
    .submit-button {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      background: var(--primary);
      color: white;
      padding: 1rem 2rem;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      font-weight: 600;
      font-size: 1.1rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      margin-top: 0.5rem;
      overflow: hidden;
    }

    .submit-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(rgba(255,255,255,0.2), transparent);
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .submit-button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px -5px rgba(var(--primary), 0.4);
    }

    .submit-button:hover:not(:disabled)::before {
        opacity: 1;
    }
    
    .submit-button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
      filter: grayscale(0.5);
    }

    .success-message, .error-message {
      position: relative;
      z-index: 1;
      padding: 1rem;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 500;
      animation: slideIn 0.3s ease;
    }
    
    .success-message {
      background: rgba(16, 185, 129, 0.1);
      color: #059669;
      border: 1px solid rgba(16, 185, 129, 0.2);
    }
    
    .error-message {
      background: rgba(239, 68, 68, 0.1);
      color: #dc2626;
      border: 1px solid rgba(239, 68, 68, 0.2);
    }

    @keyframes slideIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .spinner {
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    @media (max-width: 640px) {
        .contact-form {
            padding: 1.5rem;
        }
    }
  </style>