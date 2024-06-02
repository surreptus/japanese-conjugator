import { describe, expect, test } from "@jest/globals";
import { getCombiningStem, getPoliteStem } from "../helpers";
import { Group } from "../types";

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

  test("it should throw on an unknown group", () => {
    expect(() => getPoliteStem("foo", "something" as unknown as Group)).toThrow(
      "could not return combining for unknown character group"
    );
  });
});

describe("getCombiningStem", () => {
  test("it should return the ichidan form", () => {
    expect(getCombiningStem("食べる", Group.Ichidan)).toBe("食べ");
  });

  test("it should return the godan form", () => {
    const cases = [
      ["泳ぐ", "泳い"],
      ["書く", "書い"],
      ["読む", "読ん"],
      ["死ぬ", "死ん"],
      ["飲む", "飲ん"],
      ["買う", "買っ"],
      ["走る", "走っ"],
      ["待つ", "待っ"],
      ["消す", "消し"],
    ];

    cases.forEach(([input, expected]) => {
      expect(getCombiningStem(input, Group.Godan)).toBe(expected);
    });
  });

  test("it should return the する form", () => {
    expect(getCombiningStem("勉強する", Group.Irregular)).toBe("勉強し");
  });

  test("it should return the 来る form", () => {
    expect(getCombiningStem("来る", Group.Irregular)).toBe("来");
  });

  test("it should throw on an unknown group", () => {
    expect(() =>
      getCombiningStem("foo", "something" as unknown as Group)
    ).toThrow("could not return combining for unknown character group");
  });
});
