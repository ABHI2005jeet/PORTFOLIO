"use client";

import { useRef, useState } from "react";
import { skillTracks } from "@/content/skills";
import styles from "./SkillExplorer.module.scss";

export function SkillExplorer() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const selectByKey = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    let next = active;
    if (event.key === "ArrowRight") next = (active + 1) % skillTracks.length;
    else if (event.key === "ArrowLeft") next = (active + skillTracks.length - 1) % skillTracks.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = skillTracks.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  const track = skillTracks[active];
  return (
    <div className={styles.explorer}>
      <div className={styles.tabRail} role="tablist" aria-label="Explore skill areas">
        {skillTracks.map((item, index) => <button
          key={item.id} ref={(element) => { tabs.current[index] = element; }}
          id={`skill-tab-${item.id}`} role="tab" type="button" aria-selected={active === index}
          aria-controls={`skill-panel-${item.id}`} tabIndex={active === index ? 0 : -1}
          onClick={() => setActive(index)} onKeyDown={selectByKey}
        >{item.label}<span aria-hidden="true">0{index + 1}</span></button>)}
      </div>
      <section id={`skill-panel-${track.id}`} className={styles.panel} role="tabpanel" aria-labelledby={`skill-tab-${track.id}`} tabIndex={0}>
        <div className={styles.panelIntro}><p>{track.intro}</p><span className="monoLabel">{track.groups.length} DEPTH LEVELS</span></div>
        <div className={styles.depthGrid}>
          {track.groups.map((group) => <div className={styles.depth} key={group.depth}>
            <h3><span data-depth={group.depth.toLowerCase()} />{group.depth}</h3>
            <ul>{group.items.map((skill) => <li key={skill}>{skill}</li>)}</ul>
            <p className={styles.evidence}><span>Evidence</span>{group.evidence.join(" · ")}</p>
          </div>)}
        </div>
      </section>
    </div>
  );
}
