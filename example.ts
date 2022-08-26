import { dora } from './mod.ts';

const sleep = (milliseconds) => {
   return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function run () {
   let test = dora();
   test.start('Loading Dora...');
   await sleep(3000);
   test.succeed('Dora is ready');

   test.start('Loading server 1...');
   await sleep(3000);
   test.succeed('Server 1 is ready');
}

run();
