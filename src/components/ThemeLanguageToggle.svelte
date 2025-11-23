<script lang="ts">
    import { onMount } from "svelte";
    import { language } from "../stores/language";
    import { t, type Language } from "../utils/translations";

    let theme: "light" | "dark" = "light";
    let currentLang: Language = "en";

    // Subscribe to language changes
    const unsubscribe = language.subscribe((value) => {
        currentLang = value;
    });

    onMount(() => {
        // Initialize theme
        const savedTheme =
            (localStorage.getItem("theme") as "light" | "dark") || "light";
        theme = savedTheme;
        document.documentElement.setAttribute("data-theme", theme);

        // Initialize language
        language.init();

        return () => {
            unsubscribe();
        };
    });

    const toggleTheme = () => {
        theme = theme === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    };

    const toggleLanguage = () => {
        const newLang = currentLang === "en" ? "es" : "en";
        language.save(newLang);
    };
</script>

<div class="toggles-container">
    <button
        class="toggle-btn theme-toggle"
        on:click={toggleTheme}
        aria-label={theme === "light"
            ? t("switchToDark", currentLang)
            : t("switchToLight", currentLang)}
        title={theme === "light"
            ? t("darkMode", currentLang)
            : t("lightMode", currentLang)}
    >
        <span class="icon">{theme === "light" ? "🌙" : "☀️"}</span>
    </button>

    <button
        class="toggle-btn lang-toggle"
        on:click={toggleLanguage}
        aria-label={currentLang === "en"
            ? t("switchToSpanish", currentLang)
            : t("switchToEnglish", currentLang)}
        title={currentLang === "en"
            ? t("spanish", currentLang)
            : t("english", currentLang)}
    >
        <span class="text">{currentLang === "en" ? "ES" : "EN"}</span>
    </button>
</div>

<style>
    .toggles-container {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .toggle-btn {
        background: transparent;
        border: 1px solid rgba(var(--text), 0.2);
        color: var(--text);
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        width: 40px;
        height: 40px;
    }

    .toggle-btn:hover {
        background: rgba(var(--primary), 0.1);
        border-color: var(--primary);
        color: var(--primary);
        transform: translateY(-2px);
    }

    .icon {
        font-size: 1.2rem;
    }

    .text {
        font-size: 0.9rem;
        font-weight: 700;
    }

    @media (max-width: 1023px) {
        .toggles-container {
            margin-top: 1rem;
            width: 100%;
            justify-content: flex-start;
            gap: 1rem;
        }

        .toggle-btn {
            width: auto;
            padding: 0.5rem 1rem;
            gap: 0.5rem;
        }

        .toggle-btn::after {
            content: attr(title);
            font-size: 0.9rem;
            font-weight: 500;
        }
    }
</style>
