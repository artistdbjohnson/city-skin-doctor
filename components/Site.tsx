"use client";

import { useEffect } from "react";
import Image from "next/image";
import { External } from "@/components/External";
import { Header } from "@/components/Header";
import { Opening } from "@/components/Opening";
import { usePrefs } from "@/components/prefs";
import {
  academyUrl,
  bookingUrl,
  branches,
  clinicUrl,
  email,
  facebookUrl,
  instagramUrl,
  media,
  partners,
  storeUrl,
} from "@/lib/media";

const serviceImage = {
  blood: media.blood,
  hair: media.hair,
  weight: media.weight,
  cosmetic: media.cosmetic,
  skin: media.skin,
} as const;

export function Site() {
  const { t } = usePrefs();

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(".reveal, .ledger"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      nodes.forEach((node) => node.classList.add("in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Opening />
      <Header />
      <main id="hero" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="shell hero-grid">
            <div>
              <p className="kicker">{t.heroKicker}</p>
              <h1 id="hero-title">
                {t.heroTitle.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h1>
              <hr className="rule" />
              <p className="lede">{t.heroLede}</p>
              <div className="hero-actions">
                <External className="book" href={bookingUrl}>
                  {t.bookLong}
                </External>
                <a className="text-btn" href="#services">
                  {t.servicesEyebrow}
                </a>
              </div>
              <div className="badge-row">
                <figure>
                  <Image src={media.hiw} alt="" width={444} height={113} />
                  <figcaption>
                    {t.regulatedBy} {t.hiw}
                  </figcaption>
                </figure>
                <figure>
                  <Image src={media.cqc} alt="" width={135} height={64} />
                  <figcaption>
                    {t.regulatedBy} {t.cqc}
                  </figcaption>
                </figure>
              </div>
            </div>
            <figure>
              <Plate src={media.doctor} alt={t.doctorAlt} ratio="4-3" position="center 42%" priority />
              <figcaption className="caption">
                <strong>{t.heroCaption}</strong>
                <span>{t.heroRole}</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="section band-mist" id="pathways" aria-labelledby="path-title">
          <div className="shell section-grid">
            <p className="index">{t.trifectaIndex}</p>
            <div>
              <div className="head reveal">
                <p className="eyebrow">{t.trifectaEyebrow}</p>
                <h2 id="path-title">{t.trifectaTitle}</h2>
                <p className="lede">{t.trifectaLede}</p>
              </div>
              <div className="trifecta">
                {t.trifecta.map((item) => (
                  <article className="card reveal" key={item.n}>
                    <Plate
                      src={media[item.image]}
                      alt={item.alt}
                      ratio="4-3"
                      position={item.image === "hair" ? "center 18%" : "center"}
                      sizes="(max-width: 860px) 100vw, 33vw"
                    />
                    <div className="card-pad">
                      <p className="index">{item.n}</p>
                      <h3>{item.k}</h3>
                      <p>{item.d}</p>
                      <div className="inline-actions">
                        <External className="book" href={bookingUrl}>
                          {t.book}
                        </External>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="services" aria-labelledby="services-title">
          <div className="shell section-grid">
            <p className="index">{t.servicesIndex}</p>
            <div>
              <div className="head reveal">
                <p className="eyebrow">{t.servicesEyebrow}</p>
                <h2 id="services-title">{t.servicesTitle}</h2>
                <p className="lede">{t.servicesLede}</p>
              </div>
              <div className="constellation">
                <article className="card svc svc-laser reveal">
                  <div className="laser-layout">
                    <Plate src={media.laser1} alt={t.laserAlt} ratio="16-10" sizes="(max-width: 860px) 100vw, 55vw" />
                    <div>
                      <Plate src={media.laser2} alt={t.laserAlt2} ratio="16-10" sizes="(max-width: 860px) 100vw, 30vw" />
                      <div className="laser-copy">
                        <p className="eyebrow">Candela GentleMax Pro</p>
                        <h3>{t.laserTitle}</h3>
                        <p>{t.laserBody}</p>
                        <div className="inline-actions">
                          <External className="book" href={bookingUrl}>
                            {t.book}
                          </External>
                          <External className="text-btn" href="https://www.cityskindoctor.co.uk/laser-hair-removal">
                            {t.readClinic}
                          </External>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
                {t.services.map((service) => (
                  <article className={`card svc svc-${service.id} reveal`} key={service.id}>
                    <Plate
                      src={serviceImage[service.id as keyof typeof serviceImage]}
                      alt={service.alt}
                      ratio="4-3"
                      position={service.id === "hair" ? "center 18%" : "center 40%"}
                      fit={service.id === "weight" ? "contain" : "cover"}
                      sizes="(max-width: 860px) 100vw, 30vw"
                    />
                    <div className="card-pad">
                      <h3>{service.title}</h3>
                      <p>{service.body}</p>
                      <div className="inline-actions">
                        <External className="book" href={bookingUrl}>
                          {t.book}
                        </External>
                        <External className="text-btn" href={service.href}>
                          {t.readClinic}
                        </External>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section band-mist" id="clinic" aria-labelledby="clinic-title">
          <div className="shell section-grid">
            <p className="index">{t.dualIndex}</p>
            <div className="dual">
              <article className="card panel reveal">
                <Plate src={media.clinic} alt={t.clinicAlt} ratio="4-3" sizes="(max-width: 860px) 100vw, 45vw" />
                <div className="card-pad">
                  <p className="eyebrow">{t.clinicEyebrow}</p>
                  <h2 id="clinic-title">{t.clinicTitle}</h2>
                  <p>{t.clinicBody}</p>
                  <div className="inline-actions">
                    <External className="book" href={bookingUrl}>
                      {t.book}
                    </External>
                    <External className="text-btn" href={clinicUrl}>
                      {t.clinicLink}
                    </External>
                  </div>
                </div>
              </article>
              <article className="card panel reveal" id="academy">
                <Plate src={media.academy} alt={t.academyAlt} ratio="16-10" sizes="(max-width: 860px) 100vw, 45vw" />
                <div className="card-pad">
                  <p className="eyebrow">{t.academyEyebrow}</p>
                  <p className="kicker" style={{ marginTop: "0.8rem" }}>
                    {t.academyKicker}
                  </p>
                  <h3>{t.academyTitle}</h3>
                  <p>{t.academyBody}</p>
                  <p className="note">{t.academyCpd}</p>
                  <div className="inline-actions">
                    <External className="book" href={academyUrl}>
                      {t.academyLink}
                    </External>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="products" aria-labelledby="products-title">
          <div className="shell section-grid">
            <p className="index">{t.productsIndex}</p>
            <div className="products reveal">
              <div className="elixir">
                <Plate src={media.elixir} alt={t.elixirAlt} ratio="square" fit="contain" sizes="280px" />
              </div>
              <div>
                <p className="eyebrow">{t.productsEyebrow}</p>
                <h2 id="products-title">{t.productsTitle}</h2>
                <p className="lede">{t.productsLede}</p>
                <div className="inline-actions">
                  <External className="book" href={storeUrl}>
                    {t.store}
                  </External>
                </div>
                <div className="partners">
                  <p className="eyebrow">{t.cooperate}</p>
                  <div className="partner-row">
                    {partners.map((partner) => (
                      <figure key={partner.name}>
                        <Image src={partner.src} alt={partner.name} width={225} height={225} />
                      </figure>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section band-mist" id="doctor" aria-labelledby="doctor-title">
          <div className="shell section-grid">
            <p className="index">{t.doctorIndex}</p>
            <div className="about">
              <figure className="reveal">
                <Plate src={media.doctor} alt={t.doctorAlt} ratio="4-3" sizes="(max-width: 860px) 100vw, 40vw" />
                <figcaption className="caption">
                  <strong>{t.heroCaption}</strong>
                  <span>{t.heroRole}</span>
                </figcaption>
              </figure>
              <div>
                <div className="reveal">
                  <p className="eyebrow">{t.doctorEyebrow}</p>
                  <h2 id="doctor-title">{t.doctorTitle}</h2>
                  <p className="lede" style={{ marginTop: "1rem" }}>
                    {t.doctorP1}
                  </p>
                  <p className="lede" style={{ marginTop: "0.9rem" }}>
                    {t.doctorP2}
                  </p>
                </div>
                <ul className="creds ledger">
                  {t.creds.map((item, index) => (
                    <li key={item}>
                      <span>0{index + 1}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="regulation" aria-labelledby="reg-title">
          <div className="shell section-grid">
            <p className="index">{t.regIndex}</p>
            <div>
              <div className="head reveal">
                <p className="eyebrow">{t.regEyebrow}</p>
                <h2 id="reg-title">{t.regTitle}</h2>
                <p className="lede">{t.regBody}</p>
              </div>
              <div className="reg-grid reveal">
                <figure className="seal">
                  <Image src={media.hiw} alt="" width={444} height={113} />
                  <figcaption>
                    <External href="https://www.hiw.org.uk/">{t.hiwLink}</External>
                  </figcaption>
                </figure>
                <figure className="seal">
                  <Image src={media.cqc} alt="" width={135} height={64} />
                  <figcaption>
                    <External href="https://www.cqc.org.uk/">{t.cqcLink}</External>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section className="section band-mist" id="catchment" aria-labelledby="catch-title">
          <div className="shell section-grid">
            <p className="index">{t.catchIndex}</p>
            <div className="reveal">
              <div className="head">
                <p className="eyebrow">{t.catchEyebrow}</p>
                <h2 id="catch-title">{t.catchTitle}</h2>
                <p className="lede">{t.catchLede}</p>
              </div>
              <div className="chips">
                {t.chips.map((chip) => (
                  <a className="chip" href={chip.href} key={chip.label}>
                    {chip.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="contact" aria-labelledby="contact-title">
          <div className="shell section-grid">
            <p className="index">{t.contactIndex}</p>
            <div className="contact-grid">
              <div className="branches">
                <article className="card branch" id={branches.cardiff.id}>
                  <p className="eyebrow">{t.cardiffName}</p>
                  <h3>225 City Road</h3>
                  <p>Cardiff CF24 3JD</p>
                  <p className="note">{t.roathNote}</p>
                  <div className="meta-line">
                    <span>{t.phoneLabel}</span>
                    <a href={branches.cardiff.tel}>{branches.cardiff.phone}</a>
                  </div>
                  <div className="meta-line">
                    <span>{t.hoursLabel}</span>
                    <p>{t.hours}</p>
                    <p>{t.hoursSat}</p>
                  </div>
                </article>
                <article className="card branch" id={branches.london.id}>
                  <p className="eyebrow">{t.londonName}</p>
                  <h3>396 Harrow Road</h3>
                  <p>London W9 2HU</p>
                  <div className="meta-line">
                    <span>{t.phoneLabel}</span>
                    <a href={branches.london.tel}>{branches.london.phone}</a>
                  </div>
                  <div className="meta-line">
                    <span>{t.hoursLabel}</span>
                    <p>{t.hours}</p>
                    <p>{t.hoursSat}</p>
                  </div>
                </article>
              </div>
              <aside className="card branch">
                <p className="eyebrow">{t.contactEyebrow}</p>
                <h2 id="contact-title">{t.contactTitle}</h2>
                <p style={{ marginTop: "0.8rem" }}>{t.contactLede}</p>
                <p className="note">{t.caveat}</p>
                <div className="inline-actions">
                  <External className="book" href={bookingUrl}>
                    {t.bookLong}
                  </External>
                </div>
                <div className="meta-line">
                  <span>{t.emailLabel}</span>
                  <a href={`mailto:${email}`}>{email}</a>
                </div>
                <div className="socials">
                  <External href={instagramUrl}>{t.instagram}</External>
                  <External href={facebookUrl}>{t.facebook}</External>
                </div>
                <div className="contact-plate">
                  <Plate
                    src={media.skin}
                    alt={t.services[4].alt}
                    ratio="16-10"
                    position="center 30%"
                    sizes="(max-width: 860px) 100vw, 36vw"
                  />
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="shell">
          <p className="disclaimer">{t.disclaimer}</p>
          <p className="built">{t.built}</p>
        </div>
      </footer>
    </>
  );
}

function Plate({
  src,
  alt,
  ratio,
  fit = "cover",
  position = "center",
  priority = false,
  sizes = "(max-width: 900px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  ratio: "4-3" | "3-4" | "16-10" | "square";
  fit?: "cover" | "contain";
  position?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`plate ratio-${ratio} ${fit === "contain" ? "fit-contain" : ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="plate-img"
        style={{ objectPosition: position, objectFit: fit }}
      />
    </div>
  );
}
