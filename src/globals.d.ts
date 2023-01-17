/**
 * Exports ViolentMonkey's API types
 */
export declare global {
  declare const unsafeWindow: Window & typeof globalThis;

  type JSONLeaf = string | number | boolean | null | object;
  type JSONSerializable = JSONLeaf | Array<JSONLeaf>;

  // An object that exposes information about the current userscript. It has following properties:
  type GMInfo = {
    // A unique ID of the script.
    uuid: string;
    // The meta block of the script.
    scriptMetaStr: string;
    // Whether the script will be updated automatically.
    scriptWillUpdate: string;
    // The name of userscript manager, which should be the string Violentmonkey.
    scriptHandler: string;
    // Version of Violentmonkey.
    version: string;
    // Unlike navigator.userAgent, which can be overriden by other extensions/userscripts or by devtools in device-emulation mode,
    // GM_info.platform is more reliable as the data is obtained in the background page of Violentmonkey using a specialized
    // extension API (browser.runtime.getPlatformInfo and getBrowserInfo).
    platform: {
      arch: "arm" | "mips" | "mips64" | "x86-32" | "x86-64";
      browserName: string;
      browserVersion: string;
      os: "android" | "cros" | "linux" | "mac" | "openbsd" | "win";
    };
    // Contains structured fields from the Metadata Block:
    script: {
      description: string;
      excludes: string[];
      includes: string[];
      matches: string[];
      name: string;
      namespace: string;
      resources: { name: string; url: string }[];
      runAt: string;
      version: string;
    };
    // The injection mode of current script. See @inject-mode for more information.
    injectInto: string;
  };
  declare const GM_info: GMInfo;

  // Retrieves a value for current script from storage.
  declare function GM_getValue<T>(key: string, defaultValue: T): T | undefined;

  // Sets a key / value pair for current script to storage.
  declare function GM_setValue<T extends JSONSerializable>(
    key: string,
    value: T
  ): void;

  // Deletes an existing key / value pair for current script from storage.
  declare function GM_deleteValue(key: string): void;

  // Returns an array of keys of all available values within this script.
  declare function GM_listValues(): string[];

  // Adds a change listener to the storage and returns the listener ID.
  type GM_valueListenerID = number;
  /**
   * callback: (name, oldValue, newValue, remote) => void
   *   name: string
   *     The name of the observed variable
   *   oldValue: T
   *     The old value of the observed variable (undefined if it was created)
   *   newValue: T
   *     The new value of the observed variable (undefined if it was deleted)
   *   remote: boolean
   *     true if modified by the userscript instance of another tab or false for this script instance. Can be used by scripts of different browser tabs to communicate with each other.
   */
  type GM_addValueChangeListenerCallback<T> = (
    key: string,
    oldValue: T,
    newValue: T,
    remote: boolean
  ) => void;
  // Adds a change listener to the storage and returns the listener ID.
  declare function GM_addValueChangeListener<T>(
    key: string,
    callback: GM_addValueChangeListenerCallback<T>
  ): GM_valueListenerID;
  // Removes a change listener by its ID.
  declare function GM_removeValueChangeListener(
    listenerId: GM_valueListenerID
  ): void;
  // Retrieves a text resource from the metadata block.
  declare function GM_getResourceText(name: string): string | undefined;
  /**
   *
   * @param name string - Name of a resource defined in the metadata block.
   * @param isBlobUrl boolean = true
   *   true returns a blob: URL. It's short and cacheable, so it's good for reusing in multiple DOM elements.
   *   false returns a data: URL. It's long so reusing it in DOM may be less performant
   *     due to the lack of caching, but it's particularly handy for direct synchronous decoding of the data on sites that forbid fetching blob: in their CSP.
   */
  declare function GM_getResourceURL(
    name: string,
    isBlobUrl: boolean
  ): string | undefined;
  type HTMLAttributeMap = { [attribute: string]: string };
  // Appends and returns an element with the specified attributes.
  type GMAddElementNode = Node | Element | ShadowRoot | null | undefined;
  declare function GM_addElement(
    parentNode: GMAddElementNode,
    tagName: string,
    attributes?: HTMLAttributeMap
  ): HTMLElement;
  // Appends and returns a <style> element with the specified CSS.
  declare function GM_addStyle(css: string): HTMLElement;

  type OpenTabOptions = {
    active: boolean;
    container?: number;
    insert: boolean;
    pinned: boolean;
  };
  type TabControl = {
    onclose: (() => void) | null;
    closed: boolean;
    close: () => void;
  };
  // Opens URL in a new tab.
  declare function GM_openInTab(
    url: string,
    options?: OpenTabOptions
  ): TabControl;
  declare function GM_openInTab(
    url: string,
    openInBackground: boolean
  ): TabControl;

  type MenuCommandId = number;
  type MenuCommandCaption = string;

  /**
   * Registers a command in Violentmonkey popup menu.
   * @param caption - string - The name to show in the popup menu.
   * @param onClick - (event) => void
   *   When the command is clicked in the menu, this function will run with the following parameter:
   *   event: MouseEvent | KeyboardEvent- since VM2.13.1 is the event that activated the command so you can check event.button, event.shiftKey, event.key, and so on.
   */
  declare function GM_registerMenuCommand(
    caption: MenuCommandCaption,
    onClick: (event: MouseEvent | KeyboardEvent) => void
  ): MenuCommandId;
  declare function GM_unregisterMenuCommand(caption: MenuCommandCaption): void;

  type NotificationControl = {
    remove: () => Promise<void>;
  };

  type NotificationControlOptions = {
    // Main text of the notification.
    text: string;
    // Title of the notification.
    title?: string;
    // URL of an image to show in the notification.
    image?: string;
    // Callback when the notification is clicked by user.
    onclick?: () => void;
    // Callback when the notification is closed, either by user or by system.
    ondone?: () => void;
  };

  // Shows an HTML5 desktop notification.
  declare function GM_notification(
    options: NotificationControlOptions
  ): NotificationControl;
  declare function GM_notification(
    text: string,
    title?: string,
    image?: string,
    onclick?: () => void
  ): NotificationControl;

  /**
   * Sets data to system clipboard.
   * @param data {string} The data to be copied to system clipboard.
   * @param type {string|null|undefined} The MIME type of data to copy. (default text/plain)
   */
  declare function GM_setClipboard(data: string, type?: string): void;

  interface GMXMLHttpRequest<T> {
    status: number;
    statusText: string;
    readyState: number;
    responseHeaders: string;
    response: string | Blob | ArrayBuffer | Document | object | null;
    responseText: string | undefined; // only provided when available
    responseXML?: Document | null; // only provided when available
    lengthComputable?: boolean; // only provided when available
    loaded?: number; // only provided when available
    total?: number; // only provided when available
    finalUrl: string; // the final URL after redirection,
    context: T; // the same context object you specified in details
  }

  type GMXMLHttpRequestControl = {
    abort: () => void;
  };

  type GMRequestBase<T> = {
    // URL relative to current page is also allowed.
    url: string;

    // User for authentication.
    user?: string;

    // Password for authentication.
    password?: string;

    // For example { 'name1': 'value1', 'name2': 'value2' }.
    // Some special headers are also allowed:
    //    'Cookie'
    //    'Host'
    //    'Origin'
    //    'Referer'
    //    'User-Agent'
    headers?: { [header: string]: string };

    // Time to wait for the request, none by default.
    timeout?: number;

    // Can be an object and will be assigned to context of the response object.
    context?: T;

    // When set to true, no cookie will be sent with the request and since VM2.12.5 the response cookies will be ignored.
    // When absent, an inverted value of Greasemonkey4-compatible withCredentials is used. Note that Violentmonkey sends cookies by default, like Tampermonkey, but unlike Greasemonkey4 (same-origin url only).
    anonymous?: boolean;

    // Each event handler is a function that accepts one argument responseObject
    onabort?: <T>(responseObject: GMXMLHttpRequest<T>) => void;
    onerror?: <T>(responseObject: GMXMLHttpRequest<T>) => void;
    onload?: <T>(responseObject: GMXMLHttpRequest<T>) => void;
    onloadend?: <T>(responseObject: GMXMLHttpRequest<T>) => void;
    onloadstart?: <T>(responseObject: GMXMLHttpRequest<T>) => void;
    onprogress?: <T>(responseObject: GMXMLHttpRequest<T>) => void;
    onreadystatechange?: <T>(responseObject: GMXMLHttpRequest<T>) => void;
    ontimeout?: <T>(responseObject: GMXMLHttpRequest<T>) => void;
  };

  type GMXMLHttpRequestDetails<T> = GMRequestBase<T> & {
    // Usually GET.
    method?: string;
    // A MIME type to specify with the request.
    overrideMimeType?: string;

    responseType?: "text" | "json" | "blob" | "arraybuffer" | "document";

    // Data to send with the request, usually for POST and PUT requests.
    data?:
      | string
      | ArrayBuffer
      | Blob
      | DataView
      | FormData
      | ReadableStream
      | URLSearchParams;

    // Send the data string as a blob. This is for compatibility with Tampermonkey/Greasemonkey, where only string type is allowed in data.
    binary?: boolean;
  };

  declare function GM_xmlhttpRequest<T>(
    details: GMXMLHttpRequestDetails<T>
  ): GMXMLHttpRequestControl;

  type GMDownloadOptions<T> = GMRequestBase<T> & {
    name: string;
  };

  declare function GM_download<T>(
    options: GMDownloadOptions<T>
  ): GMXMLHttpRequestControl;
  declare function GM_download<T>(
    url: string,
    name: string
  ): GMXMLHttpRequestControl;

  const GM: {
    addStyle: (css: string) => HTMLElement;
    addElement: (
      parentNode: GMAddElementNode,
      tagName: string,
      attributes?: HTMLAttributeMap
    ) => HTMLElement;
    registerMenuCommand: (
      caption: MenuCommandCaption,
      onClick: (event: MouseEvent | KeyboardEvent) => void
    ) => MenuCommandId;
    deleteValue: (key: string) => void;
    getResourceUrl: (
      name: string,
      isBlobUrl: boolean
    ) => Promise<string | undefined>;
    getValue: <T>(key: string, defaultValue: T) => Promise<T | undefined>;
    info: GMInfo;
    listValues: () => Promise<string[]>;
    notification: (
      textOrOptions: NotificationControlOptions | string,
      title?: string,
      image?: string,
      onclick?: () => void
    ) => NotificationControl;
    openInTab: (
      url: string,
      optionsOrOpenInBackground: OpenTabOptions | boolean
    ) => TabControl;
    /**
     * Sets data to system clipboard.
     * @param data {string} The data to be copied to system clipboard.
     * @param type {string|null|undefined} The MIME type of data to copy. (default text/plain)
     */
    setClipboard: (data: string, type?: string) => void;
    setValue: <T extends JSONSerializable>(key: string, value: T) => void;
    xmlHttpRequest: <T>(
      details: GMXMLHttpRequestDetails<T>
    ) => GMXMLHttpRequestControl;
  };
}
