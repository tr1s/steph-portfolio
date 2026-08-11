/*
 * Shared motion values for the page entrance reveals.
 * ------------------------------------------------------------------------------
 * Home (components/ProjectList.jsx) and /me (components/StaggerReveal.jsx) run
 * the same entrance, so the timing lives here rather than twice. Change
 * GROUP_STAGGER once and both pages stay in step - that is the whole reason
 * this file exists, so resist inlining these back into a component.
 *
 * The two rhythms are nested. A "group" is one thing the eye reads as a unit: a
 * project title on home, a section on /me. A "part" is a piece inside it: a word
 * of a title, a paragraph of a section. Parts cascade quickly, groups arrive
 * slowly, and the gap between those two speeds is what stops the page reading as
 * one flat fade.
 *
 * GROUP_STAGGER is the value to reach for first. At 0.2 the fifth and last
 * project title starts at 0.8s.
 */

export const GROUP_STAGGER = 0.2; // seconds between groups
export const PART_STAGGER = 0.06; // seconds between parts inside one group
export const TRAVEL = 24; // px each part rises through

/* visualDuration is when the motion appears to arrive; the small bounce settles
 * after it. Springs are per the Motion docs' duration-based form, which is
 * easier to reason about than stiffness/damping. */
export const SPRING = { type: 'spring', visualDuration: 0.9, bounce: 0.2 };

/* Reduced motion keeps a fade so the page still resolves rather than snapping,
 * but drops every trace of movement. */
export const REDUCED_FADE = { duration: 0.2 };

/* The project pages reveal their spreads on scroll instead of on mount, so
 * these two belong to components/ProjectReveal.jsx alone.
 *
 * A spread is a far bigger object than a line of type, and travel reads in
 * proportion to the thing moving, so it rises further than TRAVEL does.
 *
 * SCROLL_AMOUNT is how much of an image has to be in view before it starts.
 * Motion's default is "some", which fires on the first pixel - the animation
 * would then play out below the fold and be over by the time it is worth
 * looking at. A fifth means it begins once the image is genuinely arriving. */
export const SCROLL_TRAVEL = 32; // px each image rises through
export const SCROLL_AMOUNT = 0.2; // fraction of the image inside the viewport
