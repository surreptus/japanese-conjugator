import { SURU } from "./constants";
import { toI } from "./shift";
import { Group, ExistenceMap } from "./types";

import godanIruEru from "./data/godan-iru-eru.json";

/**
 *
 * @param word
 * @param length
 * @returns
 */
export function splitOnIndex(word: string, length: number): string[] {
  return [word.slice(0, length), word.slice(length)];
}

/**
 *
 * @param word
 * @returns
 */
export const splitOnLast = (word: string): string[] => splitOnIndex(word, -1);

/**
 *
 * @param word
 * @returns
 */
export const splitOnSecondLast = (word: string): string[] =>
  splitOnIndex(word, -2);

/**
 * checks the maps of irregular verbs to see if it exists within it.
 *
 * @param verb
 * @returns
 */
export function isIrregular(verb: string): boolean {
  const last = verb.slice(-2);

  return last === "する" || last === "くる" || last === "来る";
}

/**
 *
 * @param verb
 * @returns
 */
export function isIchidan(verb: string): boolean {
  const [, ending] = splitOnLast(verb);

  if (ending !== "る") return false;

  return (godanIruEru as ExistenceMap)[verb] === undefined;
}

/**
 *
 * @param verb
 * @returns
 */
export function guessGroup(verb: string): Group {
  if (isIrregular(verb)) return Group.Irregular;
  if (isIchidan(verb)) return Group.Ichidan;

  return Group.Godan;
}

/**
 * returns the stem form that goes with the te and simple past forms.
 * reference: https://www.tofugu.com/japanese-grammar/verb-past-ta-form/
 *
 * @param verb
 * @param group
 * @returns
 */
export function getCombiningStem(verb: string, group: Group): string {
  let [start, ending] = splitOnLast(verb);

  switch (group) {
    // 生きる→生き
    case Group.Ichidan:
      return start;
    // 飲むー>飲んだ
    case Group.Godan:
      // depending on the ending we want to append a new character
      switch (ending) {
        case "ぐ":
        case "く":
          return `${start}い`;
        case "む":
        case "ぬ":
        case "ぶ":
          return `${start}ん`;
        case "る":
        case "つ":
        case "う":
          return `${start}っ`;
        case "す":
          return `${start}し`;
        default:
          throw new Error(
            `could not return combining form for unknown character group: ${ending}`
          );
      }
    // for irregular verbs, we just have two options, suru verb in which we need to preserve
    // the preceding noun, or just 来る
    case Group.Irregular:
      [start, ending] = splitOnSecondLast(verb);

      return ending == SURU ? `${start}し` : "来";
    default:
      throw new Error("could not return combining for unknown character group");
  }
}

/**
 * to get the verb stem we must check if it is an irregular verb
 * if it is reuturn the exception
 * if it is not we must check if it is a godan or ichidan verb
 * if it is a godan verb we must remove the last character and add the correct character
 *
 *
 * @param verb string - the set of characters that makes up the verb
 * @param group Group - the group that the verb belongs to, e.g. ichidan
 * @returns
 */
export function getPoliteStem(verb: string, group: Group): string {
  let [start, ending] = splitOnLast(verb);

  switch (group) {
    // 食べる→食べ
    case Group.Ichidan:
      return start;
    // 飲む→飲み
    case Group.Godan:
      return `${start}${toI(ending)}`;
    // する→し、来る→来、勉強する→勉強します
    case Group.Irregular:
      [start, ending] = splitOnSecondLast(verb);
      return ending === SURU ? `${start}し` : "来";
    default:
      throw new Error("could not return combining for unknown character group");
  }
}
