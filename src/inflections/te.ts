import { Group } from "../types";
import { getCombiningStem, splitOnLast } from "../helpers";

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
