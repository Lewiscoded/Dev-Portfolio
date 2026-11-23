const particles = document.querySelector(".particles");

for (let i = 0; i < 70; i++) {
    const span = document.createElement("span");

    span.style.setProperty("--x", Math.random() * 100 + "vw");

    span.style.setProperty("--y", Math.random() * 100 + "vh");

    span.style.setProperty("--size", 1 + Math.random() * 3 + "px");

    span.style.setProperty("--opacity", 0.08 + Math.random() * 0.25);

    span.style.setProperty("--speed", 6 + Math.random() * 12 + "s");

    span.style.animationDelay = Math.random() * 2 + "s";

    particles.appendChild(span);
}

/* ===== Vibe Coded Games: arcade card tilt + hi-score ===== */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll(".game-card").forEach((card) => {
    if (reduceMotion) return;

    card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });
});

// Hi-score: counts up as you scroll to the section, +1000 every time you press Play
const hiScoreEl = document.getElementById("hiScore");
if (hiScoreEl) {
    let score = 0;
    try {
        score = parseInt(localStorage.getItem("arcadeHiScore"), 10) || 0;
    } catch (e) { }

    const base = 13370 + score;
    const render = (n) => (hiScoreEl.textContent = String(n).padStart(6, "0"));

    const countUp = () => {
        const start = performance.now();
        const step = (t) => {
            const p = Math.min((t - start) / 1200, 1);
            render(Math.floor(base * p));
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    const games = document.getElementById("games");
    if ("IntersectionObserver" in window && games) {
        const io = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                countUp();
                io.disconnect();
            }
        }, { threshold: 0.3 });
        io.observe(games);
    } else {
        render(base);
    }

    document.querySelectorAll(".game-card a").forEach((a) => {
        a.addEventListener("click", () => {
            score += 1000;
            try {
                localStorage.setItem("arcadeHiScore", score);
            } catch (e) { }
            render(13370 + score);
        });
    });
}