import { SURU } from "../constants";
import { splitOnLast, splitOnSecondLast } from "../helpers";
import { toA } from "../shift";
import { Group } from "../types";

export function getPassiveForm(verb: string, group: Group): string {
  let [start, end] = splitOnLast(verb);

  switch (group) {
    case Group.Ichidan:
      return `${start}られる`;
    case Group.Godan:
      return `${start}${toA(end)}れる`;
    case Group.Irregular:
      [start, end] = splitOnSecondLast(verb);

      return end === SURU ? `${start}される` : `${start}来られる`;
    default:
      throw new Error("invalid group provided");
  }
}
