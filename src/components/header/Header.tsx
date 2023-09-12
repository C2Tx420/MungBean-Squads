import './style.scss';
import ToggleTheme from "../toggle-theme";
import UserNav from "../user-nav/";

export default function Header() {
    return (
        <header className="header">
            <img src="/mungbean.png" width={40}
                height={40} />
            <div className="header__right">
                <ToggleTheme />
                <UserNav />
            </div>
        </header>
    )
}
