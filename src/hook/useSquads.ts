import {
  WalletContextState,
  useConnection,
} from "@solana/wallet-adapter-react";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionMessage,
} from "@solana/web3.js";
import * as multisig from "@sqds/multisig";
import { Permissions } from "@sqds/multisig/lib/types";

export const useSquads = () => {
  const { connection } = useConnection();

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

      const tx = new Transaction();
      tx.add(signature);
      await wallet.sendTransaction(tx, connection);
      await wallet.signTransaction?.(tx);
    }
    // console.log(signature.keys[0].pubkey.toString());
  };

  const getMultisig = async (connection: Connection, pubkey: PublicKey) => {
    const { Multisig } = multisig.accounts;
    const [multisigPda] = multisig.getMultisigPda({
      createKey: pubkey,
    });
    try {
      const result = await Multisig.fromAccountAddress(connection, multisigPda);
      return result;
    } catch (e) {
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
    // console.log(vaultPda.toString());
    return vaultPda.toString();
  };

  const createVaultTransaction = async (
    pubKey: PublicKey,
    vaultPda: PublicKey
  ) => {
    const createKey = pubKey;
    const creator = pubKey;

    const [multisigPda] = multisig.getMultisigPda({
      createKey,
    });

    const transactionIndex = 1n;

    const transferInstruction = SystemProgram.transfer(
      // The transfer is being signed from the Squads Vault, that is why we use the VaultPda
      {
        fromPubkey: vaultPda,
        toPubkey: pubKey,
        lamports: 0.1 * LAMPORTS_PER_SOL,
      }
    );

    // Here we are adding all the instructions that we want to be executed in our transaction
    const testTransferMessage = new TransactionMessage({
      payerKey: vaultPda,
      recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
      instructions: [transferInstruction],
    });

    // await multisig.rpc.vaultTransactionCreate({
    //   connection,
    //   feePayer,
    //   multisigPda,
    //   transactionIndex,
    //   creator: feePayer.publicKey,
    //   vaultIndex: 0,
    //   ephemeralSigners: 0,
    //   transactionMessage: testTransferMessage,
    // });

    const sig = multisig.instructions.vaultTransactionCreate({
      multisigPda,
      transactionIndex,
      creator,
      vaultIndex: 0,
      ephemeralSigners: 0,
      transactionMessage: testTransferMessage,
    });

    const tx = new Transaction();
    tx.add(sig);
    tx.feePayer = pubKey;
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    const serializedTransaction = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: true,
    });
    const transactionBase64 = serializedTransaction.toString("base64");
    return {
      encoded_transaction: transactionBase64,
    };
  };

  const createProposal = async (pubKey: PublicKey) => {
    const createKey = pubKey;
    const creator = pubKey;

    const [multisigPda] = multisig.getMultisigPda({
      createKey,
    });

    const transactionIndex = 1n;
    const sig = await multisig.instructions.proposalCreate({
      multisigPda,
      creator,
      transactionIndex,
    });
    const tx = new Transaction();
    tx.add(sig);
    tx.feePayer = pubKey;
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    const serializedTransaction = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: true,
    });
    const transactionBase64 = serializedTransaction.toString("base64");
    return {
      encoded_transaction: transactionBase64,
    };
  };

  const approveProposal = async (pubKey: PublicKey) => {
    const createKey = pubKey;
    const member = pubKey;

    const [multisigPda] = multisig.getMultisigPda({
      createKey,
    });

    const transactionIndex = 1n;
    const sig = multisig.instructions.proposalApprove({
      multisigPda,
      transactionIndex,
      member,
    });

    const tx = new Transaction();
    tx.add(sig);
    tx.feePayer = pubKey;
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    const serializedTransaction = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: true,
    });
    const transactionBase64 = serializedTransaction.toString("base64");
    return {
      encoded_transaction: transactionBase64,
    };
  };

  const excute = async (pubKey: PublicKey) => {
    const createKey = pubKey;

    const [multisigPda] = multisig.getMultisigPda({
      createKey,
    });
    const transactionIndex = 1n;
    // const [proposalPda] = multisig.getProposalPda({
    //   multisigPda,
    //   transactionIndex,
    // });

    const sig = await multisig.instructions.vaultTransactionExecute({
      connection,
      multisigPda,
      transactionIndex,
      member: pubKey,
    });

    const tx = new Transaction();
    tx.add(sig.instruction);
    tx.feePayer = pubKey;
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    const serializedTransaction = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: true,
    });
    const transactionBase64 = serializedTransaction.toString("base64");
    return {
      encoded_transaction: transactionBase64,
    };
  };

  const addMember = async (pubKey: PublicKey) => {
    const { Permissions } = multisig.types;

    const multisigPda = multisig.getMultisigPda({
      createKey: pubKey,
    })[0];

    const member = Keypair.generate().publicKey;

    const sig = multisig.instructions.multisigAddMember({
      multisigPda,
      configAuthority: pubKey,
      rentPayer: pubKey,
      newMember: {
        key: member,
        permissions: Permissions.all(),
      },
    });

    const tx = new Transaction();
    tx.add(sig);
    tx.feePayer = pubKey;
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    const serializedTransaction = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: true,
    });
    const transactionBase64 = serializedTransaction.toString("base64");
    return {
      encoded_transaction: transactionBase64,
    };
  };

  return {
    createMultisig,
    getMultisig,
    getMainVault,
    createVaultTransaction,
    approveProposal,
    excute,
    createProposal,
    addMember
  };
};
