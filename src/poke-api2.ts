const API_ROOT = "https://pokeapi.co/api/v2/pokemon/";

export class ApiError extends Error {
    status: number;

    constructor(response: Response) {
        super(`Error status: ${response.status}`);
        this.status = response.status;
    }
}

export async function apiFetch(
    method: "GET" | "POST" | "DELETE" | "PATCH",
    url: string,
    options?: { headers: { [key: string]: string }; body: unknown }
) {
    const headers: Record<string, string> = options?.headers ?? {};

    const reqInit: RequestInit = {
        method,
        headers,
    };

    if (options?.body) {
        const body = JSON.stringify(options.body);
        reqInit.body = body;
        headers["Content-Type"] = "application/JSON";
    }

    const response = await fetch(API_ROOT + url, reqInit);

    if (response.status >= 400) {
        throw new ApiError(response);
    }

    const bodyPayload = response.json();
    return bodyPayload;
}

export interface PokemonData {
    id: number;
    name: string;
    types: string[];
    weight: number;
    height: number;
    imageUrl: string;
}

export async function getPokemonData(nameOrId: string | number) {
    const url = nameOrId.toString();
    const bodyPayload = await apiFetch("GET", url);

    const pokemon: PokemonData = {
        id: bodyPayload.id,
        name: bodyPayload.name,
        types: bodyPayload.types.map((type: { name: string }) => type.name),
        weight: bodyPayload.weight,
        height: bodyPayload.height,
        imageUrl: bodyPayload.sprites.other["official-artwork"].front_default,
    };

    return pokemon;
}
