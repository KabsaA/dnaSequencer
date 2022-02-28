import Header from './components/Header';
import Search from './components/Search';
import Results from './components/Results';

function Home(props) {
    return (
        <>
            <Header />
            <Search results={props.results} setResults={props.setResults} />
            {props.results.length > 0 && <Results results={props.results} setResults={props.setResults} />}
        </>
    );
}

export default Home;