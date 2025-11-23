<script lang="ts">
    import { onMount } from "svelte";
    import { language } from "../stores/language";
    import { t, type Language } from "../utils/translations";

    let currentLang: Language = "en";
    let visible = false;

    language.subscribe((value) => {
        currentLang = value;
    });

    const toggleBackToTop = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

        if (scrollPercentage > 0.7 || scrollTop > 500) {
            visible = true;
        } else {
            visible = false;
        }
    };

    onMount(() => {
        window.addEventListener("scroll", toggleBackToTop);
        toggleBackToTop();

        return () => {
            window.removeEventListener("scroll", toggleBackToTop);
        };
    });
</script>

<a
    href="#top"
    class="back-to-top"
    class:visible
    aria-label={t("backToTop", currentLang)}
>
    ↑
</a>

<style>
    .back-to-top {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--primary);
        color: white;
        text-decoration: none;
        font-size: 1.5rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1000;
        font-weight: bold;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
    }

    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }

    .back-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(var(--primary), 0.4);
        background: var(--secondary);
    }

    @media (max-width: 768px) {
        .back-to-top {
            bottom: 1.5rem;
            right: 1.5rem;
            width: 45px;
            height: 45px;
            font-size: 1.3rem;
        }
    }
</style>
