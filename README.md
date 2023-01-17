# vite-violent-monkey
A vite template for development of violent monkey scripts

## Usage

* ``pnpm build`` - builds the script, using metadata and scriptname set in ``violentmonkey.metadata.js``
* ``pnpm dev`` - serves the script on build and watches the src folder for file changes. If track local file is turned on when importing into violentmonkey it will automatically update the script on file changes!  
*Note: concurrently, which is used to run both the builder and server simultaneously, seems to sometimes crash when exiting the script.* 

## CD Setup

This template supports auto publishing of violentmonkey scripts to a github gist, this can serve as a way to provide automatic updates to your script users.

To setup auto publishing you must set the following variables in your `repository > settings > secrets and variables > actions`:  

| Name  | Type | Expected Value |
| ------------- | ------------- | ------------- |
| GIST_ID  | Variable  | An existing gist's ID. Can be taken from the gist's URL e.g. `https://gist.github.com/<YOUR_GITHUB_USERNAME>/<GIST_ID>`  |
| GIST_FILE_NAME | Variable  | The file name to publish, set this to the filename of the violentmonkey script. e.g. ``example.user.js``  |
| PUBLISH_GIST  | Secret  | A [github personal access token](https://github.com/settings/tokens/) with the `gist` grant  |

After you've set all the variables, add the following to your `violentmonkey.metadata.js` file:

```js
// violentmonkey.metadata.js
import { defineMetadata } from "rollup-plugin-violent-monkey";

/**
 * Use the following method to define metadata for the script
 * Grants will automatically be added from code, but can be added manually nonetheless
 */
export default defineMetadata({
  downloadUrl: "https://gist.githubusercontent.com/<YOUR_GITHUB_USERNAME>/<GIST_ID>/raw/<GIST_FILE_NAME>",
  // ...
});
```
> Note: Due to caching it might take a few minutes before the update comes through in ViolentMonkey.
