import { describe, expect, test } from "@jest/globals";
import { inflect } from "../../inflect";
import { Group, Inflection } from "../../types";
import { getTeForm } from "../te";

describe("getTeForm", () => {
  test("it should return the ichidan form", () => {
    expect(getTeForm("上げる", Group.Ichidan)).toBe("上げて");
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
      expect(getTeForm(input, Group.Godan)).toBe(expected);
    });
  });
});
