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
| GIST_ID  | Variable  | An existing gist's ID. Can be taken from the gist's URL. See [The Gist URL Structure](#the-gist-url-structure)  |
| GIST_FILE_NAME | Variable  | The file name to publish, set this to the filename of the violentmonkey script. e.g. `example.user.js`  |
| PUBLISH_GIST  | Secret  | A [github personal access token](https://github.com/settings/tokens/) with the `gist` grant  |

After you've set all the variables, add the latest gist link to your `violentmonkey.metadata.ts` file (See [The Gist URL Structure](#the-gist-url-structure)):

```js
// violentmonkey.metadata.ts
import { defineMetadata } from "rollup-plugin-violent-monkey";

/**
 * Use the following method to define metadata for the script
 * Grants will automatically be added from code, but can be added manually nonetheless
 */
export default defineMetadata({
  downloadUrl: "https://gist.githubusercontent.com/<GITHUB_USERNAME>/<GIST_ID>/raw/<GIST_FILE_NAME>",
  // ...
});
```
> Note: Due to caching it might take a few minutes before the update comes through in ViolentMonkey.

### The Gist URL Structure

Gist URLS consist of several parts:

![Gist url structure](https://user-images.githubusercontent.com/1756725/213194722-df083263-3836-4044-9105-2e495cce54fc.png)

#### Gist URL to the latest version

To get the url to the latest version of your gist, simply remove the version hash from the url.

So the following url:  
`https://gist.githubusercontent.com/jensk-dev/25d395950b32514d50888dc7e4e4ce7d/raw/c7bd08e395e1abcfbed74598dbf6ed67ce03cbc9/example.user.js`  
Would become:  
`https://gist.githubusercontent.com/jensk-dev/25d395950b32514d50888dc7e4e4ce7d/raw/example.user.js`
