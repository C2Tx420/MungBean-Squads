import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import './style.scss';
import ToggleTheme from "../toggle-theme";

export default function Header() {
    return (
        <header className="header">
            <img src="/mungbean.png" width={50}
                height={50} />
            <div className="header__right">
                <ToggleTheme />
                <WalletMultiButton />
            </div>
        </header>
    )
}
