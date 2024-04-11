import { writable } from "svelte/store";

let var_name, code_str;

export const defaultName = "myVariableName";
export const defaultCode = "let intermediate = 11+12;\nintermediate*3";

let variables = undefined;
export var variableStore = writable(undefined);
export var modifyStore = writable(false);

export const checkVarName = function (event) {
  if (variables !== null) {
    let value = !var_name()?.value ? defaultName : var_name().value;
    let is_modify = variables.some((eq) => eq.name == value);
    modifyStore.set(is_modify);
  }
};

export const addCode = function (event) {
  event.preventDefault();
  sendPost(
    !var_name()?.value ? defaultName : var_name().value,
    !code_str()?.value ? defaultCode : code_str().value,
  );
};

// send same code again fotr recalculation
export const recalcCode = function (index) {
  sendPost(variables[index].name, variables[index].code);
};

// sets the form to the values for modificaton
export const modifyCode = function (index) {
  var_name().value = variables[index].name;
  code_str().value = variables[index].code;
  checkVarName();
};

// send delete via replacing with no code
export const deleteCode = function (index) {
  sendPost(variables[index].name, "");
};

// send refresh via sending nothing
export const refreshCode = function () {
  sendPost("", "");
};

// send the post to the server
function sendPost(name, code) {
  fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, code }),
  })
    .then(async (response) => {
      if (response.status == 200) {
        const text = await response.text();
        const obj = JSON.parse(text);
        variables = obj;
      } else if (response.status == 401) {
        variables = null;
      } else {
        console.log("got unknown code:", response.status);
        variables = null;
      }
      variableStore.set(variables)
    })
    .then(checkVarName);
}

window.onload = () => {
  var_name = () => document.querySelector("#name");
  code_str = () => document.querySelector("#value");
  refreshCode();
}
