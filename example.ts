import dora from './mod.ts';

const sleep = (milliseconds) => {
   return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function run () {
   const options = {
      showCursor: false, 
      width: 89, // columns of console
   }
   let Dora = dora(options);

   Dora.start('Loading Dora...');
   await sleep(3000);
   Dora.fail('Dora is not ready');

   Dora.spinner = [
      "🕛",
      "🕐",
      "🕑",
      "🕒",
      "🕓",
      "🕔",
      "🕕",
      "🕖",
      "🕗",
      "🕘",
      "🕙",
      "🕚"
   ];

   Dora.start('Loading llama 🦙...');
   await sleep(3000);
   Dora.succeed({ text: "Llama is loaded and ready to go!", icon: '🦙' });
}

run();
