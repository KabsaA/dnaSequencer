import { Button, Container } from 'react-bootstrap';
function TestConnection() {
    return (
        <Container className="mt-5">
            <Button onClick={() => { fetch('http://localhost:8000/api/test').then(res => res.json()).then(data => window.alert(data.message)) }}>Test Server Connection</Button>
        </Container >
    );
}
export default TestConnection;