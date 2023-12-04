const axios = require("axios");
const {
  somar,
  subtrair,
  sempreNulo,
  codigoValido,
  inverterString,
  getUsersFromApi,
} = require("./funcoes");

describe("somar", () => {
  test("deve retornar a soma de dois números", () => {
    expect(somar(2, 3)).toBe(5);
    expect(somar(2, 2)).toBe(4);
    expect(somar(-1, 5)).toBe(4);
    expect(somar(0, 0)).toBe(0);
  });
});

describe("subtrair", () => {
  test("deve retornar a diferença entre dois números", () => {
    expect(subtrair(5, 2)).toBe(3);
    expect(subtrair(10, 5)).toBe(5);
    expect(subtrair(0, 0)).toBe(0);
  });
});

describe("sempreNulo", () => {
  test("deve retornar null", () => {
    expect(sempreNulo()).toBeNull();
  });

  test("deve retornar null quando passado um número", () => {
    expect(sempreNulo(10)).toBeNull();
    expect(sempreNulo(-5)).toBeNull();
    expect(sempreNulo(0)).toBeNull();
  });

  test("deve retornar null quando passado uma string", () => {
    expect(sempreNulo("hello")).toBeNull();
    expect(sempreNulo("")).toBeNull();
  });

  test("deve retornar null quando passado um objeto", () => {
    expect(sempreNulo({})).toBeNull();
    expect(sempreNulo({ name: "John", age: 25 })).toBeNull();
  });

  test("deve retornar null quando passado um array", () => {
    expect(sempreNulo([])).toBeNull();
    expect(sempreNulo([1, 2, 3])).toBeNull();
  });
});

describe("codigoValido", () => {
  test("deve retornar false para valores menores que 100", () => {
    expect(codigoValido(99)).toBe(false);
    expect(codigoValido(0)).toBe(false);
    expect(codigoValido(-1)).toBe(false);
  });

  test("deve retornar false para valores maiores que 999", () => {
    expect(codigoValido(1000)).toBe(false);
    expect(codigoValido(1001)).toBe(false);
    expect(codigoValido(2000)).toBe(false);
  });

  test("deve retornar true para valores dentro do intervalo [100, 999]", () => {
    expect(codigoValido(100)).toBe(true);
    expect(codigoValido(500)).toBe(true);
    expect(codigoValido(999)).toBe(true);
  });

  test("deve retornar false para valores não numéricos", () => {
    expect(codigoValido("abc")).toBe(false);
    expect(codigoValido(null)).toBe(false);
    expect(codigoValido(undefined)).toBe(false);
    expect(codigoValido({})).toBe(false);
    expect(codigoValido([])).toBe(false);
  });
});

//escreva o teste primeiro

describe("inverterString", () => {
  test.each([
    ["hello", "olleh"],
    ["", ""],
    ["12345", "54321"],
    ["aBcDeF", "FeDcBa"],
    ["123abc", "cba321"],
    ["", ""],
    [null, null],
    [undefined, undefined],
    [123, undefined],
    [{}, undefined],
    [[], undefined],
  ])("deve inverter a string %p corretamente", (str, expected) => {
    expect(inverterString(str)).toBe(expected);
  });
});

//A funçãoNaoTestada não foi testada intencionalmente.

describe("getUsersFromApi", () => {
  test("deve retornar uma lista de usuários da API", async () => {
    const users = await getUsersFromApi();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
    expect(users[0]).toHaveProperty("id");
    expect(users[0]).toHaveProperty("name");
    expect(users[0]).toHaveProperty("email");
  });

  test("deve lidar com erros ao buscar usuários da API", async () => {
    const mockError = new Error("Error fetching users from API:");
    axios.get = jest.fn().mockRejectedValueOnce(mockError);
    console.error = jest.fn();

    const users = await getUsersFromApi();

    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBe(0);
    expect(console.error).toHaveBeenCalledWith(
      "Error fetching users from API:",
      mockError
    );
  });
});
