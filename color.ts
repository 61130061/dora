// ANSI Styling
const ansiStyles = {
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

const styles = Object.create(null);

for (const [styleName, style] of Object.entries(ansiStyles)) {
   styles[styleName] = (text: string) => {
      if (typeof text !== 'string') {
         text = ''
      }

      return `\u001b[${style[0]}m${text}\u001b[0m`
   }
}

export default styles;
