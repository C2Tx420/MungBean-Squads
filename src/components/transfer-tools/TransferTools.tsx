import { Button, Dialog, TextField } from '@radix-ui/themes'
import { toTitle } from '../../lib/utils'
import { useLocation } from 'react-router-dom'
import React from 'react'
import './style.scss'

interface Props {
    type: string
}

function TransferTools({ type }: Props) {
    const location = useLocation()
    console.log(location.pathname)
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                {type === 'deposit' ?
                    <Button size={"3"}>Deposit</Button>
                    :
                    <Button size={"3"} variant='outline' color='gray'>Withdraw</Button>
                }
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 500 }}>
                <Dialog.Title className='transfer-tools__title'>{toTitle(type)}</Dialog.Title>
                <div className='transfer-tools__desc'>
                    {location.pathname === '/dashboard' &&
                        <>
                            <TextField.Input placeholder="SOL Value" />
                            <div className="transfer-tools__desc-btn">
                                <Dialog.Close>
                                    <Button color='gray' variant='outline'>Cancel</Button>
                                </Dialog.Close>
                                <Button>{toTitle(type)}</Button>
                            </div>
                        </>
                    }
                </div>
            </Dialog.Content>
        </Dialog.Root>
    )
}

export default React.memo(TransferTools)