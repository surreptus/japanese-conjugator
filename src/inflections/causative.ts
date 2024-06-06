import { SURU } from "../constants";
import { splitOnLast, splitOnSecondLast } from "../helpers";
import { toA } from "../shift";
import { Group } from "../types";

export function getCausativeForm(verb: string, group: Group): string {
  let [start, ending] = splitOnLast(verb);

  switch (group) {
    case Group.Ichidan:
      return `${start}させる`;
    case Group.Godan:
      return `${start}${toA(ending)}せる`;
    case Group.Irregular:
      [start, ending] = splitOnSecondLast(verb);

      return ending === SURU ? `${start}させる` : `${start}来させる`;
    default:
      throw new Error("invalid group provided");
  }
}
