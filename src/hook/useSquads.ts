import {
  WalletContextState,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionMessage,
} from "@solana/web3.js";
import * as multisig from "@sqds/multisig";
import { Permissions } from "@sqds/multisig/lib/types";
import { useShyft } from "./useShyft";
import { timeout } from "../lib/utils";

export const useSquads = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const { sign } = useShyft();

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
      tx.feePayer = wallet.publicKey;
      tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      const serializedTransaction = tx.serialize({
        requireAllSignatures: false,
        verifySignatures: true,
      });
      const transactionBase64 = serializedTransaction.toString("base64");

      await sign(wallet, transactionBase64);
    }
    // console.log(signature.keys[0].pubkey.toString());
  };

  const getMultisig = async () => {
    if (wallet.publicKey) {
      const { Multisig } = multisig.accounts;
      const [multisigPda] = multisig.getMultisigPda({
        createKey: wallet.publicKey,
      });
      try {
        const result = await Multisig.fromAccountAddress(
          connection,
          multisigPda
        );
        console.log(result)
        return result;
      } catch (e) {
        return false;
      }
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
    vaultPda: PublicKey,
    transactionIndex: bigint,
    value: number,
    vaultIndex: number
  ) => {
    const createKey = pubKey;
    const creator = pubKey;

    const [multisigPda] = multisig.getMultisigPda({
      createKey,
    });

    const transferInstruction = SystemProgram.transfer(
      // The transfer is being signed from the Squads Vault, that is why we use the VaultPda
      {
        fromPubkey: vaultPda,
        toPubkey: pubKey,
        lamports: value * LAMPORTS_PER_SOL,
      }
    );

    // Here we are adding all the instructions that we want to be executed in our transaction
    const testTransferMessage = new TransactionMessage({
      payerKey: pubKey,
      recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
      instructions: [transferInstruction],
    });

    const sig = multisig.instructions.vaultTransactionCreate({
      multisigPda,
      transactionIndex,
      creator,
      vaultIndex,
      ephemeralSigners: 0,
      transactionMessage: testTransferMessage,
    });

    return sig;
  };

  const createProposal = async (
    pubKey: PublicKey,
    transactionIndex: bigint
  ) => {
    const createKey = pubKey;
    const creator = pubKey;

    const [multisigPda] = multisig.getMultisigPda({
      createKey,
    });

    const sig = await multisig.instructions.proposalCreate({
      multisigPda,
      creator,
      transactionIndex,
    });

    return sig;
  };

  const approveProposal = async (
    createKey: PublicKey,
    pubKey: PublicKey,
    transactionIndex: bigint
  ) => {
    const member = pubKey;

    const [multisigPda] = multisig.getMultisigPda({
      createKey,
    });

    const sig = multisig.instructions.proposalApprove({
      multisigPda,
      transactionIndex,
      member,
    });

    return sig;
  };

  const excute = async (pubKey: PublicKey, transactionIndex: bigint) => {
    const createKey = pubKey;

    const [multisigPda] = multisig.getMultisigPda({
      createKey,
    });

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

    await sign(wallet, transactionBase64);
  };

  const addMember = async (pubKey: PublicKey) => {
    const { Permissions } = multisig.types;

    const multisigPda = multisig.getMultisigPda({
      createKey: pubKey,
    })[0];

    const member = Keypair.generate().publicKey;

    const multisigData: any = await getMultisig();

    const transactionIndex = multisigData.transactionIndex.words[0] + 1;

    const sig = await multisig.instructions.configTransactionCreate({
      multisigPda,
      creator: pubKey,
      transactionIndex,
      actions: [
        {
          __kind: "AddMember",
          newMember: {
            key: member,
            permissions: Permissions.all(),
          },
        },
      ],
    });

    const createProposalSig = await createProposal(pubKey, transactionIndex);
    const approveProposalSig = await approveProposal(pubKey, pubKey, transactionIndex);

    const excuteSig = await multisig.instructions.configTransactionExecute({
      multisigPda,
      transactionIndex,
      member: pubKey,
      rentPayer: pubKey
    });

    const tx = new Transaction();
    tx.add(sig);
    tx.add(createProposalSig);
    tx.add(approveProposalSig);
    tx.add(excuteSig);
    tx.feePayer = pubKey;
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    const serializedTransaction = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: true,
    });
    const transactionBase64 = serializedTransaction.toString("base64");

    await sign(wallet, transactionBase64);

    return member.toString();
  };

  const withdraw = async (vaultPda: PublicKey, value: number, vaultIndex: number) => {
    if (wallet.publicKey) {
      const pubKey = wallet.publicKey;
      const multisigData: any = await getMultisig();
      const transactionIndex = multisigData.transactionIndex.words[0] + 1;
      const createVaultSig = await createVaultTransaction(
        pubKey,
        vaultPda,
        transactionIndex,
        value,
        vaultIndex
      );
      const createPrososalSig = await createProposal(pubKey, transactionIndex);
      const approveProposalSig = await approveProposal(
        pubKey,
        pubKey,
        transactionIndex
      );

      const tx = new Transaction();
      tx.add(createVaultSig);
      tx.add(createPrososalSig);
      tx.add(approveProposalSig);
      tx.feePayer = pubKey;
      tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      const serializedTransaction = tx.serialize({
        requireAllSignatures: false,
        verifySignatures: true,
      });
      const transactionBase64 = serializedTransaction.toString("base64");

      return { transactionBase64, transactionIndex };
    }
  };

  const getVaultAddress = (createKey: PublicKey, index: number) => {
    const [multisigPda] = multisig.getMultisigPda({
      createKey,
    });
    const [vaultPda] = multisig.getVaultPda({
      multisigPda,
      index,
    });
    // console.log(vaultPda.toString());
    return vaultPda.toString();
  }

  const getTransactionInfo = async (createKey: PublicKey, indexTransaction: number) => {
    const {
      Transaction,
    } = multisig.accounts;
    const [multisigPda] = multisig.getMultisigPda({
      createKey,
    });

    const [transactionPda] = multisig.getTransactionPda({
      multisigPda,
      index: indexTransaction,
    });

    let transactionAccount = await Transaction.fromAccountAddress(
      connection,
      transactionPda
    );

    return transactionAccount;
  }

  return {
    createMultisig,
    getMultisig,
    getMainVault,
    createVaultTransaction,
    approveProposal,
    excute,
    createProposal,
    addMember,
    withdraw,
    getVaultAddress,
    getTransactionInfo
  };
};
