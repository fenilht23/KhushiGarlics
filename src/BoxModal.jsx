import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { ref, set } from "../node_modules/firebase/database";
import { db } from "./firebaseconfig";

const BoxModal = ({ data, setData, modalData, showModal, setShowModal }) => {
    const handleFormInput = (e) => {
        let id = e.target.id;
        let value = e.target.value;
        setData({
            ...data,
            [id]: Number(value)
        });
    };

    const addDataInDB = () => {
        set(
            ref(
                db,
                "tblData"
            )
            ,
            data
        )
            .then(() =>
                alert("Data saved.")
            )
            .catch((error) => {
                console.log("error", error);
                alert("Data not saved.");
            });
        setShowModal(false);
    }
    return modalData && (
        <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header
                closeButton>
                <Modal.Title>
                    {modalData.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FloatingLabel
                    label={modalData.title}
                    className="mb-3"
                >
                    <Form.Control
                        type="number"
                        id={modalData.id}
                        placeholder={modalData.title}
                        value={modalData.title === "Weight" ? data.txtWeight : data.txtPrice}
                        onChange={handleFormInput}
                    />
                </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={addDataInDB}
                >
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default BoxModal;