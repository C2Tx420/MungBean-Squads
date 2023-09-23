import { useLocation, useNavigate } from "react-router-dom"
import PrivateHeader from "../../components/header/private/PrivateHeader"
import { Container } from "@radix-ui/themes";
import ContentBox from "../../components/content-box";
import './style.scss'
import TransferTools from "../../components/transfer-tools";
import { useEffect, useState } from "react";
import { useSquads } from "../../hook/useSquads";
import { useShyft } from "../../hook/useShyft";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import * as Progress from '@radix-ui/react-progress';
import QrTransfer from "../../components/qr-transfer";



export default function CommunityDetail() {
    const { state: data } = useLocation();
    const navigate = useNavigate();
    const [vaultAddress, setVaultAddress] = useState('');
    const [balance, setBalance] = useState(0);
    const [progress, setProgress] = useState(0)
    const { getVaultAddress } = useSquads();
    const { getBalance } = useShyft();
    const wallet = useWallet()
    if (!data) {
        navigate('/community')
    }
    const fetchData = async () => {
        const vaultAddress = await getVaultAddress(new PublicKey(data.createKey), data.vaultIndex);
        setVaultAddress(vaultAddress);
        const balance = await getBalance(vaultAddress);
        setBalance(balance)
        setProgress(balance)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            fetchData();
        }, 60000);

        return () => {
            clearInterval(interval)
        }
    }, [])
    const desc = { __html: data.desc };
    return (
        <>
            <PrivateHeader />
            <Container>
                <div className="detail-wrapper">
                    <ContentBox>
                        <div className="detail">
                            <div className="detail__left">
                                <div className="detail__left-img">
                                    <img src={data.img} alt="" />
                                </div>
                                <p className='pocket-item__content-balance'>{balance}/{data.target} <span>SOL</span></p>
                                <Progress.Root className="ProgressRoot" value={progress}>
                                    <Progress.Indicator
                                        className="ProgressIndicator"
                                        style={{ transform: `translateX(-${Number(data.target) - progress}%)` }}
                                    />
                                </Progress.Root>
                                {wallet.publicKey &&
                                    <div className="detail__left-transfer">
                                        <div className="detail__left-transfer-btn">
                                            <TransferTools fetchData={fetchData} type="deposit" vaultAddress={vaultAddress} walletAddress={wallet.publicKey.toString()} />
                                        </div>
                                        <div className="detail__left-transfer-btn">
                                            <QrTransfer />
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="detail__content">
                                <h2 className="detail__content-title">
                                    {data.name}
                                </h2>
                                <p className="detail__content-addr">{vaultAddress}</p>
                                <div className="detail__content-desc" dangerouslySetInnerHTML={desc}>
                                </div>
                            </div>
                        </div>
                    </ContentBox>
                </div>
            </Container>
        </>
    )
}
