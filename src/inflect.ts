import { Group, Inflection, Verb } from "./types";
import { getPoliteStem, guessGroup } from "./helpers";
import { getPotentialForm } from "./inflections/potential";
import { getTeForm } from "./inflections/te";
import { getPastForm } from "./inflections/past";

/**
 * inflects the given Verb entry with the provided inflection
 *
 * @param {string} verb
 * @param {Inflection} inflection
 * @param {Group} group
 * @returns {string} inflected verb
 */
export function inflect(
  verb: string,
  inflection: Inflection,
  group?: Group
): string {
  let resolvedGroup = group ?? guessGroup(verb);

  switch (inflection) {
    // 食べる
    case Inflection.NonPast:
      return verb;
    // 食べます
    case Inflection.NonPastPolite:
      return `${getPoliteStem(verb, resolvedGroup)}ます`;
    // 食べた
    case Inflection.Past:
      return getPastForm(verb, resolvedGroup);
    // 食べました
    case Inflection.PastPolite:
      return `${getPoliteStem(verb, resolvedGroup)}ました`;
    // 食べて
    case Inflection.Te:
      return getTeForm(verb, resolvedGroup);
    // 食べれる
    case Inflection.Potential:
      return getPotentialForm(verb, resolvedGroup);
    default:
      throw new Error("invalid inflection provided, or not yet implemented!");
  }
}
