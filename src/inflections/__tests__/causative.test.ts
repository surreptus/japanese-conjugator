import { describe, expect, it } from "@jest/globals";
import { getCausativeForm } from "../causative";
import { Group } from "../../types";
import { get } from "http";

describe("causative", () => {
  it("should inflect godan verbs", () => {
    const cases = [["飲む", "飲ませる"]];

    cases.forEach(([verb, expected]) => {
      expect(getCausativeForm(verb, Group.Godan)).toBe(expected);
    });
  });

  it("should inflect ichidan verbs", () => {
    expect(getCausativeForm("調べる", Group.Ichidan)).toBe("調べさせる");
  });

  it("should inflect irregular verbs", () => {
    expect(getCausativeForm("する", Group.Irregular)).toBe("させる");
    expect(getCausativeForm("来る", Group.Irregular)).toBe("来させる");
  });

  it("should throw an error if no group is matched", () => {
    expect(() => getCausativeForm("test", "invalid" as Group)).toThrowError(
      "invalid group provided"
    );
  });
});
