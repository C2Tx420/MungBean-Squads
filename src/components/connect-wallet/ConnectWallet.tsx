import { Text } from '@radix-ui/themes'
import './style.scss'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useLocation } from 'react-router-dom'

export default function ConnectWallet() {
    const location = useLocation();
    return (
        <div className="connect-wallet-modal">
            <h1 className='connect-wallet-modal__header'>
                Gm
                <img src="/mungbean.png" width={40}
                    height={40} />
            </h1>
            <div className="connect-wallet-modal__desc">
                {location.pathname.includes('community') ?
                <Text>Connect to explore Mungbean Community</Text>
                 :
                <Text>Connect to create Multisig and continue</Text>
                }
            </div>
            <div className="connect-wallet-modal__btn">
                <WalletMultiButton />
            </div>
        </div>
    )
}
