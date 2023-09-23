import { useEffect, useState } from "react";
import { truncateWallet } from "../../lib/utils";
import { useSquads } from "../../hook/useSquads";
import { useShyft } from "../../hook/useShyft";
import * as Progress from '@radix-ui/react-progress';
import { PublicKey } from "@solana/web3.js";
import './style.scss'
import { useNavigate } from "react-router-dom";


export default function CommunityItem({ data }: any) {
    const [vaultAddress, setVaultAddress] = useState('');
    const [balance, setBalance] = useState(0);
    const [progress, setProgress] = useState(0)
    const { getVaultAddress } = useSquads();
    const { getBalance } = useShyft();
    const navigate = useNavigate();

    const fetchData = async () => {
        const vaultAddress = await getVaultAddress(new PublicKey(data.createKey), data.vaultIndex);
        setVaultAddress(vaultAddress);
        const balance = await getBalance(vaultAddress);
        setBalance(balance)
        setProgress(balance)
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleChangeRoute = () => {
        navigate(`/community/${data.address}`,{state: data})
    }
    return (
        <div className="community-item" onClick={handleChangeRoute}>
            <div className="pocket-item">
                <div className="pocket-item__img">
                    <img src={data.img} alt="" />
                </div>
                <div className="pocket-item__content">
                    <p className='pocket-item__content-name'>{data.name}</p>
                    <p className='pocket-item__content-addr'>{truncateWallet(vaultAddress)}</p>
                    <p className='pocket-item__content-balance'>{balance}/{data.target} <span>SOL</span></p>
                    <Progress.Root className="ProgressRoot" value={progress}>
                        <Progress.Indicator
                            className="ProgressIndicator"
                            style={{ transform: `translateX(${(progress * 100) / Number(data.target) - 100 }%)` }}
                        />
                    </Progress.Root>
                </div>
            </div>
        </div>
    )
}
