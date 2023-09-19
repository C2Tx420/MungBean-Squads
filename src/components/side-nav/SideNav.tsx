import { NavLink } from 'react-router-dom'
import './style.scss'
import { HomeIcon, RocketIcon } from '@radix-ui/react-icons'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

export default function SideNav() {
    const theme = useSelector((state: RootState)=>state.theme)
    return (
        <div className={`sidenav ${theme}`}>
            <NavLink to='/dashboard' className="sidenav__item">
                <span>
                    <HomeIcon height={14} width={14}/>
                </span>
                Dashboard
            </NavLink>
            <NavLink to='/pockets' className="sidenav__item">
                <span>
                    <RocketIcon height={14} width={14} />
                </span>
                Shared Pockets
            </NavLink>
        </div>
    )
}
