import { Button, Dialog, TextField, Text, TextArea, Flex, Switch } from '@radix-ui/themes'
import { useSquads } from '../../hook/useSquads'
import { useWallet } from '@solana/wallet-adapter-react';
import { useShyft } from '../../hook/useShyft';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '../../hook/useLocalStorage';
import { genVaultIndex } from '../../lib/utils';

export default function AddVault({ fetchData }: any) {
    const { addMember, getVaultAddress } = useSquads();
    const { get, set } = useLocalStorage();
    const wallet = useWallet();
    const { sign } = useShyft();
    const [form, setForm] = useState({ name: '', desc: '', img: '', target: '', public: false });
    const handleAddVault = async () => {
        if (wallet.publicKey) {
            // const address = await addMember(wallet.publicKey);
            const vaultListStorage: any = get('vaults');
            const vaultListData = JSON.parse(vaultListStorage);
            const vaultIndex = genVaultIndex(JSON.parse(vaultListStorage));
            const address = await getVaultAddress(wallet.publicKey, vaultIndex)
            console.log(vaultListStorage)
            set('vaults', JSON.stringify(vaultListData ? [...vaultListData, { ...form, vaultIndex, createKey: wallet.publicKey, address }] : [{ ...form, vaultIndex, createKey: wallet.publicKey, address }]))
            fetchData()
            setForm({ name: '', desc: '', img: '', target: '', public: false })
        }
    }
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button>Add vault</Button>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>Add vault</Dialog.Title>
                <Flex gap={"4"} direction={"column"}>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Name
                        </Text>
                        <TextField.Input value={form.name} onChange={(ev) => setForm((prev) => ({ ...prev, name: ev.currentTarget.value }))} placeholder="Name" />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Decription
                        </Text>
                        <TextArea value={form.desc} onChange={(ev) => setForm((prev) => ({ ...prev, desc: ev.currentTarget.value }))} placeholder="Decription" />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Image
                        </Text>
                        <TextField.Input value={form.img} onChange={(ev) => setForm((prev) => ({ ...prev, img: ev.currentTarget.value }))} placeholder='url image' />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Target
                        </Text>
                        <TextField.Input value={form.target} onChange={(ev) => setForm((prev) => ({ ...prev, target: ev.currentTarget.value }))} placeholder="Target" />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Public
                        </Text>
                        <Switch radius='full' checked={form.public} onClick={() => setForm((prev) => ({ ...prev, public: !prev.public }))} />
                    </label>
                    <Dialog.Close>
                        <Button onClick={handleAddVault}>Add</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}
