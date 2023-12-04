const axios = require("axios");

function somar(a, b) {
  return a + b;
}

function subtrair(a, b) {
  return a - b;
}

function sempreNulo() {
  return null;
}

function codigoValido(codigo) {
  if (codigo >= 100 && codigo <= 999) {
    return true;
  } else {
    return false;
  }
}

function inverterString(str) {
  if (str === null) {
    return null;
  } else if (typeof str !== "string") {
    return undefined;
  }

  return str.split("").reverse().join("");
}

function funcaoNaoTestada(valor) {
  return valor + 1;
}

async function getUsersFromApi() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users from API:", error);
    return [];
  }
}

module.exports = {
  somar,
  subtrair,
  sempreNulo,
  codigoValido,
  inverterString,
  funcaoNaoTestada,
  getUsersFromApi,
};
