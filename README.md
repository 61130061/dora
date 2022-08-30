# Dora

Imigrate to [deno](https://deno.land)🦕? 
Don't worry, Dora is funny terminal spinner for deno.
Dora does not use any NPM package to make sure that your project is still light.


## Install
```bash
echo "Sorry, dont have to install anything"
```

## Usage
```ts
import dora from './mod.ts';

const Dora = dora();

Dora.start('Loading Dora...');

setTimeout(() => {
   Dora.succeed('Dora is ready');
}, 1000);

```

## Feature
- [x] Show/Hide cursor option
- [x] Support multiple lines `‼️Beta‼️` with manually input the console columns
- [x] Customable final loading icon 🦙 🦁 🐼

coming soon feature...

- [ ] Indent your text
- [ ] Promise function
- [ ] Multiple ready to use spinner options
- [ ] Customable spinner
- [ ] Available for unsupport unicode user


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

#### .start(texts`string`)

#### .succeed(text`string`|options`object`)

Stop the spinner, clear spinner annd change it to `✔` or `option.icon` symbol (if provided) with new `text` or `options.text` if provided.


#### .fail(text`string`|options`object`)

Stop the spinner, clear spinner annd change it to `✖` or `option.icon` symbol (if provided) with new `text` or `options.text` if provided.


#### .warn(text`string`|options`object`)

Stop the spinner, clear spinner annd change it to `⚠` or `option.icon` symbol (if provided) with new `text` or `options.text` if provided.


#### .info(text`string`|options`object`)

Stop the spinner, clear spinner annd change it to `ℹ` or `option.icon` symbol (if provided) with new `text` or `options.text` if provided.


## Related
- [ora](https://github.com/sindresorhus/ora) Elegant terminal spinner


