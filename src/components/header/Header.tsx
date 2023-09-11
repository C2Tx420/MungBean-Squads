import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Header() {
    return (
        <header>
            <img src="/mungbean.png" width={50}
                height={50} />
            <WalletMultiButton />
        </header>
    )
}
