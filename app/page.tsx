import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, MapPin, MoveUpRight } from "lucide-react";
import { certifications, experience, featuredProjects, offDuty, site } from "@/lib/content";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { SkillExplorer } from "@/components/sections/SkillExplorer";
import { HeroAtmosphere } from "@/components/motion/HeroAtmosphere";
import styles from "./home.module.scss";

const profileSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Abhijeet Kumar — Portfolio",
  mainEntity: { "@type": "Person", name: site.name, description: site.positioning },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={[
        profileSchema,
        { "@context": "https://schema.org", "@type": "WebSite", name: site.name, description: site.positioning, inLanguage: "en-IN" },
      ]} />
      <section className={styles.hero} id="top" aria-labelledby="hero-title">
        <HeroAtmosphere />
        <div className={styles.portraitGlow} aria-hidden="true" />
        <div className={styles.heroPortrait} aria-hidden="true">
          <Image src="/images/profile/portrait-hero-halftone.png" alt="" fill priority fetchPriority="high" sizes="(max-width: 640px) 50vw, (max-width: 1100px) 68vw, 720px" className={styles.portraitImage} />
        </div>
        <div className={`pageShell ${styles.heroFrame}`}>
          <div className={styles.heroTopline}>
            <p className={styles.availability}><span aria-hidden="true" /> Looking for software development internships</p>
            <p className={styles.location}><MapPin aria-hidden="true" size={14} /> Agra, India <span>·</span> VIT Chennai</p>
          </div>
          <aside className={styles.heroSideNote} aria-label="Areas of focus">
            <span className={styles.sideIndex}>01 / PRESENCE</span>
            <span>Engineering<br />Cyber security<br />Cloud exploration</span>
          </aside>
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>Software development · security · cloud</p>
            <h1 id="hero-title" aria-label="Abhijeet Kumar">
              <span data-hero-word>Abhijeet</span>
              <span data-hero-word className={styles.titleSoft}>Kumar<span className={styles.period}>.</span></span>
            </h1>
            <p className={styles.heroStatement} data-hero-intro>I build software with curiosity and care.</p>
            <p className={styles.heroIntro} data-hero-intro>
              I’m a pre-final-year engineering student in Agra. Full-stack development is my core; security, cloud, and DevOps are where I keep exploring.
            </p>
            <div className={styles.heroActions} data-hero-intro>
              <Link className={styles.primaryLink} href="/work">Explore selected work <MoveUpRight aria-hidden="true" size={16} /></Link>
              <a className="linkUnderline" href="#contact">Get in touch <ArrowDown aria-hidden="true" size={15} /></a>
            </div>
            <div className={styles.proofStrip} data-hero-intro aria-label={`Profile information as of ${site.proofAsOf}`}>
              <a href={site.profiles.leetcode} target="_blank" rel="noopener noreferrer"><strong>{site.proof.leetcode}</strong><span>LeetCode</span></a>
              <a href={site.profiles.github} target="_blank" rel="noopener noreferrer"><strong>{site.proof.github}</strong><span>GitHub</span></a>
              <a href={site.profiles.hackerrank} target="_blank" rel="noopener noreferrer"><strong>{site.proof.hackerrank}</strong><span>HackerRank</span></a>
              <small>As of {site.proofAsOf}</small>
            </div>
          </div>
          <div className={styles.heroFoot} aria-hidden="true">
            <span>Scroll to discover</span><span className={styles.heroRule} />
            <span className={styles.heroFootNote}>A student of software, systems, and security</span>
          </div>
        </div>
      </section>

      <section className={`pageShell ${styles.about} sectionSpace`} id="about" aria-labelledby="about-title">
        <div className={styles.sectionKicker}><span className="sectionEyebrow">01 / A little about me</span><span className="monoLabel">CURIOUS BY DEFAULT</span></div>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutCopy}>
            <h2 id="about-title" className="sectionTitle" data-reveal-headline>Build things.<br /><em>Understand them.</em></h2>
            <div className={styles.aboutText}>
              <p>I’m studying Computer Science with a Cyber Security specialisation at VIT Chennai. I like moving from a rough idea to a working interface, then understanding the systems underneath it.</p>
              <p>Most of my projects sit in software development: full-stack products, APIs, and interactive experiences. Alongside that, I’m learning security through coursework and hands-on labs, and exploring cloud deployments through project work.</p>
              <p>I’m looking for an internship where I can contribute as a software developer, learn from a team, and keep building with care.</p>
              <div className={styles.aboutLinks}>
                <a href={site.profiles.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight aria-hidden="true" size={13} /></a>
                <a href={site.profiles.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight aria-hidden="true" size={13} /></a>
                {site.instagramVisible && <a href={site.profiles.instagram} target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight aria-hidden="true" size={13} /></a>}
              </div>
            </div>
          </div>
          <div className={styles.photoStory} role="group" aria-label="A few moments away from my desk">
            <figure className={styles.photoMain}><Image src="/images/about/festival-candid.png" alt="Standing at a festival installation" fill sizes="(max-width: 800px) 78vw, 34vw" /><figcaption>Outside the usual tabs</figcaption></figure>
            <figure className={styles.photoSmall}><Image src="/images/about/classroom-candid.png" alt="In a classroom between lectures" fill sizes="(max-width: 800px) 37vw, 16vw" /><figcaption>Campus, Chennai</figcaption></figure>
            <span className={styles.photoNote}>NOT EVERYTHING HAPPENS IN A TERMINAL</span>
          </div>
        </div>
      </section>

      <section className={styles.workSection} id="selected-work" aria-labelledby="work-title">
        <div className={`pageShell ${styles.sectionWrap}`}>
          <div className={styles.sectionKicker}><span className="sectionEyebrow">02 / Selected work</span><span className="monoLabel">A FEW THINGS I’VE MADE</span></div>
          <div className={styles.sectionHeadingRow}>
            <div><h2 id="work-title" className="sectionTitle" data-reveal-headline>Ideas, made <em>real.</em></h2><p className="sectionLead">A selection of software, APIs, and experiments I’ve built or helped shape.</p></div>
            <Link className={styles.arrowLink} href="/work">View all selected work <MoveUpRight aria-hidden="true" size={16} /></Link>
          </div>
          <div className={styles.featuredGrid}>
            {featuredProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index + 1} />)}
          </div>
        </div>
      </section>

      <section className={`pageShell ${styles.skillSection} sectionSpace`} id="skills" aria-labelledby="skills-title">
        <div className={styles.sectionKicker}><span className="sectionEyebrow">03 / Current toolkit</span><span className="monoLabel">DEPTH OVER BUZZWORDS</span></div>
        <div className={styles.skillIntro}><h2 id="skills-title" className="sectionTitle" data-reveal-headline>Learning by <em>building.</em></h2><p className="sectionLead">A clear view of what I’m building with, practising, and only beginning to explore.</p></div>
        <SkillExplorer />
      </section>

      <section className={styles.journeySection} id="journey" aria-labelledby="journey-title">
        <div className={`pageShell ${styles.sectionWrap}`}>
          <div className={styles.sectionKicker}><span className="sectionEyebrow">04 / Journey</span><span className="monoLabel">STUDY · WORK · KEEP GOING</span></div>
          <div className={styles.journeyGrid}>
            <div><h2 id="journey-title" className="sectionTitle" data-reveal-headline>Still early.<br /><em>Already building.</em></h2><p className="sectionLead">A few milestones that have shaped the way I work.</p></div>
            <ol className={styles.timeline}>
              {experience.map((item, index) => <li key={item.title}>
                <span className={styles.timelineIndex}>0{index + 1}</span>
                <div><p className="monoLabel">{item.period}</p><h3>{item.title}</h3><p className={styles.timelineOrg}>{item.organization}</p><p className={styles.timelineDetail}>{item.detail}</p>{item.kind === "experience" && <p className={styles.prototypeNote}>Working prototype built during my internship; groundwork for a LAN-based internal system.</p>}</div>
              </li>)}
            </ol>
          </div>
          <div className={styles.certificateBand}><h3>Courses & certifications</h3><ul>{certifications.map((certificate) => <li key={certificate}>{certificate}</li>)}</ul></div>
        </div>
      </section>

      <section className={`pageShell ${styles.offDuty} sectionSpace`} id="off-duty" aria-labelledby="off-duty-title">
        <div className={styles.sectionKicker}><span className="sectionEyebrow">05 / Off duty</span><span className="monoLabel">A LIFE OUTSIDE THE EDITOR</span></div>
        <div className={styles.offDutyGrid}>
          <div><h2 id="off-duty-title" className="sectionTitle" data-reveal-headline>More than <em>code.</em></h2><p className="sectionLead">Stories, games, training, and the occasional long run help me reset.</p>
            <div className={styles.interestList}><h3>On screen</h3><p><span>Anime</span>{offDuty.anime.join(" · ")}</p><p><span>Series</span>{offDuty.shows.join(" · ")}</p><p><span>Films</span>{offDuty.films.join(" · ")}</p><p><span>Games</span>{offDuty.games.join(" · ")}</p><p><span>Reset</span>{offDuty.routines.join(" · ")}</p></div>
          </div>
          <div className={styles.offDutyPhotos}>
            <figure className={styles.trainingPhoto}><Image src="/images/about/training-candid.png" alt="After a strength training session" fill sizes="(max-width: 800px) 48vw, 23vw" /><figcaption>Strength, consistency, repeat.</figcaption></figure>
            <figure className={styles.casualPhoto}><Image src="/images/about/casual-candid.png" alt="A casual portrait" fill sizes="(max-width: 800px) 48vw, 23vw" /><figcaption>A quieter moment</figcaption></figure>
          </div>
        </div>
      </section>

      <ContactPanel />
    </>
  );
}
