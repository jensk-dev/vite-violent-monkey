import { defineMetadata } from "rollup-plugin-violent-monkey";

/**
 * The filename of the script, excluding the .user.js suffix
 */
export const script = "example";

/**
 * Use the following method to define metadata for the script
 * Grants will automatically be added from code, but can be added manually nonetheless
 */
export default defineMetadata({
  name: "Example Script",
  downloadUrl: `https://gist.githubusercontent.com/jensk-dev/25d395950b32514d50888dc7e4e4ce7d/raw/${script}.user.js`,
  localizedName: {
    "de-DE": "Beispielskript",
    "nl-NL": "Voorbeeld script"
  },
  namespace: "example-namespace",
  include: "*://*.*.*/*",
  version: "1.0",
  description: "An example script for rollup-plugin-violent-monkey",
  localizedDescription: {
    "de-DE": "Ein Beispielskript für rollup-plugin-violent-monkey"
  },
  grants: ["GM_addElement", "GM.addStyle", "window.focus", "window.close", "GM_deleteValue"],
  resources: {
    resource1: "https://google.com",
    resource2: "https://bing.com"
  }
});
