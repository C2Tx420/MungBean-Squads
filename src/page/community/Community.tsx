import PrivateHeader from '../../components/header/private/PrivateHeader'
import ContentBox from '../../components/content-box'
import { Container } from '@radix-ui/themes'
import './style.scss'
import { useEffect, useState } from 'react'
import { useLocalStorage } from '../../hook/useLocalStorage'
import CommunityItem from '../../components/community-item'

export default function Community() {
    const { get } = useLocalStorage();
    const [vaultList,setVaultList] = useState([]);
    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        const vaultsData = await get('vaults');
        if(vaultsData) {
            const vaultList: any = [];
            await Object.keys(JSON.parse(vaultsData)).map((key,value) => {
                vaultList.push(JSON.parse(vaultsData)[key])
            });
            setVaultList(vaultList);
        }
    }
    return (
        <>
            <PrivateHeader />

            <div className="community">
                <Container>
                    <h2>Community</h2>
                    <ContentBox>
                        {vaultList.map((vault: any,idx: number)=>(
                            <CommunityItem key={idx} data={vault}/>
                        ))}
                    </ContentBox>
                </Container>
            </div>
        </>
    )
}
