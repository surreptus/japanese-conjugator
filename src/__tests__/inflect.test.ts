import { Group, Inflection } from "../types";
import { inflect } from "../inflect";
import { describe, it, expect } from "@jest/globals";

describe("inflect", () => {
  const verb = "飲む";

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
    expect(inflect(verb, Inflection.Te)).toBe("飲んで");
  });

  it("it should return the potential form", () => {
    expect(inflect(verb, Inflection.Potential)).toBe("飲める");
  });
});
