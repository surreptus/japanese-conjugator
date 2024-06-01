import { Group, Inflection } from "../types";
import { getPoliteStem, getPotentialForm, inflect } from "../inflect";
import { describe, test, expect } from "@jest/globals";

describe("getPoliteStem", () => {
  test("it should return the ichidan form", () => {
    expect(getPoliteStem("食べる", Group.Ichidan)).toBe("食べ");
  });

  test("it should return the godan form", () => {
    expect(getPoliteStem("飲む", Group.Godan)).toBe("飲み");
  });

  test("it should return the する form", () => {
    expect(getPoliteStem("勉強する", Group.Irregular)).toBe("勉強し");
  });

  test("it should return the 来る form", () => {
    expect(getPoliteStem("来る", Group.Irregular)).toBe("来");
  });
});

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

describe("inflect", () => {
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
      expect(inflect(verb, Inflection.Te)).toBe("飲んで");
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
