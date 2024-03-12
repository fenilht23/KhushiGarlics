import { useEffect, useState } from "react";
import { Button, Card, CardBody, Container, Navbar } from "react-bootstrap";
import BoxModal from "./BoxModal";
import BoxMain from "./BoxMain";
import { ref, child, get } from "../node_modules/firebase/database";
import { db } from "./firebaseconfig";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

const App = () => {
  const [data, setData] = useState({
    txtWeight: 0,
    txtPrice: 0
  });
  const [modalData, setModalData] = useState({
    title: "Weight",
    id: "txtWeight"
  });
  const [showModal, setShowModal] = useState(false);
  const [mainData, setMainData] = useState({
    title: "Weight",
    label: "Price",
    input1: "txtcPrice",
    input2: "txtcWeight"
  })

  const handleOpenModal = (title, id) => {
    setModalData({
      title,
      id
    });
    setShowModal(true)
  }

  const handleChangeMainBox = (title, label, input1, input2) => {
    setMainData({
      title,
      label,
      input1,
      input2
    });
  }

  useEffect(() => {
    const dbRef = ref(db);
    get(
      child(
        dbRef,
        "tblData"
      )
    )
      .then(
        snapshot => {
          if (snapshot.exists()) {
            setData(snapshot.val());
          }
        })
  }, [])

  return (
    <>
      <Navbar
        className="bg-body-tertiary">
        <Container
          fluid>
          <Navbar.Brand>
            Khushi Garlics
          </Navbar.Brand>
          <div
            className="d-flex"
          >
            <Button
              variant="outline-success mx-2"
              onClick={() => handleOpenModal("Weight", "txtWeight")}
            >
              Weight
            </Button>
            <Button
              variant="outline-success"
              onClick={() => handleOpenModal("Price", "txtPrice")}
            >
              Price
            </Button>
          </div>
        </Container>
      </Navbar>
      <BoxModal
        data={data}
        setData={setData}
        modalData={modalData}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <Container>
        <Card
          className="text-center">
          <CardBody>
            <Button
              variant="primary"
              className="mx-2 my-2"
              onClick={() => handleChangeMainBox("Weight", "Price", "txtcPrice", "txtcWeight")}
            >
              Weight
            </Button>
            <Button
              variant="primary"
              className="mx-2 my-2"
              onClick={() => handleChangeMainBox("Price", "Weight", "txtcWeight", "txtcPrice")}
            >
              Price
            </Button>
          </CardBody>
        </Card>
      </Container>
      <BoxMain
        data={data}
        mainData={mainData}
      />
    </>
  )
}

export default App;