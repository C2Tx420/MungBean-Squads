import ToggleTheme from '../../toggle-theme';
import './style.scss';

export default function PublicHeader() {
    return (
        <header className="header">
            <img src="/mungbean.png" width={40}
                height={40} />
            <div className="header__right">
                <ToggleTheme />
            </div>
        </header>
    )
}
