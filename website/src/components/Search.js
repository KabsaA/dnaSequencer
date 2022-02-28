import React from 'react';
import { Container, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Dnatoprotein from './resources/dnatoprotein.js';

function Search(props) {
    const [rnaButtonsDisabled, setRnaButtonsDisabled] = React.useState(true);
    const [dnaButtonsDisabled, setDnaButtonsDisabled] = React.useState(true);

    function checkForDNA(input) {
        const dna = /^[ACGT]+$/g;
        return input.toUpperCase().match(dna);
    }

    function checkForRNA(input) {
        const rna = /^[ACGU]+$/g;
        return input.toUpperCase().match(rna);
    }

    function formatTime(timestamp) {
        let hours = timestamp.getHours();
        const ampm = hours < 12 ? 'AM' : 'PM';
        if (hours === 0) {
            hours = 12;
        } else if (hours > 12) {
            hours = hours - 12;
        }
        return `${timestamp.getMonth() + 1}/${timestamp.getDate()}/${timestamp.getFullYear()} ${hours}:${timestamp.getMinutes()} ${ampm}`
    }

    function newConversion(input, conversionType, output) {
        const id = props.results.length + 1;
        let timestamp = new Date();
        timestamp = formatTime(timestamp);
        if (input.length >= 15) {
            input = input.slice(0, 15) + "...";
        }
        props.setResults([{
            id,
            timestamp,
            input,
            conversionType,
            output
        }, ...props.results])
    }

    return (
        <Container className="mb-5" >
            <h3 className="my-5">Welcome to DNSAR</h3>
            <Form>
                <Form.Group className="my-5" controlId="input-dna-rna" onChange={(e) => {
                    checkForRNA(e.target.value) ? setRnaButtonsDisabled(false) : setRnaButtonsDisabled(true)
                    checkForDNA(e.target.value) ? setDnaButtonsDisabled(false) : setDnaButtonsDisabled(true)
                }} >
                    <Form.Control size="lg" type="text" placeholder="Enter a DNA or RNA sequence" />
                </Form.Group>
                <Button disabled={dnaButtonsDisabled} variant="dark" className="mx-1" onClick={() => {
                    //retreives the input sequence
                    var input = document.getElementById("input-dna-rna").value.toLowerCase();
                    
                    //formats the input correctly
                    //the input should be in a strigified json format 
                    var sequence = JSON.stringify({sequence: input});
                    
                    //fetch request to the server
                    fetch(`http://localhost:8000/src/search`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                          },
                        body: sequence})
                    .then((response) => response.json())
                    .then((json) => {
                        //this is where the results of the request will be.  json holds results from the server
                        if (json.message === 'No hits found') {
                            newConversion(input.toUpperCase(), "Search", "No hits found");
                        } else {
                            console.log("hits: ",json.hits[0].description[0].sciname);
                            newConversion(input.toUpperCase(), "Search", json.hits[0].description[0].sciname);
                        }
                    })
                    .catch((error) => {
                        //this is where you do error handling of the fetch request
                        console.error(error);
                    }); }}>Search</Button>
                <OverlayTrigger placement="top" overlay={
                    <Tooltip style={{ visibility: rnaButtonsDisabled ? "inherit" : "hidden" }}>
                        input doesn't look like RNA
                    </Tooltip>
                }>
                    <span className="d-inline-block">
                        <Button disabled={rnaButtonsDisabled} variant="dark" className="mx-1" onClick={() => {
                            const input = document.getElementById("input-dna-rna").value.toUpperCase();
                            newConversion(input, "RNA to DNA", rnaToDna(input));
                        }}>RNA to DNA</Button>
                    </span>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={
                    <Tooltip style={{ visibility: dnaButtonsDisabled ? "inherit" : "hidden" }}>
                        input doesn't look like DNA
                    </Tooltip>
                }>
                    <span className="d-inline-block">
                        <Button disabled={dnaButtonsDisabled} variant="dark" className="mx-1" onClick={() => {
                            const input = document.getElementById("input-dna-rna").value.toUpperCase();
                            newConversion(input, "DNA to RNA", dnaToRna(input));
                        }}>DNA to RNA</Button>
                    </span>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={
                    <Tooltip style={{ visibility: dnaButtonsDisabled ? "inherit" : "hidden" }}>
                        input doesn't look like DNA
                    </Tooltip>
                }>
                    <span className="d-inline-block">
                        <Button disabled={dnaButtonsDisabled} variant="dark" className="mx-1" onClick={() => {
                            const input = document.getElementById("input-dna-rna").value.toUpperCase();
                            newConversion(input, "DNA to Complement", dnaComplement(input));
                        }}>DNA to Complement</Button>
                    </span>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={
                    <Tooltip style={{ visibility: dnaButtonsDisabled ? "inherit" : "hidden" }}>
                        input doesn't look like DNA
                    </Tooltip>
                }>
                    <span className="d-inline-block">
                        <Button disabled={dnaButtonsDisabled} variant="dark" className="mx-1" onClick={() => {
                            const input = document.getElementById("input-dna-rna").value.toUpperCase();
                            newConversion(input, "DNA to Protein", Dnatoprotein(input));
                        }}>DNA to Protein</Button>
                    </span>
                </OverlayTrigger>
            </Form>
        </Container >
    );
}

//test DNA GCAAACCAATAAACC

function rnaToDna(input) {
    var dna = "";

    for (var i = 0; i < input.length; i++) {
        if (input[i] === 'U') {
            dna += 'T';
        }
        else {
            dna += input[i];
        }
    }

    return dna;
}

function dnaToRna(input) {
    var rna = "";

    for (var i = 0; i < input.length; i++) {
        if (input[i] === 'T') {
            rna += 'U';
        }
        else {
            rna += input[i];
        }
    }

    return rna;
}

function dnaComplement(input) {
    var minus_strand = "";

    for (var i = 0; i < input.length; i++) {
        if (input[i] === 'A') {
            minus_strand += 'T';
        } else if (input[i] === 'T') {
            minus_strand += 'A';
        } else if (input[i] === 'G') {
            minus_strand += 'C';
        } else {
            minus_strand += 'G';
        }
    }

    return minus_strand;
}

// Need to convert the query to a fasta file
// Need to query the database with blastn
    // Ideally format the output nicely
        // Should show the overlap of the sequences 
        // Should show the name (accession number) of the sequence
    // Only show the top x matches (x=1 for now)
// Need to retrieve results from out file
// Need to return the results
// asynch.wait
// -task blastn



export default Search;