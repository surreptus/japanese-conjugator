import { describe, expect, test } from "@jest/globals";
import {
  getCombiningStem,
  getPoliteStem,
  guessGroup,
  isIrregular,
} from "../helpers";
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

  test("should throw for an unknown godan ending", () => {
    expect(() => getCombiningStem("ず", Group.Godan)).toThrow(
      "could not return combining form for unknown character group: ず"
    );
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

describe("guessGroup", () => {
  test("it should return irregular for 来る", () => {
    expect(guessGroup("来る")).toBe(Group.Irregular);
  });

  test("it should return ichidan for 食べる", () => {
    expect(guessGroup("食べる")).toBe(Group.Ichidan);
  });

  test("it should return godan for 飲む", () => {
    expect(guessGroup("飲む")).toBe(Group.Godan);
  });
});

describe("isIrregular", () => {
  test("it should return true for する", () => {
    expect(isIrregular("する")).toBe(true);
  });

  test("it should return true for 来る", () => {
    expect(isIrregular("来る")).toBe(true);
  });

  test("it should return true for くる", () => {
    expect(isIrregular("くる")).toBe(true);
  });
});
