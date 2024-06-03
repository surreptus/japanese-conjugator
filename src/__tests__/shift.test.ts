import { toA, toE, toI, toO } from "../shift";
import { describe, test, expect } from "@jest/globals";

describe("toI", () => {
  test("it should return the expected I vowel", () => {
    const cases = [
      [`う`, `い`],
      [`く`, `き`],
      [`す`, `し`],
      [`つ`, `ち`],
      [`ぬ`, `に`],
      [`ぶ`, `び`],
      [`む`, `み`],
      [`る`, `り`],
      [`ぐ`, `ぎ`],
    ];

    cases.forEach(([input, expected]) => {
      expect(toI(input)).toBe(expected);
    });
  });

  test("it should throw on a bogus character", () => {
    expect(() => toI("d")).toThrow("provided an unknown character!");
  });
});

describe("toA", () => {
  test("it should return the expected A vowel", () => {
    const cases = [
      [`う`, `わ`],
      [`く`, `か`],
      [`す`, `さ`],
      [`つ`, `た`],
      [`ぬ`, `な`],
      [`ぶ`, `ば`],
      [`む`, `ま`],
      [`る`, `ら`],
      [`ぐ`, `が`],
    ];

    cases.forEach(([input, expected]) => {
      expect(toA(input)).toBe(expected);
    });
  });

  test("it should throw on a bogus character", () => {
    expect(() => toA("d")).toThrow("provided an unknown character!");
  });
});

describe("toE", () => {
  test("it should return the expected E vowel", () => {
    const cases = [
      [`う`, `え`],
      [`く`, `け`],
      [`す`, `せ`],
      [`つ`, `て`],
      [`ぬ`, `ね`],
      [`ぶ`, `べ`],
      [`む`, `め`],
      [`る`, `れ`],
      [`ぐ`, `げ`],
    ];

    cases.forEach(([input, expected]) => {
      expect(toE(input)).toBe(expected);
    });
  });

  test("it should throw on a bogus character", () => {
    expect(() => toE("d")).toThrow("provided an unknown character!");
  });
});

describe("toO", () => {
  test("it should return the expected O vowel", () => {
    const cases = [
      ["う", "お"],
      ["く", "こ"],
      ["す", "そ"],
      ["つ", "と"],
      ["ぬ", "の"],
      ["ぶ", "ぼ"],
      ["む", "も"],
      ["る", "ろ"],
      ["ぐ", "ご"],
    ];

    cases.forEach(([input, expected]) => {
      expect(toO(input)).toBe(expected);
    });
  });

  test("it should throw on a bogus character", () => {
    expect(() => toO("d")).toThrow("provided an unknown character!");
  });
});
