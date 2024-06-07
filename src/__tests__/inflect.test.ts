import { Group, Inflection } from "../types";
import { inflect } from "../inflect";
import { describe, it, expect } from "@jest/globals";

describe("inflect", () => {
  it("it should throw on an unknown group", () => {
    expect(() => inflect("foo", "error" as unknown as Inflection)).toThrow(
      "invalid inflection provided, or not yet implemented!"
    );
  });

  it("it should use the group provided", () => {
    expect(inflect("食べる", Inflection.Potential, Group.Godan)).toBe(
      "食べれる"
    );
  });

  it("should inflect the continuous form", () => {
    expect(inflect("探す", Inflection.Continuous)).toBe("探している");
  });

  it("should inflect the causative form", () => {
    expect(inflect("知る", Inflection.Causative)).toBe("知らせる");
  });

  /**
   * these its aren't meant to be exhaustive, but to ensure that the correct case
   * in the switch statemenet is used. the actual it for each of the stems / forms are
   * captured in their own its
   */
  describe("godan", () => {
    const verb = "飲む";

    it("it should return the past form", () => {
      expect(inflect(verb, Inflection.NonPast)).toBe("飲む");
    });

    it("it should return the non-past form", () => {
      expect(inflect(verb, Inflection.Past)).toBe("飲んだ");
    });

    it("it should return the non-past polite form", () => {
      expect(inflect(verb, Inflection.NonPastPolite)).toBe("飲みます");
    });

    it("it should return the past polite form", () => {
      expect(inflect(verb, Inflection.PastPolite)).toBe("飲みました");
    });

    it("it should return the passive form", () => {
      expect(inflect(verb, Inflection.Passive)).toBe("飲まれる");
    });

    it("it should return the te form", () => {
      const cases = [
        ["飲む", "飲んで"],
        ["死ぬ", "死んで"],
        ["待つ", "待って"],
        ["泳ぐ", "泳いで"],
        ["書く", "書いて"],
        ["買う", "買って"],
        // ["走る", "走って"], fix this
        ["消す", "消して"],
      ];

      cases.forEach(([input, expected]) => {
        expect(inflect(input, Inflection.Te)).toBe(expected);
      });
    });

    it("it should return the potential form", () => {
      expect(inflect(verb, Inflection.Potential)).toBe("飲める");
    });
  });

  describe("ichidan", () => {
    it("it should return the non-past form", () => {
      expect(inflect("上げる", Inflection.NonPast)).toBe("上げる");
    });
  });
});
