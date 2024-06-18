import { Col, Row } from "react-bootstrap";

interface LabelWithDataProps {
    label: string;
    data: string;
}

const LabelWithData = ({ label, data }: LabelWithDataProps) => {

    return <Row className="justify-content-md-center mb-3">
        <Col xs="12" md="2" className="fw-bold">{label} :</Col>
        <Col xs="12" md="6">{data}</Col>
    </Row>
}

export default LabelWithData;