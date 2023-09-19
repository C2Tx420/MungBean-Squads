import { ShyftSdk, Network } from '@shyft-to/js';
import { Connection, Transaction } from '@solana/web3.js';

const shyft = new ShyftSdk({ apiKey: import.meta.env.VITE_SHYFT_API_KEY, network: Network.Devnet });

export const useShyft = () => {
    const getBalance = async (pubKey: string) => {
        return await shyft.wallet.getBalance({wallet:pubKey})
    }

    const getHistoryTransaction = async (pubKey:string) => {
        return await shyft.transaction.history({account: pubKey});
    }

    const sendSol = async(fromAddress:string,toAddress:string,amount:number) => {
        return await shyft.wallet.sendSol({fromAddress,toAddress,amount})
    }
    
    const sign = async(wallet: any,tx: any,connection: Connection) => {
        const recoveredTransaction = Transaction.from(Buffer.from(tx, 'base64'));
        const signedTx = await wallet.signTransaction(recoveredTransaction);
        const confirmTransaction = await connection.sendRawTransaction(signedTx.serialize(),{skipPreflight: true});
        console.log(confirmTransaction)
        return confirmTransaction;
    }

    return {getBalance, getHistoryTransaction, sendSol, sign}
}