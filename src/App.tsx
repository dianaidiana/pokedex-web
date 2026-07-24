import { useRef, useState } from "react";
import { PokemonList } from "./components/PokemonList";
import pokeLogo from "./assets/International_Pokémon_logo.svg";
import "./App.css";
import { Pagination } from "./components/Pagination";

function App() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [page, setPage] = useState(1);
    const [amountPerPage, setAmountPerPage] = useState(5);

    return (
        <>
            <header>
                <div className="container">
                    <img className="pokelogo" src={pokeLogo} />
                    <label>
                        Results per page:
                        <input
                            type="number"
                            defaultValue={amountPerPage}
                            ref={inputRef}
                            onChange={() =>
                                setAmountPerPage(
                                    inputRef.current!.valueAsNumber
                                )
                            }
                            max={20}
                            min={1}
                        />
                    </label>
                </div>
            </header>
            <main>
                <PokemonList amount={amountPerPage} page={page} />
            </main>
            <footer>
                <div className="centered">
                    <Pagination page={page} length={10} setPage={setPage} />
                </div>
            </footer>
        </>
    );
}

export default App;
