# CSCI-3308-Fall21-015-07 - DNSAR (DNA Search Alignment Resource)

## Structure
```
home/
│   README.md
│   docker-compose.yml
│   Dockerfile
│   testcases.md
│   .dockerignore
│   .gitignore
│
└───MILESTONES
│   │   ProjectMilestone1_015-07.pdf
│   │   ...
│   │
│   └───ProjectMilestone3_015-07
│       │   architectureDesign.png
│   └───img     (images for the milestones)
│       │   Milestone4-DatabaseDesign.PNG
│       │   ...
│   
└───db
│   └───queries
│       │   in.fasta        (this is where the search input lives)
│       │   in_1.fasta      (this is a potential input search sequence)
│   └───results
│       │   results.json    (this is where the search results live)
└───init_data
│   │   create.sql
└───website
│   │   package-lock.json
│   │   package.json
│   │   postgresdb.js
│   │   start.sh
│   │
│   └───build    (where all the build files live)
│       │   index.html
│       │   ... 
│   └───public   (where all the public files live)
│   └───server
│       │   server.js
│       └───resources     (where tests live for the server)
│   └───src
│       │   App.js
│       │   Home.js
│       │   Login.js
│       │   Signup.js
│       │   index.js
│       │   login.css
│       └───components
│           │   Header.js
│           │   Results.js
│           │   Search.js
│           │   TestConnection.js
│           └───resources
│               │   dnatoprotein.js
│   └───thirdparty    (resources for converting DNA and RNA)
│       │   Readme.md
│       │   dnatoprotein.cpp
│       │   ...
```

## Project Description:
- DNSAR (DNA Search Alignment Resource) is a free app intended for use by professionals, researchers, and students. DNSAR puts all the convenience of many services like converters and sequence aligners into one seemless and intuitive service that allows users to interact with DNA and RNA sequences. Users have the option to convert DNA into RNA, the DNA complement, or Protein and convert RNA to DNA! Users can also search a DNA sequence against the 16S ribosomal RNA database provided from NCBI BLAST+ to find its corresponding name and information. DNSAR has an easy to use, interactive display that will show to the user both their input and the output from the desired feature. On top of all this, DNSAR will also output the time the request was handled for the user to view and what the user did, whether that was convert 'DNA to RNA' or 'RNA ro DNA'. DNSAR then logs all these outputs the user so you can easily see the results from many operations in a row. Users are also able to create an account and sign in to be able to save search results for easy of access later (Not yet implemented!). DNSAR was built using Docker images from NCBI, hand built postgres databases, and react scripts to provide easy access to users, fast deployment of changes, and ease of organization of the code.

## Deployment:
- To deploy the app you must download all the source code, then run `docker-compose build`, then run `docker-compose up`. Once this has finished running then you can can access the service from `http://localhost:3000/`. We were not able to get it to work on one machine, the downloaded database would not decompress. We were not able to solve this issue.

## Test Cases: 
- [Link to Test Cases](https://github.com/CU-CSCI-3308-Fall-2021/CSCI-3308-Fall21-015-07/blob/main/testcases.md)

## Contributors:
- Colin Moore
- Patrick Mardis
- Rob Sollitto
- Tommy Hoang
- Kabsa Abdi

## Tech Stack Info
- NCBI/BLAST+ Docker Image: [Github](https://github.com/ncbi/blast_plus_docs) | [Docker Hub](https://hub.docker.com/r/ncbi/blast)
- React.js: [Home Page](https://reactjs.org) | [Docs](https://reactjs.org/docs/getting-started.html)
- React Bootstrap Components: [Home Page](https://react-bootstrap.github.io) | [Components Docs](https://react-bootstrap.github.io/components/alerts)
- Express.js: [Home Page](https://expressjs.com) | [Docs](https://expressjs.com/en/4x/api.html)
