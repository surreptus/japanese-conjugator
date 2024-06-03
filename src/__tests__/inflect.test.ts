import { Group, Inflection } from "../types";
import { inflect } from "../inflect";
import { describe, test, expect } from "@jest/globals";

describe("inflect", () => {
  test("it should throw on an unknown group", () => {
    expect(() => inflect("foo", "error" as unknown as Inflection)).toThrow(
      "invalid inflection provided, or not yet implemented!"
    );
  });

  test("it should use the group provided", () => {
    expect(inflect("食べる", Inflection.Potential, Group.Godan)).toBe(
      "食べれる"
    );
  });

  /**
   * these tests aren't meant to be exhaustive, but to ensure that the correct case
   * in the switch statemenet is used. the actual test for each of the stems / forms are
   * captured in their own tests
   */
  describe("godan", () => {
    const verb = "飲む";

    test("it should return the past form", () => {
      expect(inflect(verb, Inflection.NonPast)).toBe("飲む");
    });

    test("it should return the non-past form", () => {
      expect(inflect(verb, Inflection.Past)).toBe("飲んだ");
    });

    test("it should return the non-past polite form", () => {
      expect(inflect(verb, Inflection.NonPastPolite)).toBe("飲みます");
    });

    test("it should return the past polite form", () => {
      expect(inflect(verb, Inflection.PastPolite)).toBe("飲みました");
    });

    test("it should return the te form", () => {
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

    test("it should return the potential form", () => {
      expect(inflect(verb, Inflection.Potential)).toBe("飲める");
    });
  });

  describe("ichidan", () => {
    test("it should return the non-past form", () => {
      expect(inflect("上げる", Inflection.NonPast)).toBe("上げる");
    });
  });
});
