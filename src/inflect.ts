import { Group, Inflection, Verb } from "./types";
import { toE, toI } from "./shift";
import { guess } from "./group";
import {
  getCombiningStem,
  getPoliteStem,
  splitOnLast,
  splitOnSecondLast,
} from "./helpers";
import { SURU } from "./constants";

/**
 * returns the stem for the potential form, e.g. 食べよう
 *
 * @param {string} verb
 * @param {Group} group
 * @returns
 */
export function getPotentialForm(verb: string, group: Group): string {
  let [start, ending] = splitOnLast(verb);

  switch (group) {
    // 描ける→描けれる
    case Group.Ichidan:
      return `${start}られる`;
    // 使う→使える
    case Group.Godan:
      return `${start}${toE(ending)}る`;
    // 勉強する→勉強出来る、来る→来られる
    case Group.Irregular:
      [start, ending] = splitOnSecondLast(verb);

      return ending == SURU ? `${start}できる` : `来られる`;
  }
}

/**
 * takes a given verb, gets the combining stem, then attches the appropriate ending
 *
 * @param {Verb} verb
 * @param {Group} group
 * @returns
 */
export function getTeForm(verb: string, group: Group) {
  const stem = getCombiningStem(verb, group);
  let [, ending] = splitOnLast(verb);

  switch (group) {
    case Group.Godan:
      switch (ending) {
        case "む":
        case "ぬ":
        case "ぶ":
        case "ぐ":
          return `${stem}で`;
        case "く":
        case "つ":
        case "う":
        case "る":
        case "す":
          return `${stem}て`;
      }
    case Group.Ichidan:
    case Group.Irregular:
      return `${stem}て`;
  }
}

/**
 * using the combining stem, we can attach the appropriate ending to get the past form. e.g. 食べた
 *
 * @param verb
 * @param group
 * @returns
 */
export function getPastForm(verb: string, group: Group) {
  const stem = getCombiningStem(verb, group);
  let [, ending] = splitOnLast(verb);

  switch (group) {
    case Group.Godan:
      switch (ending) {
        case "む":
        case "ぬ":
        case "ぶ":
        case "ぐ":
          return `${stem}だ`;
        case "く":
          return `${stem}た`;
        case "つ":
        case "う":
        case "る":
          return `${stem}た`;
        case "す":
          return `${stem}た`;
      }
    case Group.Ichidan:
    case Group.Irregular:
      return `${stem}た`;
  }
}

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
  let resolvedGroup = group ?? guess(verb);

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
