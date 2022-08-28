import { colors, cursor } from './ansi.ts';

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


// ANSI Regex Cleaner
function ansiClear(text: string) {
   const  pattern = [
      '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
      '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))'
   ].join('|');
   
   const reg = new RegExp(pattern);
   return text.replace(reg, '');
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
      this.#text = this.#options.message;
      this.#showCursor = this.#options.showCursor;
   }

   frame() {
      const { frames } = this.#spinner;
      let frame = colors[this.#color](frames[this.#frameIndex]);
      this.#frameIndex = ++this.#frameIndex % frames.length;
      const suffix = ' ' + this.#text;

      return frame + suffix;
   }

   clear() {
      this.#stream.write(new TextEncoder().encode('\r\x1b[K'));
   }

   render() {
      this.clear();
      this.#stream.write(new TextEncoder().encode(this.frame()));
   }

   start(text: string) {
      if (text) {
         this.#text = text;
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

   succeed(text: string) {
      this.stopAndPersist(colors['green'](symbols.success), text);
   }

   fail(text: string) {
      this.stopAndPersist(colors['red'](symbols.error), text);
   }

   warn(text: string) {
      this.stopAndPersist(colors['yellow'](symbols.warning), text);
   }

   info(text: string) {
      this.stopAndPersist(colors['blue'](symbols.info), text);
   }

   stopAndPersist(prefix: string = ' ', text: string) {
      this.stop();
      if (!text) {
         text = this.#text;
      }

      this.#stream.write(new TextEncoder().encode(prefix + ' ' + text + '\n'));
   }
}

export function dora(message) {
   return new Dora(message);
}
