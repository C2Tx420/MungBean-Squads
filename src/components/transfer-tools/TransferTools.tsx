import { Button, Dialog, TextField } from '@radix-ui/themes'
import { timeout, toTitle } from '../../lib/utils'
import { useLocation } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import './style.scss'
import { useShyft } from '../../hook/useShyft'
import { useDispatch } from 'react-redux'
import { createToast } from '../../store/reducers/toast-reducer'
import { useWallet } from '@solana/wallet-adapter-react'
import { useSquads } from '../../hook/useSquads'
import { PublicKey } from '@solana/web3.js'

interface Props {
    type: string;
    vaultAddress: string;
    walletAddress: string;
    fetchData?: any;
    vaultIndex?: number
}

function TransferTools({ type, vaultAddress, walletAddress, fetchData, vaultIndex = 0 }: Props) {
    const location = useLocation();
    const { sendSol, sign } = useShyft();
    const { withdraw, excute } = useSquads();
    const dispatch = useDispatch();
    const wallet = useWallet();
    const [value, setValue] = useState<any>();
    const [disable, setDisable] = useState(false);
    const dialogRef: any = useRef(null);

    const handleTransfer = async (fromAddress: string, toAddress: string) => {
        setDisable(true);
        if (value && wallet.publicKey) {
            try {
                if (type === 'deposit') {
                    const tx = await sendSol(fromAddress, toAddress, Number(value));
                    await sign(wallet, tx)
                } else {
                    const withdrawData = await withdraw(new PublicKey(vaultAddress), value, vaultIndex);
                    await sign(wallet, withdrawData?.transactionBase64);
                    await timeout(1000);
                    await excute(wallet.publicKey, withdrawData?.transactionIndex);
                }
            } catch (e) {
                dispatch(createToast({
                    type: 'error', title: `${toTitle(type)} failed`,
                    desc: `Have some error when ${type}`
                }))
                console.log(e)
            } finally {
                setDisable(false);
                fetchData()
                setValue(null)
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
                    <TextField.Input placeholder="SOL Value" value={value || ''} onChange={(e) => setValue(e.currentTarget.value)} />
                    <div className="transfer-tools__desc-btn">
                        <Dialog.Close>
                            <Button ref={dialogRef} color='gray' variant='outline'>Cancel</Button>
                        </Dialog.Close>
                        <Button
                            disabled={disable}
                            onClick={() => {
                                handleTransfer(walletAddress, vaultAddress)
                            }
                            }>{toTitle(type)}
                        </Button>
                    </div>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    )
}

export default React.memo(TransferTools)