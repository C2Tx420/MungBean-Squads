import { Avatar, Button, DropdownMenu, Separator } from '@radix-ui/themes';
import { useWallet } from '@solana/wallet-adapter-react'
import { useCopyToClipboard } from "react-use"
import { createAvatarURL, truncateWallet } from '../../lib/utils';
import { CopyIcon, ExitIcon } from '@radix-ui/react-icons';
import './style.scss';

export default function UserNav() {
    const { disconnect, publicKey } = useWallet();
    const [state, copyToClipboard] = useCopyToClipboard();

    return (
        <>
            {publicKey && (
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <Button variant="ghost" className="usernav__avatar" color='gray'>
                            <Avatar
                                src={createAvatarURL(publicKey?.toString()).href}
                                fallback={publicKey.toString().slice(0, 2)}
                            />
                        </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content className='usernav__content'>
                        <DropdownMenu.Label className='usernav__content-label'>
                            <p>{truncateWallet(publicKey.toString())}</p>
                        </DropdownMenu.Label>
                        <Separator size={'4'} />
                        <DropdownMenu.Item className='usernav__content-item' onClick={() => copyToClipboard(publicKey.toString())}>
                            <CopyIcon className='usernav__content-item-ico' />
                            <span>Copy address</span>
                        </DropdownMenu.Item>
                        <Separator size={'4'} />
                        <DropdownMenu.Item className='usernav__content-item' onClick={disconnect}>
                            <ExitIcon className='usernav__content-item-ico' />
                            <span>Log out</span>
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            )}
        </>
    )
}
