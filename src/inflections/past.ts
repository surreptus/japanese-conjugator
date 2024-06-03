import { Group } from "../types";
import { getCombiningStem, splitOnLast } from "../helpers";

/**
 * using the combining stem, we can attach the appropriate ending to get the past form. e.g. 食べた
 *
 * @param verb
 * @param group
 * @returns
 */

export function getPastForm(verb: string, group: Group) {
  const stem = getCombiningStem(verb, group);
  const [, ending] = splitOnLast(verb);

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
      break;
    case Group.Ichidan:
    case Group.Irregular:
      return `${stem}た`;
  }
}
