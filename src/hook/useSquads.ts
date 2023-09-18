import { WalletContextState, useConnection } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import * as multisig from "@sqds/multisig";
import { Multisig } from "@sqds/multisig/lib/generated";
import { Permissions } from "@sqds/multisig/lib/types";

export const useSquads = () => {
  const { connection } = useConnection()

  const createMultisig = async (wallet: WalletContextState) => {
    if (wallet.publicKey) {
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
    try{
      const result = await Multisig.fromAccountAddress(connection, multisigPda);
      console.log(result);
      console.log(result.configAuthority.toString());
      console.log(result.members[0].key.toString());
      return result;
    } catch(e) {
      return false;
    }
  };

  const getMainVault = async (createKey: PublicKey) => {
    const [multisigPda] = multisig.getMultisigPda({
      createKey,
    });
    const [vaultPda] = multisig.getVaultPda({
      multisigPda,
      index: 0,
    });
    console.log(vaultPda.toString())
    return vaultPda.toString();
  }

  const createVaultTransaction = (createKey: PublicKey) => {
    const [multisigPda] = multisig.getMultisigPda({
      createKey,
    });
    const [vaultPda] = multisig.getVaultPda({
      multisigPda,
      index: 0,
    });
    // await multisig.instructions.vaultTransactionCreate({multisigPda,})
  }
  return { createMultisig, getMultisig, getMainVault };
};
