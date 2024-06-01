import { describe, expect, test } from "@jest/globals";
import { guess, isIrregular } from "../group";
import { Group } from "../types";

describe("guess", () => {
  test("it should return irregular for 来る", () => {
    expect(guess("来る")).toBe(Group.Irregular);
  });

  test("it should return ichidan for 食べる", () => {
    expect(guess("食べる")).toBe(Group.Ichidan);
  });

  test("it should return godan for 飲む", () => {
    expect(guess("飲む")).toBe(Group.Godan);
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
