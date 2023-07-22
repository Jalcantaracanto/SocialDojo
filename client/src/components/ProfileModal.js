import { Modal, useMantineTheme } from '@mantine/core'

export const ProfileModal = ({ modalOpen, setModalOpen }) => {
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
                <form className="infoForm">
                    <h3>You info</h3>
                    <div>
                        <input type="text" className="infoInput" name="FirstName" placeholder="First Name" />
                        <input type="text" className="infoInput" name="LastName" placeholder="Last Name" />
                    </div>
                    <div>
                        <input type="text" className="infoInput" name="WorksAT" placeholder="Works at" />
                    </div>
                    <div>
                        <input type="text" className="infoInput" name="livesIN" placeholder="Lives In" />
                        <input type="text" className="infoInput" name="country" placeholder="Country" />
                    </div>
                    <div>
                        <input type="text" className="infoInput" placeholder="RelationShip Status" />
                    </div>
                    <div>
                        Profile Image
                        <input type="file" name="profileImg" />
                        Cover Image
                        <input type="file" name="coverImg" />
                    </div>
                    <button className="button infoButton">Update</button>
                </form>
            </Modal>
        </>
    )
}
