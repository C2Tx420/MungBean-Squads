import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Permissions } from "@sqds/multisig/lib/types";
import { multisigCreate } from "@sqds/multisig/lib/rpc";
import { Button } from "@radix-ui/themes";
import { getMultisigPda } from "@sqds/multisig";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export default function Home() {
  const { connection } = useConnection();
  const wallet = useWallet()
  // const { createMultisig } = useSquads();
  const test = async () => {
    const createKey = Keypair.generate().publicKey;

    // Creator should be a Keypair or a Wallet Adapter wallet
    const creator: any = Keypair.generate();

    console.log(creator)

    // Derive the multisig PDA
    const [multisigPda] = getMultisigPda({
      createKey,
    });

    await multisigCreate({
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
      threshold: 1,
    });

    // console.log("Multisig created: ", signature);
  }

  return (
    <div>
      Home
      <Button onClick={test}>create</Button>
    </div>
  )
}
