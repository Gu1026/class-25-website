/**
 * 九年级25班官网交互脚本
 * 仅使用原生 JavaScript，无第三方依赖。
 */

document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector("#site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const siteMenu = document.querySelector("#site-menu");
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const sections = [...document.querySelectorAll("main .section[id]")];
  const revealItems = [...document.querySelectorAll(".reveal")];
  const heroArt = document.querySelector(".hero-art");
  const daysElement = document.querySelector("#days-together");
  const fixedCounter = document.querySelector('[data-counter="52"]');

  // 使用 UTC 日期值计算，避免夏令时造成一天的误差。
  const startDate = Date.UTC(2024, 8, 1);
  const today = new Date();
  const todayDate = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const daysTogether = Math.max(0, Math.floor((todayDate - startDate) / 86_400_000));

  daysElement.dataset.counter = String(daysTogether);
  daysElement.setAttribute("aria-label", `共同奋斗 ${daysTogether} 天`);

  /** 打开或关闭移动端菜单。 */
  const setMenu = (open) => {
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "关闭导航菜单" : "打开导航菜单");
    siteMenu.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  };

  menuButton.addEventListener("click", () => {
    setMenu(menuButton.getAttribute("aria-expanded") !== "true");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) setMenu(false);
  });

  /** 导航栏滚动状态与轻量首屏视差。 */
  let scrollTicking = false;
  const updateOnScroll = () => {
    const scrollY = window.scrollY;
    header.classList.toggle("is-scrolled", scrollY > 24);

    if (!reduceMotion && window.innerWidth > 820 && heroArt && scrollY < window.innerHeight) {
      heroArt.style.transform = `translate3d(0, ${Math.min(scrollY * 0.08, 55)}px, 0) scale(1.02)`;
    }

    scrollTicking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(updateOnScroll);
        scrollTicking = true;
      }
    },
    { passive: true },
  );
  updateOnScroll();

  /** 根据当前可见模块高亮导航。 */
  const setActiveLink = (sectionId) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${sectionId}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  };

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveLink(visible[0].target.id);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.05, 0.2] },
    );
    sections.forEach((section) => sectionObserver.observe(section));
  }

  /** 元素进入视口时柔和出现。 */
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  /** 数字增长动画。 */
  const animateCounter = (element) => {
    if (!element || element.dataset.animated === "true") return;
    element.dataset.animated = "true";

    const target = Number(element.dataset.counter || 0);
    if (reduceMotion || target === 0) {
      element.textContent = target.toLocaleString("zh-CN");
      return;
    }

    const duration = 1300;
    const startTime = performance.now();
    const draw = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      element.textContent = Math.round(target * eased).toLocaleString("zh-CN");
      if (progress < 1) window.requestAnimationFrame(draw);
    };
    window.requestAnimationFrame(draw);
  };

  const stats = document.querySelector(".hero-stats");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    animateCounter(fixedCounter);
    animateCounter(daysElement);
  } else {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        animateCounter(fixedCounter);
        animateCounter(daysElement);
        observer.disconnect();
      },
      { threshold: 0.45 },
    );
    counterObserver.observe(stats);
  }
});
