import { Connection, Keypair } from "@solana/web3.js";
import * as multisig from "@sqds/multisig";
import { Permissions } from "@sqds/multisig/lib/types";

export const useSquads = () => {
  const connection = new Connection(
    "https://rpc.helius.xyz/?api-key=1ba00d42-c9d3-4459-89b1-2c48142aacbc"
  );

  const createMultisig = async () => {
    const createKey = Keypair.generate().publicKey;

    // Creator should be a Keypair or a Wallet Adapter wallet
    const creator = Keypair.generate();

    // Derive the multisig PDA
    const [multisigPda] = multisig.getMultisigPda({
        createKey,
    });

    const signature = await multisig.rpc.multisigCreate({
      connection,
      // One time random Key
      createKey,
      // The creator & fee payer
      creator,
      // The PDA of the multisig you are creating, derived by a random PublicKey
      multisigPda,
      // Here the config authority will be the system program
      configAuthority: null,
      // Create without any time-lock
      timeLock: 0,
      // List of the members to add to the multisig
      members: [
        {
          // Members Public Key
          key: creator.publicKey,
          // Members permissions inside the multisig
          permissions: Permissions.all(),
        },
      ],
      // This means that there needs to be 2 votes for a transaction proposal to be approved
      threshold: 2,
    });

    console.log("Multisig created: ", signature);
  };

  return { createMultisig };
};
