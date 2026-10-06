# City Skin Doctor — motion meeting

Date: 2026-10-06  
Seats: Vale (timing), Reed (soft taste), Glyph (marks and type), Ash (floor), Axiom (optional — regulation).  
Site: Motionsites neo-museum, remapped to a UK-regulated medical aesthetics clinic. EN + PT. Dark and light.  
Already shipping: HIW | CQC twin-badge pathway open (session once; skipped for reduced motion, hash deep-links, and a repeat visit in the same session).

Looked at [prompt-motion.com](https://www.prompt-motion.com/) for attitude and timing only. Videos were not rehosted. Prompt packs were not copied into this repo.

## What the gallery is doing

The index is a masonry of short films. Two full pieces timed from the page sit near a fifteen-second reel (motion-principles piece about 15.1s, engraving piece about 14.5s). The cards loop four-second previews at 30fps.

Watched, as attitude, not as a kit:

- Kinetic-type showreel. Full-bleed black and white. Giant words slammed to the frame edge. Hard cuts inside the four-second loop. Almost no hold.
- Shape-morph reel. One geometry continuously becoming another, including interface chrome. No settled state.
- The only quiet timing on the page is the gallery UI itself: fades around 150–500ms, ease-out, and a reduced-motion path that drops the transition.

That attitude is a showreel. It is the wrong temperature for Healthcare Inspectorate Wales and the Care Quality Commission on a doctor-led clinic. Steal the ease-out and the reduced-motion kill switch. Refuse the loop, the slam, the morph, and the fifteen-second reel.

## Already locked — do not restage

The pathway open stays the only introduction. Dual seals, then Medical · Surgical · Cosmetic, then the clinic hero. Skip control and Escape remain. Session key remains `csd-pathway-open`.

A second splash, a type rewrite of “Medical, Surgical & Cosmetic.”, or a replay of the seals further down the page would compete with that open.

## Table

| Option | Vale | Reed | Glyph | Ash | Axiom | Call |
| --- | --- | --- | --- | --- | --- | --- |
| Kinetic-type hero, or any second splash | No | No | No | No | No | Reject. Showreel. Fights the open. Moves the title. |
| Seal or wordmark morph | No | No | No | No | No | Reject. Published marks stay still. |
| Plate drift / Ken Burns | No | No | — | No | No | Reject. Identity plates stay put. |
| Partner-logo marquee | No | No | No | No | — | Reject. Carnival, and it moves published marks. |
| Regulation-section seal replay | — | No | — | No | Yes | Reject. Axiom asked for an echo of the open. Reed: that restages the introduction. |
| Light refine of the pathway open: drop the scale, let the seals rest, then the pathways | Yes | Yes | Yes | Yes | Yes | Pass. Same open. Not a new one. |
| Hero crimson rule, once, ease-out, when the paper has left | Yes | Yes | Yes | Yes | Yes | **Win.** One editorial line. Type, colour, and length unchanged at rest. |
| Credential ledger, once, when the doctor section arrives | Yes | Yes | Yes | Yes | Abstain | **Win.** Five published lines, a short stagger, then still. |

## Winner

Two gestures, plus a light refine of the open. Nothing else.

1. **Hero rule.** The existing crimson rule under the hero title inscribes once, from the left, 0.72s, ease-out `cubic-bezier(0.22, 1, 0.36, 1)`. It starts when the pathway paper has left, or immediately when the open is skipped. Once per page load. It is not an introduction, so a return visit in the same session still gets the rule after the open is suppressed. `prefers-reduced-motion: reduce` leaves the rule at full length, 2.4rem, with no animation.
2. **Credential ledger.** The five published lines under Dr Ebrahim Feghenaby (MD 1997 through Founder & Medical Director, and the PT twin) settle once when that list meets the viewport. 0.5s, same curve, 4px, 70ms between lines, then the observer disconnects. Reduced motion shows the list at rest.

Open refine, still the only introduction:

- Seals arrive on opacity and 8px, 0.85s, same curve. CQC follows by 0.14s. The scale pop is gone — that read as the morph reel.
- Seals then stay still. They no longer shrink when the pathways appear.
- Pathways at 2.0s (a hold long enough to read both regulators), 0.6s, 8px.
- Paper leaves at 3.7s over 0.7s.
- Open ends at 4.4s. The rule starts then, on the clear hero. A playback with the rule running under the fading sheet showed the line already near full length before the page was readable, so the inscription now begins as the paper finishes leaving. Skip and Escape still draw the rule immediately, and they clear the remaining timers so the paper cannot return.

## Untouched

Fonts and typefaces. Brand colours. Layout chrome. Exact client copy. Logos and partner marks. Plates. EN and PT. Dark and light. The generic section fade already on the page stays; these two gestures are the only additions.
