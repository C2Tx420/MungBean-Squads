import { PublicKey } from '@solana/web3.js';
import { encodeURL, createQR } from '@solana/pay';
import BigNumber from 'bignumber.js';
import { useConnection } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { Button, Dialog } from '@radix-ui/themes';
import { timeout } from '../../lib/utils';
import './style.scss'

export default function QRTransfer() {
    const { connection } = useConnection();

    // useEffect(() => {
    //     createQr();
    // }, [])

    const createQr = async() => {
        const recipient = new PublicKey('DCCJdBRVojMEroLpAYgNcMjHrj44evBhg9yEwqPYdA5W');
        // const amount = new BigNumber(1);
        const label = 'Deposit';
        const message = 'message';

        const url = encodeURL({ recipient, label, message });
        const qrCode = createQR(url);
        await timeout(100)
        const div: any = document.getElementById('transfer-qr');
        qrCode.append(div)
    }
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button size={"3"} onClick={createQr}>Deposit with QR</Button>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 450, overflow: "hidden" }}>
                <Dialog.Title>Deposit with Qr</Dialog.Title>
                <div id="transfer-qr"></div>
            </Dialog.Content>
        </Dialog.Root>
    )
}
