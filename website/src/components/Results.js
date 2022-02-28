import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';

function Results(props) {
    return (
        <Container>
            <Table responsive>
                <thead>
                    <th>ID</th>
                    <th>Timestamp</th>
                    <th>Input</th>
                    <th>Result Type</th>
                    <th>Output</th>
                </thead>
                <tbody>
                    {props.results.map(result => (
                        <tr key={result.id}>
                            <td>{result.id}</td>
                            <td>{result.timestamp}</td>
                            <td style={{ wordBreak: "break-all" }}>{result.input}</td>
                            <td>{result.conversionType}</td>
                            <td style={{ wordBreak: "break-all" }}>{result.output}</td>
                        </tr>
                    ))}
                </tbody>
            </Table >
        </Container>
    )
}

export default Results;