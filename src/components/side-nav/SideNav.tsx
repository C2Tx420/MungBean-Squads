import { NavLink } from 'react-router-dom'
import './style.scss'
import { GearIcon, HomeIcon, RocketIcon, PersonIcon, Pencil2Icon, CountdownTimerIcon } from '@radix-ui/react-icons'
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
                Vaults
            </NavLink>
            <NavLink to='/members' className="sidenav__item">
                <span>
                    <PersonIcon height={14} width={14} />
                </span>
                Members
            </NavLink>
            <NavLink to='/members' className="sidenav__item">
                <span>
                    <Pencil2Icon height={14} width={14} />
                </span>
                Transactions
            </NavLink>
            <NavLink to='/members' className="sidenav__item">
                <span>
                    <CountdownTimerIcon height={14} width={14} />
                </span>
                History Transaction
            </NavLink>
            <NavLink to='/config' className="sidenav__item">
                <span>
                    <GearIcon height={14} width={14}/>
                </span>
                Config
            </NavLink>
        </div>
    )
}
