import { Button, Dialog, TextField, Text, TextArea, Flex } from '@radix-ui/themes'

export default function AddVault() {
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button>Add vault</Button>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>Add vault</Dialog.Title>
                <Dialog.Description size="2" mb="4">
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
                        <Button>Add</Button>
                    </Flex>
                </Dialog.Description>
            </Dialog.Content>
        </Dialog.Root>
    )
}
