import { Link } from 'react-router-dom';
import ToggleTheme from '../../toggle-theme';
import UserNav from '../../user-nav';
import './style.scss';

export default function PrivateHeader() {
    return (
        <header className="header">
            <Link to={'/'}>
                <img src="/mungbean.png" width={40}
                    height={40} />
            </Link>
            <div className="header__right">
                <ToggleTheme />
                <UserNav />
            </div>
        </header>
    )
}
