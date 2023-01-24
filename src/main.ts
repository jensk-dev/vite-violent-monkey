import $ from "jquery";

import { myModule } from "./module";

export function logBody() {
  const body = $("body");
  console.log(body);
}

export function myScript() {
  myModule();
}

myScript();
logBody();
