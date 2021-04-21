const Crypto = require("./Crypto");

test("Token generated should be unique", () => {
  const tokens = [];
  for (let i = 1; i < 10; i++) {
    tokens.push(Crypto.generateToken());
  }
  const uniqueTokens = new Set(tokens);
  const unique = uniqueTokens.size === tokens.length;

  expect(unique).toStrictEqual(true);
});
