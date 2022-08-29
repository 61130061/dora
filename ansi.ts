// ANSI Styling
const ESC = '\u001b[';
const RESET = '\u001b[0m';

const ansiColor = {
   black: [30, 39],
   red: [31, 39],
   green: [32, 39],
   yellow: [33, 39],
   blue: [34, 39],
   magenta: [35, 39],
   cyan: [36, 39],
   white: [37, 39],

   // Bright color
   blackBright: [90, 39],
   redBright: [91, 39],
   greenBright: [92, 39],
   yellowBright: [93, 39],
   blueBright: [94, 39],
   magentaBright: [95, 39],
   cyanBright: [96, 39],
   whiteBright: [97, 39],
}

const ansiCursor = {
   show: "?25h",
   hide: "?25l",

   clear_line: "0K",
   up: "1A",
   back: 'D',
}

const colors = Object.create(null);
const cursor = Object.create(null);

// Generate Color
for (const [styleName, style] of Object.entries(ansiColor)) {
   colors[styleName] = (text: string) => {
      if (typeof text !== 'string') {
         text = ''
      }

      return ESC + style[0] + 'm' + text + RESET;
   }
}

// Generate Cursor
for (const [styleName, style] of Object.entries(ansiCursor)) {
   cursor[styleName] = (stream, step=null) => {
      if (step) {
         return stream.write(new TextEncoder().encode(ESC + step + style));
      }

      return stream.write(new TextEncoder().encode(ESC + style));
   }
}

// ANSI Regex Cleaner
function clearAnsi(text: string) {
   const  pattern = [
      '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
      '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))'
   ].join('|');
   
   const reg = new RegExp(pattern);
   return text.replace(reg, '');
}

export {
   colors,
   cursor,
   clearAnsi
}
