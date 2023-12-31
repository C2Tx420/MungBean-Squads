import { Link } from 'react-router-dom';
import ToggleTheme from '../../toggle-theme';
import './style.scss';

export default function PublicHeader() {
    return (
        <header className="header">
            <Link to={'/'} style={{ height: 40, width: 40 }}>
                <img src="/mungbean.png" />
            </Link>
            <div className="header__right">
                <ToggleTheme />
            </div>
        </header>
    )
}
