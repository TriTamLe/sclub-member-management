import { expect, test } from "vitest";

import { convertAvatarText } from "./convert-avatar-text";

test("Generate text on 1 letter string", () => {
  expect(convertAvatarText("Mike")).equal("M");
});
test("Generate text on 2 letters string", () => {
  expect(convertAvatarText("Larry John")).equal("LJ");
});
test("Generate text on number", () => {
  expect(convertAvatarText("987654321")).equal("9");
});
test("Generate default text on invalid value", () => {
  expect(convertAvatarText()).equal("C");
});
