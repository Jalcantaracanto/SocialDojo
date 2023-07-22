import { Modal, useMantineTheme } from '@mantine/core'
import { PostShare } from './PostShare'

export const ShareModal = ({ modalOpen, setModalOpen }) => {
    const theme = useMantineTheme()

    return (
        <>
            <Modal
                overlayProps={{
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                    opacity: 0.55,
                    blur: 3,
                }}
                size="50%"
                opened={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <PostShare />
            </Modal>
        </>
    )
}
