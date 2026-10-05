import { describe, expect, it } from "vitest";
import { getPasswordProblem, getSignUpProblem } from "@/src/lib/authValidation";
import { PASSWORD_MIN_LENGTH } from "@/src/constant/app";

const VALID_PASSWORD = "x".repeat(PASSWORD_MIN_LENGTH);

describe("getPasswordProblem", () => {
  it("requires the minimum length", () => {
    const short = "x".repeat(PASSWORD_MIN_LENGTH - 1);
    expect(getPasswordProblem(short, short)).toMatch(/at least/);
  });

  it("requires matching passwords", () => {
    expect(getPasswordProblem(VALID_PASSWORD, `${VALID_PASSWORD}!`)).toMatch(/identical/);
    expect(getPasswordProblem(VALID_PASSWORD, VALID_PASSWORD)).toBeNull();
  });
});

describe("getSignUpProblem", () => {
  const values = { email: "a@b.test", password: VALID_PASSWORD, repeatPassword: VALID_PASSWORD };

  it("requires accepting the terms", () => {
    expect(getSignUpProblem({ ...values, acceptedTerms: false })).toMatch(/Terms of Service/);
  });

  it("passes for a complete form", () => {
    expect(getSignUpProblem({ ...values, acceptedTerms: true })).toBeNull();
  });
});
