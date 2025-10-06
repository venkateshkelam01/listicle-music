// client/src/components/USMap.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Loads /us-map.svg and colors each state by event availability.
 * - Red (#ef4444)  = 0 events
 * - Green (#22c55e)= >0 events
 * Clicking a state navigates to /states/:code
 *
 * NOTE: Your us-map.svg should have <path id="CA">, <path id="NY">, etc.
 */
export default function USMap({ stateCounts }) {
    const [svgMarkup, setSvgMarkup] = useState("");
    const ref = useRef(null);
    const nav = useNavigate();

    useEffect(() => {
        fetch("/us-map.svg").then((r) => r.text()).then(setSvgMarkup);
    }, []);

    useEffect(() => {
        if (!svgMarkup || !ref.current) return;
        const root = ref.current.querySelector("svg");
        if (!root) return;

        const allStates = root.querySelectorAll("[id]");
        allStates.forEach((el) => {
            const id = (el.id || "").toUpperCase();
            if (!/^[A-Z]{2}$/.test(id)) return;
            const has = stateCounts[id] && stateCounts[id] > 0;

            // color, outline, and click handlers
            el.style.fill = has ? "#22c55e" : "#ef4444";
            el.style.stroke = "black";
            el.style.strokeWidth = "0.5";
            el.style.cursor = "pointer";
            el.setAttribute("tabindex", "0");
            el.setAttribute("role", "button");
            el.setAttribute("aria-label", `${id} ${has ? "has events" : "no events"}`);

            const go = () => nav(`/states/${id}`);
            const key = (e) => {
                if (e.key === "Enter") go();
            };

            el.addEventListener("click", go);
            el.addEventListener("keypress", key);

            // store references so we can remove on unmount
            el.___go = go;
            el.___key = key;
        });

        return () => {
            // cleanup listeners on unmount
            allStates.forEach((el) => {
                if (el.___go) el.removeEventListener("click", el.___go);
                if (el.___key) el.removeEventListener("keypress", el.___key);
                delete el.___go;
                delete el.___key;
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
