import { Group, Inflection } from "./types";
import { getPoliteStem, guessGroup } from "./helpers";
import { getPotentialForm } from "./inflections/potential";
import { getTeForm } from "./inflections/te";
import { getPastForm } from "./inflections/past";
import { getPassiveForm } from "./inflections/passive";
import { getCausativeForm } from "./inflections/causative";

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
  const resolvedGroup = group ?? guessGroup(verb);

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
    // 食べられる
    case Inflection.Passive:
      return getPassiveForm(verb, resolvedGroup);
    case Inflection.Causative:
      return getCausativeForm(verb, resolvedGroup);
    default:
      throw new Error("invalid inflection provided, or not yet implemented!");
  }
}
