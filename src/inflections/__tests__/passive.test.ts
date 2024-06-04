import { describe, expect, it } from "@jest/globals";
import { Group } from "../../types";
import { getPassiveForm } from "../passive";

describe("getPassiveForm", () => {
  it("should return the passive form for ichidan verbs", () => {
    expect(getPassiveForm("食べる", Group.Ichidan)).toBe("食べられる");
  });

  it("should return the passive form for godan verbs", () => {
    const cases = [
      ["飲む", "飲まれる"],
      ["学ぶ", "学ばれる"],
      ["死ぬ", "死なれる"],
      ["会う", "会われる"],
      ["走る", "走られる"],
      ["立つ", "立たれる"],
      ["写す", "写される"],
      ["聞く", "聞かれる"],
      ["泳ぐ", "泳がれる"],
    ];

    cases.forEach(([verb, expected]) => {
      expect(getPassiveForm(verb, Group.Godan)).toBe(expected);
    });
  });

  it("should return the passive form for irregular verbs", () => {
    expect(getPassiveForm("する", Group.Irregular)).toBe("される");
    expect(getPassiveForm("来る", Group.Irregular)).toBe("来られる");
  });

  it("should throw an error if an invalid group is provided", () => {
    expect(() => getPassiveForm("foo", "error" as unknown as Group)).toThrow(
      "invalid group provided"
    );
  });
});
