# Micro frontends using iframes

This is a demo of how to use iframes to create micro front-ends using iframes.

## Creation of an iframe

The shell app gets a URL, fetches its HTML and renders it in an iframe.
After the HTML is being patched, we run the following

```typescript
 const doc = document.implementation.createHTMLDocument();
doc.documentElement.innerHTML = appHTML;
const base = doc.createElement('base');
base.href = getHref(appName); // the base URL of the app
// Writing content
iframe.contentDocument.open();
iframe.contentDocument.write(doc.documentElement.innerHTML);
iframe.contentDocument.close();
```

This way we can create an iframe with a base URL that is different from the shell's base URL and control its visibility only after it is loaded.

## Running the demo

All apps can be run inside docker containers.
 To run the demo, run the following commands:

```bash
docker-compose up -d
```

## Make all iframes friendly
All iframes runs on docker and lies behind an nginx proxy which has its own docker container. 

