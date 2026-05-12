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