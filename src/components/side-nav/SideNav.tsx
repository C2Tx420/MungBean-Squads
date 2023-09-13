import { NavLink } from 'react-router-dom'
import './style.scss'
import { RocketIcon } from '@radix-ui/react-icons'

export default function SideNav() {
    return (
        <div className='sidenav'>
            <NavLink to='/' className="sidenav__item">
                <span>
                    <RocketIcon height={14} width={14} />
                </span>
                Shared Pockets
            </NavLink>
            <NavLink to='/a' className="sidenav__item">
                <span>
                    <RocketIcon height={14} width={14} />
                </span>
                Shared Pockets
            </NavLink>
            <NavLink to='/b' className="sidenav__item">
                <span>
                    <RocketIcon height={14} width={14} />
                </span>
                Shared Pockets
            </NavLink>
            <NavLink to='/c' className="sidenav__item">
                <span>
                    <RocketIcon height={14} width={14} />
                </span>
                Shared Pockets
            </NavLink>
        </div>
    )
}
