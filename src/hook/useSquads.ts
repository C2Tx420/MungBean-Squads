import { WalletContextState, useConnection } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import * as multisig from "@sqds/multisig";
import { Permissions } from "@sqds/multisig/lib/types";

export const useSquads = () => {
  const {connection} = useConnection()

  const createMultisig = async (wallet: WalletContextState) => {
    if(wallet.publicKey) {
      const createKey = wallet.publicKey;
  
      const creator = wallet.publicKey;
  
      const [multisigPda] = multisig.getMultisigPda({
        createKey,
      });
  
      const signature = await multisig.instructions.multisigCreate({
        createKey,
        creator,
        multisigPda,
        configAuthority: null,
        timeLock: 0,
        members: [
          {
            key: creator,
            permissions: Permissions.all(),
          },
        ],
        threshold: 1,
      });
      
      const tx = new Transaction()
      tx.add(signature)
      await wallet.sendTransaction(tx, connection)
      await wallet.signTransaction?.(tx)
    }
    // console.log(signature.keys[0].pubkey.toString());
  };

  const getMultisig = async (connection: Connection, pubkey: PublicKey) => {
    const { Multisig } = multisig.accounts;
    const [multisigPda] = multisig.getMultisigPda({
      createKey: pubkey,
  });
    const result = await Multisig.fromAccountAddress(connection, multisigPda);
    console.log(result);
  };
  return { createMultisig, getMultisig };
};
