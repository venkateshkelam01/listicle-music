// client/src/components/WorldImageHero.jsx
import { useState } from "react";

/**
 * Shows your world image as the hero with an SVG overlay that defines
 * four large clickable polygons: americas, africa, asia, australia.
 *
 * Coordinates are approximations using a 1600x900 design space — tweak
 * the polygon points slightly if your image composition differs.
 */
export default function WorldImageHero({ onRegionSelect }) {
    const [hover, setHover] = useState("");

    return (
        <section className="world-photo-hero">
            <img
                className="world-photo"
                src="/img/world-hero.png"
                alt="World map"
                draggable={false}
            />

            <svg
                className="world-overlay"
                viewBox="0 0 1600 900"
                role="img"
                aria-label="Clickable world regions"
            >
                <polygon
                    className={`region ${hover === "americas" ? "is-hover" : ""}`}
                    points="
                        100,250 240,170 320,140 440,120 540,130 580,180
                        600,260 520,360 460,420 440,500 440,600 400,700
                        300,770 220,740 160,600 120,460
                    "
                    onMouseEnter={() => setHover("americas")}
                    onMouseLeave={() => setHover("")}
                    onClick={() => onRegionSelect?.("americas")}
                />

                <polygon
                    className={`region ${hover === "africa" ? "is-hover" : ""}`}
                    points="
                        880,420 960,380 1040,400 1080,440 1080,500
                        1060,560 980,620 920,600 880,500
                    "
                    onMouseEnter={() => setHover("africa")}
                    onMouseLeave={() => setHover("")}
                    onClick={() => onRegionSelect?.("africa")}
                />

                <polygon
                    className={`region ${hover === "asia" ? "is-hover" : ""}`}
                    points="
                        960,260 1040,230 1140,210 1260,240 1360,280
                        1440,340 1420,420 1320,460 1200,460 1080,420 980,350
                    "
                    onMouseEnter={() => setHover("asia")}
                    onMouseLeave={() => setHover("")}
                    onClick={() => onRegionSelect?.("asia")}
                />

                <polygon
                    className={`region ${hover === "australia" ? "is-hover" : ""}`}
                    points="
                        1240,620 1300,600 1360,640 1340,700 1280,720 1220,680
                    "
                    onMouseEnter={() => setHover("australia")}
                    onMouseLeave={() => setHover("")}
                    onClick={() => onRegionSelect?.("australia")}
                />

                <g className="labels" pointerEvents="none">
                    <text x="360" y="220">Americas</text>
                    <text x="980" y="410">Africa</text>
                    <text x="1240" y="260">Asia</text>
                    <text x="1320" y="680">Australia</text>
                </g>
            </svg>
        </section>
    );
}
