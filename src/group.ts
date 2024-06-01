import { Group } from "./types";

export function isIrregular(verb: string): boolean {
  const last = verb.slice(-2);

  return last === "する" || last === "くる" || last === "来る";
}

export function guess(verb: string): Group {
  if (isIrregular(verb)) return Group.Irregular;

  // todo: add a full list of exception godan verbs that look
  // like ichidan verbs to use here for comparison
  if (verb.slice(-1) === "る") {
    return Group.Ichidan;
  }

  return Group.Godan;
}
