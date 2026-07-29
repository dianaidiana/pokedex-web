import { useState } from "react";
import { PokemonList } from "./components/PokemonList/PokemonList";
import pokeLogo from "./assets/International_Pokémon_logo.svg";
import "./App.css";
import { Pagination } from "./components/Pagination/Pagination";

function App() {
    const [page, setPage] = useState(1);
    const [amountPerPage, setAmountPerPage] = useState(5);
    const [totalCount, setTotalCount] = useState<number>();

    const pageCount =
        totalCount !== undefined ? Math.ceil(totalCount / amountPerPage) : 1;

    return (
        <>
            <header>
                <div className="container">
                    <img className="pokelogo" src={pokeLogo} />
                    <label>
                        Results per page:
                        <input
                            type="number"
                            value={amountPerPage}
                            onChange={(e) => {
                                setAmountPerPage(e.target.valueAsNumber);
                            }}
                            onKeyDown={(e) => {
                                if (
                                    e.key !== "ArrowUp" &&
                                    e.key !== "ArrowDown" &&
                                    e.key !== "Tab"
                                ) {
                                    e.preventDefault();
                                }
                            }}
                            onPaste={(e) => e.preventDefault()}
                            max={20}
                            min={1}
                        />
                    </label>
                </div>
            </header>
            <main>
                <PokemonList
                    amount={amountPerPage}
                    page={page}
                    onTotalCountChange={setTotalCount}
                />
            </main>
            <footer>
                <div className="centered">
                    <Pagination
                        page={page}
                        length={10}
                        setPage={setPage}
                        lastPage={
                            totalCount !== undefined ? pageCount : undefined
                        }
                    />
                </div>
            </footer>
        </>
    );
}

export default App;
