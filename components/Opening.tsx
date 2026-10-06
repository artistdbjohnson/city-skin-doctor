"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { media } from "@/lib/media";
import { usePrefs } from "@/components/prefs";

const SESSION_KEY = "csd-pathway-open";
const PATHS_AT_MS = 2000;
const EXIT_AT_MS = 3700;
const DONE_AT_MS = 4400;

function armRule() {
  document.documentElement.dataset.rule = "draw";
}

function shouldSkip() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hash = window.location.hash.length > 1;
  let seen = false;
  try {
    seen = sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    seen = false;
  }
  return reduce || hash || seen;
}

function markSeen() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* ignore */
  }
  document.documentElement.dataset.open = "done";
  armRule();
  document.body.style.overflow = "";
  document.querySelector(".site-header")?.removeAttribute("inert");
  document.querySelector("main")?.removeAttribute("inert");
  document.querySelector(".site-footer")?.removeAttribute("inert");
}

export function Opening() {
  const { t } = usePrefs();
  const skipRef = useRef<HTMLButtonElement>(null);
  const timers = useRef<number[]>([]);
  const [phase, setPhase] = useState<"seals" | "paths" | "exit" | "done">("seals");

  function clearTimers() {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }

  function finish() {
    clearTimers();
    markSeen();
    setPhase("done");
  }

  useLayoutEffect(() => {
    if (shouldSkip()) {
      document.documentElement.dataset.open = "skip";
      armRule();
      setPhase("done");
      return;
    }
    document.documentElement.dataset.open = "play";
    if (document.documentElement.dataset.rule !== "draw") {
      document.documentElement.dataset.rule = "wait";
    }
  }, []);

  useEffect(() => {
    if (shouldSkip()) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    timers.current = [
      window.setTimeout(() => setPhase("paths"), PATHS_AT_MS),
      window.setTimeout(() => setPhase("exit"), EXIT_AT_MS),
      window.setTimeout(() => {
        markSeen();
        setPhase("done");
      }, DONE_AT_MS),
    ];

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      finish();
    };
    window.addEventListener("keydown", onKey);
    skipRef.current?.focus();

    const background = [
      document.querySelector(".site-header"),
      document.querySelector("main"),
      document.querySelector(".site-footer"),
    ];
    background.forEach((node) => node?.setAttribute("inert", ""));

    return () => {
      clearTimers();
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      background.forEach((node) => node?.removeAttribute("inert"));
    };
  }, []);

  const className = [
    "pathway-open",
    phase === "paths" ? "is-paths" : "",
    phase === "exit" ? "is-exit" : "",
    phase === "done" ? "is-done" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={className}
      role="dialog"
      aria-modal={phase !== "done"}
      aria-hidden={phase === "done"}
      aria-label={t.openLabel}
    >
      <button type="button" className="open-skip" onClick={finish} ref={skipRef}>
        {t.skipOpen}
      </button>
      <div className="open-inner">
        <p className="kicker">{t.openKicker}</p>
        <div className="seals" style={{ marginTop: "1rem" }}>
          <div className="seal-lg">
            <Image src={media.hiw} alt="" width={444} height={113} priority />
            <p>
              {t.regulatedBy} {t.hiw}
            </p>
          </div>
          <div className="seal-lg cqc">
            <Image src={media.cqc} alt="" width={135} height={64} priority />
            <p>
              {t.regulatedBy} {t.cqc}
            </p>
          </div>
        </div>
        <div className="paths">
          {t.paths.map((path) => (
            <div className="path-tile" key={path.n}>
              <p className="index">{path.n}</p>
              <div>
                <strong>{path.k}</strong>
                <span>{path.d}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
