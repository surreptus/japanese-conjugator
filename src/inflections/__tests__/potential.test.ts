import { describe, expect, test } from "@jest/globals";
import { getPotentialForm } from "../potential";
import { Group } from "../../types";

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
