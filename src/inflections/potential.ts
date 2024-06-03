import { Group } from "../types";
import { toE } from "../shift";
import { splitOnLast, splitOnSecondLast } from "../helpers";
import { SURU } from "../constants";

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
