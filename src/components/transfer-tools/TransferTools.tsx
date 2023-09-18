import { Button, Dialog, TextField } from '@radix-ui/themes'
import { toTitle } from '../../lib/utils'
import { useLocation } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import './style.scss'
import { useShyft } from '../../hook/useShyft'
import { useDispatch } from 'react-redux'
import { createToast } from '../../store/reducers/toast-reducer'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'

interface Props {
    type: string;
    vaultAddress: string;
    walletAddress: string;
}

function TransferTools({ type, vaultAddress, walletAddress }: Props) {
    const location = useLocation();
    const { sendSol, sign } = useShyft();
    const dispatch = useDispatch();
    const wallet = useWallet();
    const { connection } = useConnection();
    const [value, setValue] = useState<any>();
    const [disable, setDisable] = useState(false);
    const dialogRef: any = useRef(null);

    const send = async (fromAddress: string, toAddress: string) => {
        setDisable(true);
        if (value) {
            try {
                const tx = await sendSol(fromAddress, toAddress, Number(value));
                await sign(wallet, tx, connection)
            } catch (e) {
                dispatch(createToast({
                    type: 'error', title: `${toTitle(type)} failed`,
                    desc: `Have some error when ${type}`
                }))
                console.log(e)
            } finally {
                await setDisable(false);
                dialogRef.current.click();
            }
        }
    }


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
                            <TextField.Input placeholder="SOL Value" value={value || ''} onChange={(e) => setValue(e.currentTarget.value)} />
                            <div className="transfer-tools__desc-btn">
                                <Dialog.Close>
                                    <Button ref={dialogRef} color='gray' variant='outline'>Cancel</Button>
                                </Dialog.Close>
                                <Button disabled={disable} onClick={() => { if (type === 'deposit') { send(walletAddress, vaultAddress) } else { send(vaultAddress, walletAddress) } }}>{toTitle(type)}</Button>
                            </div>
                        </>
                    }
                </div>
            </Dialog.Content>
        </Dialog.Root>
    )
}

export default React.memo(TransferTools)