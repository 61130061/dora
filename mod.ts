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
   info: '\u001b[34m' + 'ℹ' + '\u001b[0m',
   success: '\u001b[32m' + '✔' + '\u001b[0m',
   warning: '\u001b[33m' + '⚠' +'\u001b[0m',
   error: '\u001b[31m' + '✖' + '\u001b[0m'
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

   constructor (message: string) {
      this.#spinner = dots;
      this.#frameIndex = 0;
      this.#stream = Deno.stdout;
      this.#text = message;
   }

   frame() {
      const { frames } = this.#spinner;
      let frame = '\u001b[36m' + frames[this.#frameIndex] + '\u001b[0m';
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

      this.#interval = setInterval(this.render.bind(this), 80);
   }

   stop() {
      clearInterval(this.#interval);
      this.#interval = undefined;
      this.#frameIndex = 0;
      this.clear();
   }

   succeed(text: string) {
      this.stopAndPersist(symbols.success, text);
   }

   fail(text: string) {
      this.stopAndPersist(symbols.error, text);
   }

   warn(text: string) {
      this.stopAndPersist(symbols.warning, text);
   }

   info(text: string) {
      this.stopAndPersist(symbols.info, text);
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
