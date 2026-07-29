import { ApiError, PokemonData } from "../../poke-api";
import style from "./pokemon.module.css";
import ohnoPokemon from "../../assets/ohno_pokemon.png";

interface PokemonProps {
    result: PromiseSettledResult<PokemonData>;
}

export function Pokemon({ result }: PokemonProps) {
    return (
        <div>
            {result.status == "fulfilled" ? (
                <PokemonCard pokemonData={result.value} />
            ) : (
                <DetailsErrorState error={result.reason} />
            )}
        </div>
    );
}

function DetailsErrorState({ error }: { error: unknown }) {
    return (
        <div className={style.container + " " + style.grid}>
            <div className={style.name}>Oh no!</div>
            <div>
                <img className={style["poke-img"]} src={ohnoPokemon} />
            </div>
            <div>
                {error instanceof ApiError && error.status == 404
                    ? "The Pokemon you are looking for does not exist :("
                    : "Something went wrong! Sorry!"}
            </div>
        </div>
    );
}

function PokemonCard({ pokemonData }: { pokemonData: PokemonData }) {
    return (
        <div className={style.container + " " + style.grid}>
            <div className={style.name}>{pokemonData.name}</div>
            <div>
                <img
                    className={style["poke-img"]}
                    src={pokemonData.imageUrl ?? undefined}
                />
            </div>

            <div className={style.details}>
                <div>
                    <div>
                        <b> N° </b>
                    </div>
                    <div> {pokemonData.id.toString().padStart(4, "0")}</div>
                </div>
                <div>
                    <div>
                        <b> weight </b>
                    </div>
                    <div> {(pokemonData.weight * 0.1).toFixed(1)} kg</div>
                </div>
                <div>
                    <div>
                        <b>height</b>
                    </div>
                    <div> {(pokemonData.height * 0.1).toFixed(1)} m</div>
                </div>
                <div>
                    <b> Types </b>
                    <ul>
                        {pokemonData.types.map((typeName) => (
                            <li key={typeName}>{typeName}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
