import { Group, Inflection } from "../types";
import { getPastForm, getPotentialForm, inflect } from "../inflect";
import { describe, test, expect } from "@jest/globals";

describe("getPotentialForm", () => {
  test("it should return the ichidan form", () => {
    expect(getPotentialForm("食べる", Group.Ichidan)).toBe("食べられる");
  });

  test("it should return the godan form", () => {
    expect(getPotentialForm("飲む", Group.Godan)).toBe("飲める");
  });

  test("it should return 出来る for する", () => {
    expect(getPotentialForm("結婚する", Group.Irregular)).toBe("結婚できる");
  });

  test("it should return 来られる for 来る", () => {
    expect(getPotentialForm("くる", Group.Irregular)).toBe("来られる");
  });
});

describe("getTeForm", () => {
  test("it should return the ichidan form", () => {
    expect(inflect("上げる", Inflection.Te)).toBe("上げて");
  });

  test("it should return the godan form", () => {
    const cases = [
      ["泳ぐ", "泳いで"],
      ["書く", "書いて"],
      ["読む", "読んで"],
      ["死ぬ", "死んで"],
      ["飲む", "飲んで"],
      ["買う", "買って"],
      // ["走る", "走って"], fix this
      ["待つ", "待って"],
      ["消す", "消して"],
    ];

    cases.forEach(([input, expected]) => {
      expect(inflect(input, Inflection.Te)).toBe(expected);
    });
  });
});

describe("getPastForm", () => {
  test("it should return the ichidan form", () => {
    expect(getPastForm("上げる", Group.Ichidan)).toBe("上げた");
  });

  test("it should return the godan form", () => {
    const cases = [
      ["泳ぐ", "泳いだ"],
      ["書く", "書いた"],
      ["読む", "読んだ"],
      ["死ぬ", "死んだ"],
      ["飲む", "飲んだ"],
      ["買う", "買った"],
      ["走る", "走った"],
      ["待つ", "待った"],
      ["消す", "消した"],
    ];

    cases.forEach(([input, expected]) => {
      expect(getPastForm(input, Group.Godan)).toBe(expected);
    });
  });
});

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
