# Dora 🦖

> **WARNING**: This module is unstable since getting console columns in deno is quite difficult rn [Read](https://doc.deno.land/deno/unstable/~/Deno.consoleSize).
There might be some bug when you change the size of terminal while running.
If anyone have a way, feel free to contribute.

<img src="/docs/demo.gif" alt="Dora terminal demo" width="420"/>

Imigrate to [deno](https://deno.land)🦕? 
Don't worry, Dora is funny terminal spinner for deno.
Dora does not use any NPM package to make sure that your project is still light.


## Feature
- [x] Show/Hide cursor option [Read](#doraoptionstext)
- [x] Support multiple lines `‼️Beta‼️` with manually input the console columns
- [x] Customable final icon 🦙 🦁 🐼 [Read](#instance)
- [x] Customable spinner [Read](#spinner-write-only)

coming soon feature...

- [ ] Indent your text
- [ ] Promise function
- [ ] Multiple ready to use spinner options
- [ ] Available for unsupport unicode user


## Install
```bash
echo "Sorry, dont have to install anything"
```

## Usage
```ts
import dora from 'https://deno.land/x/dora@0.1.0/mod.ts';

const Dora = dora();

Dora.start('Loading Dora...');

setTimeout(() => {
   Dora.succeed('Dora is ready');
}, 1000);

```


## API

### dora(options|text)

#### text `string`

#### options `object`

| Name       |    Type   | Default | Description                                                                                                                  |
|------------|:---------:|:-------:|------------------------------------------------------------------------------------------------------------------------------|
| text       |  `string` |   null  | Message shown during loading. You can leave it be and input it later when you use start().                                   |
| color      |  `string` |   cyan  | Color of the spinner. (available color: `cyan`, `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `white`)               |
| showCursor | `boolean` |  false  | Show/Hide cursor during load is running.                                                                                     |
| width      |   `int`   |    80   | Width (columns) of your console.  This option will impact your spinner when there are multiple lines of text in one spinner. |

### Instance

#### .start(text <sup>`string`</sup>)

Start the spinner and set text to `text` if provided.


#### .succeed(text <sup>`string`</sup>|options <sup>`object`</sup>)

| Name |   Type   | Default | Description                                                                                            |
|------|:--------:|:-------:|--------------------------------------------------------------------------------------------------------|
| text | `string` | null    | New text that will be shown when the spinner is stopped. (If not provided, it will show loading text.) |
| icon | `string` | `✔`     | New symbol when the spinner is stopped.                                                                |

Stop the spinner, clear spinner annd change it to `✔` symbol with new `text` if provided.


#### .fail(text <sup>`string`</sup>|options <sup>`object`</sup>)

| Name |   Type   | Default | Description                                                                                            |
|------|:--------:|:-------:|--------------------------------------------------------------------------------------------------------|
| text | `string` | null    | New text that will be shown when the spinner is stopped. (If not provided, it will show loading text.) |
| icon | `string` | `✖`     | New symbol when the spinner is stopped.                                                                |

Stop the spinner, clear spinner annd change it to `✖` symbol with new `text` if provided.


#### .warn(text <sup>`string`</sup>|options <sup>`object`</sup>)

| Name |   Type   | Default | Description                                                                                            |
|------|:--------:|:-------:|--------------------------------------------------------------------------------------------------------|
| text | `string` | null    | New text that will be shown when the spinner is stopped. (If not provided, it will show loading text.) |
| icon | `string` | `⚠`     | New symbol when the spinner is stopped.                                                                |

Stop the spinner, clear spinner annd change it to `⚠` symbol with new `text` if provided.


#### .info(text <sup>`string`</sup>|options <sup>`object`</sup>)

| Name |   Type   | Default | Description                                                                                            |
|------|:--------:|:-------:|--------------------------------------------------------------------------------------------------------|
| text | `string` | null    | New text that will be shown when the spinner is stopped. (If not provided, it will show loading text.) |
| icon | `string` | `ℹ`     | New symbol when the spinner is stopped.                                                                |

Stop the spinner, clear spinner annd change it to `ℹ` symbol with new `text` if provided.


#### .text `read/write`

Type: `string`

Read and write text of the dora.


#### .color `read/write`

Type: `string`

Read and write color of spinner [check available color](#doraoptionstext).


#### .spinner `write only`

Type: `Array` of `string`

Change the spinner of the dora. 
> **NOTE**: Don't have one? Find some [here](https://github.com/sindresorhus/cli-spinners/blob/main/spinners.json).

```ts
dora.text = 'Trying new spinner...';
dora.color = 'blue';
dora.spinner = [
   "[    ]",
   "[=   ]",
   "[==  ]",
   "[=== ]",
   "[ ===]",
   "[  ==]",
   "[   =]",
   "[    ]",
   "[   =]",
   "[  ==]",
   "[ ===]",
   "[====]",
   "[=== ]",
   "[==  ]",
   "[=   ]"
]

dora.start();
```




## Related
- [ora](https://github.com/sindresorhus/ora) Elegant terminal spinner


