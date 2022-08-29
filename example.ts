import dora from './mod.ts';

const sleep = (milliseconds) => {
   return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function run () {
   let test = dora({ showCursor: false });
   test.start('Loading Dora...');
   await sleep(800);
   test.fail('Dora is not ready');

   test.start('Loading llama 🦙 Loading llama 🦙 Loading llama 🦙 Loading llama 🦙 Loading llama 🦙 Loading llama 🦙 Loading llama 🦙 ');
   await sleep(3000);
   test.succeed({ text: "Llama is loaded and ready to go!", icon: '🦙' });
}

run();
