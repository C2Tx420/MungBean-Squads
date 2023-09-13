import * as Toast from '@radix-ui/react-toast';

export default function Toast() {

    <Toast.Provider>
        <Toast.Root>
            <Toast.Title />
            <Toast.Description />
            <Toast.Action />
            <Toast.Close />
        </Toast.Root>

        <Toast.Viewport />
    </Toast.Provider>
}
