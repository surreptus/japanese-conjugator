import { describe, expect, test } from "@jest/globals";
import { getPastForm } from "../past";
import { Group } from "../../types";

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
