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

export const useSquads = () => {
  const { connection } = useConnection();
  const wallet = useWallet();

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
    transactionIndex: bigint
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
    pubKey: PublicKey,
    transactionIndex: bigint
  ) => {
    const createKey = pubKey;
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

    return sig;
  };

  const addMember = async (pubKey: PublicKey) => {
    const { Permissions } = multisig.types;

    const multisigPda = multisig.getMultisigPda({
      createKey: pubKey,
    })[0];

    const member = Keypair.generate().publicKey;

    const multisigData: any = await getMultisig();

    const sig = await multisig.instructions.configTransactionCreate({
      multisigPda,
      creator: pubKey,
      transactionIndex: multisigData.transactionIndex.words.length,
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

  const withdraw = async (vaultPda: PublicKey) => {
    if (wallet.publicKey) {
      const pubKey = wallet.publicKey;
      const multisigData: any = await getMultisig();
      const transactionIndex = multisigData.transactionIndex.words.length;
      const createVaultSig = await createVaultTransaction(
        pubKey,
        vaultPda,
        transactionIndex
      );
      const createPrososalSig = await createProposal(pubKey, transactionIndex);
      const approveProposalSig = await approveProposal(
        pubKey,
        transactionIndex
      );
      const excuteProposalSig = await excute(pubKey, transactionIndex);

      const tx = new Transaction();
      tx.add(createVaultSig);
      tx.add(createPrososalSig);
      tx.add(approveProposalSig);
      tx.add(excuteProposalSig.instruction);
      tx.feePayer = pubKey;
      tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      const serializedTransaction = tx.serialize({
        requireAllSignatures: false,
        verifySignatures: true,
      });
      const transactionBase64 = serializedTransaction.toString("base64");
      return transactionBase64
    }
  };

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
  };
};
