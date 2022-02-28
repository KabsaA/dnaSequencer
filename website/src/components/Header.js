import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


function Header() {
    return (
        <Navbar bg="light" expand="sm">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>DNSAR</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="header-navbar" />
                <Navbar.Collapse id="header-navbar">
                    <Nav className="me-auto">
                        <LinkContainer to="/login">
                            <Nav.Link>Log In</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/signup">
                            <Nav.Link>Create Account</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;