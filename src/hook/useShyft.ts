import { ShyftSdk, Network } from '@shyft-to/js';

const shyft = new ShyftSdk({ apiKey: import.meta.env.VITE_SHYFT_API_KEY, network: Network.Devnet });

export const useShyft = () => {
    const getBalance = async (pubKey: string) => {
        return await shyft.wallet.getBalance({wallet:pubKey})
    }

    const getHistoryTransaction = async (pubKey:string) => {
        return await shyft.transaction.history({account: pubKey});
    }

    return {getBalance, getHistoryTransaction}
}