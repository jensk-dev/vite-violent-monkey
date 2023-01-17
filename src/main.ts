console.log("Hello World");

console.log(GM_listValues());

window.focus();

GM.deleteValue("test");

GM.registerMenuCommand("test", () => console.log("hello world"));

console.log("Hello World");

export {};
