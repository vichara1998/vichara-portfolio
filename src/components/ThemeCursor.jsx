import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const TRAIL_COUNT = 7;

export default function ThemeCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursor.querySelector(".theme-cursor-dot");
    const ring = cursor.querySelector(".theme-cursor-ring");
    const trails = Array.from(cursor.querySelectorAll(".theme-cursor-trail"));
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const positions = trails.map(() => ({ x: 0, y: 0 }));
    const pointer = { x: 0, y: 0 };
    const follower = { x: 0, y: 0 };
    let frame = 0;
    let lastFrame = 0;
    let lastMove = 0;
    let visible = false;

    const position = (element, point) => {
      element.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
    };

    function draw(now) {
      const elapsed = Math.min(now - lastFrame || 16, 40);
      lastFrame = now;
      const smoothing = 1 - Math.exp(-elapsed / 65);
      follower.x += (pointer.x - follower.x) * smoothing;
      follower.y += (pointer.y - follower.y) * smoothing;
      position(dot, pointer);
      position(ring, follower);
      let previous = pointer;
      const fade = Math.max(0, 1 - (now - lastMove) / 420);
      positions.forEach((point, index) => {
        const follow = 1 - Math.exp(-elapsed / (30 + index * 8));
        point.x += (previous.x - point.x) * follow;
        point.y += (previous.y - point.y) * follow;
        position(trails[index], point);
        trails[index].style.opacity = String(fade * (1 - index / TRAIL_COUNT) * 0.55);
        previous = point;
      });
      frame = visible && now - lastMove < 650 ? requestAnimationFrame(draw) : 0;
    }

    function hide() {
      visible = false;
      cursor.dataset.visible = "false";
      cursor.dataset.pressed = "false";
      document.documentElement.classList.remove("theme-cursor-active");
      cancelAnimationFrame(frame);
      frame = 0;
    }

    function move(event) {
      if (!media.matches || event.pointerType !== "mouse") { hide(); return; }
      const textField = event.target.closest('input, textarea, [contenteditable="true"]');
      if (textField) { hide(); return; }
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (!visible) {
        Object.assign(follower, pointer);
        positions.forEach((point) => Object.assign(point, pointer));
        trails.forEach((trail) => { position(trail, pointer); trail.style.opacity = "0"; });
        position(dot, pointer);
        position(ring, pointer);
      }
      visible = true;
      lastMove = performance.now();
      cursor.dataset.visible = "true";
      cursor.dataset.interactive = String(Boolean(event.target.closest('a, button, [role="button"], .project-carousel')));
      document.documentElement.classList.add("theme-cursor-active");
      if (!frame) { lastFrame = lastMove; frame = requestAnimationFrame(draw); }
    }

    const leave = (event) => { if (!event.relatedTarget) hide(); };
    const press = () => { cursor.dataset.pressed = "true"; };
    const release = () => { cursor.dataset.pressed = "false"; };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerout", leave);
    window.addEventListener("blur", hide);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    media.addEventListener("change", hide);
    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", hide);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      media.removeEventListener("change", hide);
    };
  }, []);

  return createPortal(
    <div ref={cursorRef} className="theme-cursor" aria-hidden="true" data-visible="false">
      {Array.from({ length: TRAIL_COUNT }, (_, index) => (
        <span key={index} className="theme-cursor-trail" style={{ "--trail-index": index }} />
      ))}
      <span className="theme-cursor-ring"><span /></span>
      <span className="theme-cursor-dot">
        <svg width="25" height="29" viewBox="0 0 25 29" fill="none">
          <path d="M2 2L21 15.5L12.5 17L8.5 25L2 2Z" fill="var(--color-accent)" stroke="var(--color-bg)" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M3 3L12 15" stroke="var(--color-text)" strokeOpacity="0.55" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </span>
    </div>,
    document.body,
  );
}
