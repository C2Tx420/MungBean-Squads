import { Button, Dialog, TextField, Text, TextArea, Flex } from '@radix-ui/themes'
import { useSquads } from '../../hook/useSquads'
import { useWallet } from '@solana/wallet-adapter-react';
import { useShyft } from '../../hook/useShyft';

export default function AddVault() {
    const { addMember } = useSquads();
    const wallet = useWallet();
    const {sign} = useShyft();
    const handleAddVault = async() => {
        if(wallet.publicKey) {
            const { encoded_transaction } = await addMember(wallet.publicKey);
            await sign(wallet,encoded_transaction);
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
                            <TextField.Input placeholder="Name" />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Decription
                            </Text>
                            <TextArea placeholder="Decription" />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Image
                            </Text>
                            <TextField.Input placeholder='url image' />
                        </label>
                        <Button onClick={handleAddVault}>Add</Button>
                    </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}
