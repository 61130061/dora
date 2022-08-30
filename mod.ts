import { wcswidth } from 'https://deno.land/x/tty/wcwidth.ts';

import { colors, cursor, clearAnsi } from './ansi.ts';

// Loading spinner 
// from https://github.com/sindresorhus/cli-spinners/blob/main/spinners.json
const dots = {
   "interval": 80,
   "frames": [
      "⠋",
      "⠙",
      "⠹",
      "⠸",
      "⠼",
      "⠴",
      "⠦",
      "⠧",
      "⠇",
      "⠏"
   ]
}

// Default symbols 
// from https://github.com/sindresorhus/log-symbols.git
const symbols = {
   info: 'ℹ',
   success: '✔',
   warning: '⚠',
   error: '✖'
}

/* ------ Dora based on Ora ------*/
class Dora {
   #stream;
   #frameIndex;
   #spinner;
   #interval;
   #text;
   #options;
   #color;
   #showCursor;
   #lines2clear = 0;
   #lineCount = 0;


   // options { message, color }
   constructor (options) {
      if (typeof options === 'string') {
         options = {
            text: options,
         }
      }

      this.#options = {
         color: 'cyan',
         stream: Deno.stderr,
         showCursor: false,
         ...options,
      };

      this.#spinner = dots;
      this.#frameIndex = 0;
      this.#color = this.#options.color;
      this.#stream = this.#options.stream;
      this.text = this.#options.text;
      this.#showCursor = this.#options.showCursor;

   }

   // TODO List
   // - [ ] Fine columns of console
   updateLineCount() {
      const columns = 80 // here
      this.#lineCount = 0;

      for (const line of clearAnsi(this.#text).split('\n')) {
         this.#lineCount += Math.max(1, Math.ceil(wcswidth(line) / columns));
      }
   }

   get text() {
      return this.#text;
   }

   set text(message) {
      this.#text = message || '';
      this.updateLineCount();
   }

   frame() {
      const { frames } = this.#spinner;
      let frame = colors[this.#color](frames[this.#frameIndex]);
      this.#frameIndex = ++this.#frameIndex % frames.length;
      const suffix = ' ' + this.#text;

      return frame + suffix;
   }

   // TODO
   // - [ ] Indent
   clear() {
      // Move cursor to the beginning of the line
      cursor.toHorizontal(this.#stream, 1);

      for (let i=0; i<this.#lines2clear; i++) {
         if (i > 0) {
            cursor.up(this.#stream);
         }
         cursor.clearLine(this.#stream);
      }

      this.#lines2clear = 0;
   }

   render() {
      this.clear();
      this.#stream.write(new TextEncoder().encode(this.frame()));
      this.#lines2clear = this.#lineCount;
   }

   start(text: string) {

      if (text) {
         this.text = text;
      }

      if (!this.#showCursor) {
         cursor.hide(this.#stream);
      }

      this.#interval = setInterval(this.render.bind(this), 80);
   }

   stop() {
      clearInterval(this.#interval);
      this.#interval = undefined;
      this.#frameIndex = 0;
      this.clear();
      if (!this.#showCursor) {
         cursor.show(this.#stream);
      }
   }

   succeed(options) {
      if (typeof options === 'string') {
         options = {
            text: options,
         }
      }

      const finalOptions = {
         icon: colors['green'](symbols.success),
         text: this.#text,
         ...options
      }

      this.stopAndPersist(finalOptions.icon, finalOptions.text);
   }

   fail(options) {
      if (typeof options === 'string') {
         options = {
            text: options,
         }
      }

      const finalOptions = {
         icon: colors['red'](symbols.error),
         text: this.#text,
         ...options
      }

      this.stopAndPersist(finalOptions.icon, finalOptions.text);
   }

   warn(options) {
      if (typeof options === 'string') {
         options = {
            text: options,
         }
      }

      const finalOptions = {
         icon: colors['yellow'](symbols.warning),
         text: this.#text,
         ...options
      }

      this.stopAndPersist(finalOptions.icon, finalOptions.text);
   }

   info(options) {
      if (typeof options === 'string') {
         options = {
            text: options,
         }
      }

      const finalOptions = {
         icon: colors['blue'](symbols.info),
         text: this.#text,
         ...options
      }

      this.stopAndPersist(finalOptions.icon, finalOptions.text);
   }

   stopAndPersist(icon: string = ' ', text: string) {
      this.stop();
      if (!text) {
         text = this.#text;
      }

      this.#stream.write(new TextEncoder().encode(icon + ' ' + text + '\n'));
   }
}

export default function dora(message) {
   return new Dora(message);
}
