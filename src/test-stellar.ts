import { createTestnetWallet } from "./services/stellar.service";

async function test() {
  const wallet = await createTestnetWallet();

  console.log(wallet);
}

test();