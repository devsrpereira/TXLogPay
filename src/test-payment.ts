import {
  createTestnetWallet,
  sendTestPayment,
} from "./services/stellar.service";

async function test() {
  const wallet = await createTestnetWallet();

  console.log("DESTINATION:", wallet.publicKey);

  const result = await sendTestPayment(wallet.publicKey, "25");

  console.log(result);
}

test();