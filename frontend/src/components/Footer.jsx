import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
const Footer = () => {
    return (
        <div>
            <footer>
                <Container>
                    <Row>
                        <Col className="text-center py-3">
                        {new Date().getFullYear()} Copyright &copy; ProShop
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    )
}

export default Footer
