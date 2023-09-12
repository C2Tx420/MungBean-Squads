import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { toggleTheme } from '../../store/reducers/themeReducer';
import { IconButton } from '@radix-ui/themes';

export default function ToggleTheme() {
    const theme = useSelector((state: RootState) => state.theme);
    const dispatch = useDispatch();
    const size = 20;
    return (
        <IconButton variant="outline" className='toggleTheme' color='gray' onClick={()=>dispatch(toggleTheme())} size={'4'} style={{padding: 10, cursor: 'pointer'}}>
            {theme === 'dark' ?
                <MoonIcon width={size} height={size} />
                :
                <SunIcon width={size} height={size} />
            }
        </IconButton>
    )
}
