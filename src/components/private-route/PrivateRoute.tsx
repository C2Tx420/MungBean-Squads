import { useWallet } from '@solana/wallet-adapter-react';
import { Outlet } from 'react-router-dom'
import ConnectWallet from '../connect-wallet/ConnectWallet';

export default function PrivateRoute() {
    const {publicKey} = useWallet()
    return (
        <>
            {!publicKey ?
                <ConnectWallet/>
                :
                <Outlet />
            }
        </>
    )
}
