import { Group, Inflection, Verb } from "./types";
import { toE, toI } from "./shift";
import { guess } from "./group";

/**
Affirmative 	Negative
Non-past 	食べる 	食べない
Non-past, polite 	食べます 	食べません
Past 	食べた 	食べなかった
Past, polite 	食べました 	食べませんでした
Te-form 	食べて 	食べなくて
Potential 	食べられる 	食べられない
Passive 	食べられる 	食べられない
Causative 	食べさせる 	食べさせない
Causative Passive 	食べさせられる 	食べさせられない
Imperative 	食べろ 	食べるな
*/

/**
 * returns the stem form that goes with the te and simple past forms
 *
 * @param verb
 * @param group
 * @returns
 */
export function getCombiningStem(verb: string, group: Group): string {
  let ending = verb.slice(-1);
  let rest = verb.slice(0, -1);

  switch (group) {
    // 生きる→生き
    case Group.Ichidan:
      return rest;
    // 飲むー>飲んだ
    case Group.Godan:
      // depending on the ending we want to append a new character
      switch (ending) {
        case "ぐ":
        case "く":
          return `${rest}い`;
        case "む":
        case "る":
        case "ぶ":
          return `${rest}ん`;
        case "う":
          return `${rest}っ`;
      }
    // for irregular verbs, we just have two options, suru verb in which we need to preserve
    // the preceding noun, or just 来る
    case Group.Irregular:
      ending = verb.slice(-2);
      rest = verb.slice(0, -2);

      return ending == "する" ? `${rest}し` : "来";
  }
}

/**
 * to get the verb stem we must check if it is an irregular verb
 * if it is reuturn the exception
 * if it is not we must check if it is a godan or ichidan verb
 * if it is a godan verb we must remove the last character and add the correct character
 *
 * @param verb string - the set of characters that makes up the verb
 * @param group Group - the group that the verb belongs to, e.g. ichidan
 * @returns
 */
export function getPoliteStem(verb: string, group: Group): string {
  switch (group) {
    // 食べる→食べ
    case Group.Ichidan:
      return verb.slice(0, -1);
    // 飲む→飲み
    case Group.Godan:
      return `${verb.slice(0, -1)}${toI(verb.slice(-1))}`;
    // する→し、来る→来、勉強する→勉強します
    case Group.Irregular:
      return verb.slice(-2) === "する" ? `${verb.slice(0, -2)}し` : "来";
    default:
      throw new Error("could not return combining for unknown character group");
  }
}

/**
 * returns the stem for the potential form, e.g. 食べよう
 *
 * @param verb
 * @param group
 * @returns
 */
export function getPotentialForm(verb: string, group: Group): string {
  switch (group) {
    // 描ける→描けれる
    case Group.Ichidan:
      return `${verb.slice(0, -1)}られる`;
    // 使う→使える
    case Group.Godan:
      return `${verb.slice(0, -1)}${toE(verb.slice(-1))}る`;
    // 勉強する→勉強出来る、来る→来られる
    case Group.Irregular:
      return verb.slice(-2) == `する`
        ? `${verb.slice(0, -2)}できる`
        : `来られる`;
  }
}

export function getTeForm(verb: string, group: Group) {
  const ending = verb.slice(0, -1);

  switch (group) {
    case Group.Ichidan:
      return ``;
    case Group.Godan:
      switch (ending) {
        case "":
          return ``;
        case "":
          return ``;
      }
    case Group.Irregular:
      return ``;
  }
}

/**
 * inflects the given Verb entry with the provided inflection
 *
 * @param {string} verb
 * @param {Inflection} inflection
 * @returns {string} inflected string
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
      return `${getCombiningStem(verb, resolvedGroup)}た`;
    // 食べました
    case Inflection.PastPolite:
      return `${getPoliteStem(verb, resolvedGroup)}ました`;
    // 食べて
    case Inflection.Te:
      return `${getCombiningStem(verb, resolvedGroup)}て`;
    // 食べれる
    case Inflection.Potential:
      return getPotentialForm(verb, resolvedGroup);
    default:
      throw new Error("not implemented");
  }
}

/**
 * returns the negative form of the given inflection, this is a bit simplistic
 * since we don't offer past passive, causatives.
 *
 * @param verb
 * @param inflection
 */
export function negate(verb: Verb, inflection: Inflection) {
  switch (inflection) {
    case Inflection.NonPast:
    case Inflection.Past:
    case Inflection.PastPolite:
    case Inflection.NonPastPolite:
    case Inflection.Te:
    case Inflection.Potential:
    default:
      throw new Error("not yet implemented");
  }
}
