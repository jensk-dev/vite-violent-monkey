import { test } from "./mymod";

console.log("Hello World");

console.log(GM_listValues());

window.focus();

GM.deleteValue("test");

GM.registerMenuCommand("test", () => console.log("hello world"));

console.log(test);
console.log("last");

export {};
