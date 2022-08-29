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

   // Bug when there are more than 1 line
   clear() {
      this.#stream.write(new TextEncoder().encode('\r\x1b[K'));
      //console.log('hi');
      cursor.home(this.#stream);
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

export default function dora(message) {
   return new Dora(message);
}
