// client/src/components/USMap.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Colors state tiles and adds centered 2-letter labels.
 * - Targets ONLY rect tiles with class="tile" and an id like "CA"
 * - Inserts the <text> label INSIDE the same <g>, so the group's transform applies
 */
export default function USMap({ stateCounts }) {
    const [svgMarkup, setSvgMarkup] = useState("");
    const ref = useRef(null);
    const nav = useNavigate();

    useEffect(() => {
        fetch("/us-map.svg").then(r => r.text()).then(setSvgMarkup);
    }, []);

    useEffect(() => {
        if (!svgMarkup || !ref.current) return;
        const root = ref.current.querySelector("svg");
        if (!root) return;

        // Clean up any old labels we added previously
        root.querySelectorAll('text[data-auto-label="1"]').forEach(n => n.remove());

        // Only operate on the RECT tiles, not <g> wrappers
        const rects = root.querySelectorAll('rect.tile[id]');
        rects.forEach(rect => {
            const code = (rect.id || "").toUpperCase();
            if (!/^[A-Z]{2}$/.test(code)) return;

            const has = (stateCounts[code] || 0) > 0;

            // Color + interactivity on the RECT
            rect.style.fill = has ? "#22c55e" : "#ef4444";
            rect.style.stroke = "#111827";
            rect.style.strokeWidth = "1";
            rect.style.cursor = "pointer";

            const go = () => nav(`/states/${code}`);
            const key = (e) => { if (e.key === "Enter") go(); };

            // Add handlers on the rect
            rect.addEventListener("click", go);
            rect.addEventListener("keypress", key);
            rect.setAttribute("tabindex", "0");
            rect.setAttribute("role", "button");
            rect.setAttribute("aria-label", `${code} ${has ? "has events" : "no events"}`);

            // ===== Label centered on the rect, inside the same <g> so its translate() applies
            const g = rect.closest("g") || root; // fallback if no group
            const x = Number(rect.getAttribute("x") || 0) + Number(rect.getAttribute("width") || 0) / 2;
            const y = Number(rect.getAttribute("y") || 0) + Number(rect.getAttribute("height") || 0) / 2;

            const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
            label.setAttribute("x", String(x));
            label.setAttribute("y", String(y));
            label.setAttribute("text-anchor", "middle");
            label.setAttribute("dominant-baseline", "middle");
            label.setAttribute("font-size", "10");
            label.setAttribute("font-weight", "700");
            label.setAttribute("fill", "#ffffff");
            label.setAttribute("stroke", "#000000");
            label.setAttribute("stroke-width", "0.6");
            label.setAttribute("data-auto-label", "1");
            label.style.pointerEvents = "none";
            label.textContent = code;

            g.appendChild(label);
        });

        // Cleanup on unmount (remove listeners)
        return () => {
            rects.forEach(rect => {
                rect.replaceWith(rect.cloneNode(true)); // nukes listeners
            });
        };
    }, [svgMarkup, stateCounts, nav]);

    return (
        <div
            className="us-map-wrap"
            ref={ref}
            dangerouslySetInnerHTML={{ __html: svgMarkup }}
        />
    );
}
