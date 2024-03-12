import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";

const BoxMain = ({ data, mainData }) => {
    const [initData, setInitData] = useState(0);
    const [ans, setAns] = useState(0);

    const calculateData = (e) => {
        const value = e.target.value;
        setInitData(value);
        if (mainData?.title === "Weight") {
            setAns((data?.txtPrice > 0) ? ((value * (data?.txtWeight)) / (data?.txtPrice)) : 0)
        }
        else {
            setAns((data?.txtWeight > 0) ? ((value * (data?.txtPrice)) / (data?.txtWeight)) : 0)
        }
    }

    useEffect(() => {
        setInitData(0);
        setAns(0);
    }, [mainData])

    return mainData && (
        <Container
            className="mt-2"
        >
            <Card
                className="text-center"
            >
                <CardHeader>
                    Find &nbsp;
                    {mainData.title}
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col>
                            <FloatingLabel
                                label={mainData.label}
                                className="mb-3"
                            >
                                <Form.Control
                                    id={mainData.input1}
                                    type="number"
                                    placeholder={mainData.label}
                                    value={initData}
                                    onChange={calculateData}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel
                                label={mainData.title}
                            >
                                <Form.Control
                                    id={mainData.title}
                                    type="number"
                                    placeholder={mainData.title}
                                    value={ans}
                                    disabled
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Container>
    )
}

export default BoxMain;