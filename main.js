// عناصر بسيطة
document.addEventListener("DOMContentLoaded", function () {
  // سنة في الفوتر
  const yearEls = ["year", "year2", "year3", "year4"];
  yearEls.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = new Date().getFullYear();
  });

  // تحويل النقر على صندوق القصة إلى الانتقال للصفحة
  document.querySelectorAll(".story-box").forEach((box) => {
    const link = box.dataset.link;
    if (link) {
      box.addEventListener("click", () => {
        // انيميشن صغير قبل الانتقال
        box.classList.add("pressed");
        setTimeout(() => {
          window.location.href = link;
        }, 160);
      });

      // تأثير ripple عند النقر
      box.addEventListener("mousedown", (e) => {
        const ripple = document.createElement("span");
        ripple.className = "ripple";
        box.appendChild(ripple);
        const rect = box.getBoundingClientRect();
        ripple.style.left = e.clientX - rect.left + "px";
        ripple.style.top = e.clientY - rect.top + "px";
        setTimeout(() => ripple.remove(), 600);
      });
    }
  });

  // Toggle menu mobile
  const toggle = document.getElementById("menuToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const nav = document.querySelector(".main-nav");
      if (!nav) return;
      if (nav.style.display === "flex") nav.style.display = "";
      else nav.style.display = "flex";
    });
  }

  // نجوم متحركة إضافية (خفة)
  createFloatingStars();

  // تحريك خفيف للعناصر عند الظهور
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("animate-in");
      });
    },
    { threshold: 0.12 }
  );

  document
    .querySelectorAll(".story-box, .card, .story-article")
    .forEach((el) => observer.observe(el));
});

/* توليد نجوم صغيرة متحركة */
function createFloatingStars() {
  const container = document.getElementById("starfield");
  if (!container) return;
  const count = 30;
  for (let i = 0; i < count; i++) {
    const s = document.createElement("div");
    s.className = "tiny-star";
    const size = Math.random() * 3 + 1;
    s.style.width = s.style.height = size + "px";
    s.style.position = "absolute";
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 100 + "%";
    s.style.opacity = Math.random() * 0.8 + 0.2;
    s.style.borderRadius = "50%";
    s.style.background = "rgba(255,255,255,0.9)";
    s.style.filter = "blur(0.6px)";
    s.style.transform = `translateY(0)`;
    s.style.animation = `starDrift ${Math.random() * 30 + 10}s linear infinite`;
    container.appendChild(s);
  }

  // style animation via JS to avoid extra css file edits
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes starDrift {
      from { transform: translateY(0) translateX(0) }
      50% { transform: translateY(-80px) translateX(20px) }
      to { transform: translateY(0) translateX(0) }
    }
    .ripple {
      position:absolute;
      width:10px;height:10px;border-radius:50%;
      background: rgba(255,255,255,0.12);
      transform: translate(-50%,-50%);
      pointer-events:none;
      animation: rippleAnim .6s ease-out;
    }
    @keyframes rippleAnim {
      from { width:8px;height:8px; opacity:0.7; transform:translate(-50%,-50%) scale(1) }
      to { width:160px;height:160px; opacity:0; transform:translate(-50%,-50%) scale(1.2) }
    }
  `;
  document.head.appendChild(style);
}
