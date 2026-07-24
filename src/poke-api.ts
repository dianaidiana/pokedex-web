const API_ROOT = "https://pokeapi.co/api/v2/pokemon/";

export class ApiError extends Error {
    status: number;

    constructor(response: Response) {
        super(`ApiError status code: ${response.status}`);
        this.status = response.status;
    }
}

export async function apiFetch(
    method: "GET" | "POST" | "DELETE" | "PATCH",
    url: string,
    options?: {
        body?: unknown;
        headers?: { [keyname: string]: string };
    }
) {
    const headers: Record<string, string> = options?.headers ?? {};

    const reqInit: RequestInit = {
        method: method,
        headers: headers,
    };

    if (options?.body != undefined) {
        const jsonBody = JSON.stringify(options.body);
        reqInit.body = jsonBody;
        headers["Content-Type"] = "application/json";
    }

    const response: Response = await fetch(API_ROOT + url, reqInit);

    if (response.status >= 400) {
        throw new ApiError(response);
    }

    const bodyPayload = await response.json();
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

export async function getPokemonData(
    nameOrId: string | number
): Promise<PokemonData> {
    let url = nameOrId;
    if (typeof nameOrId == "number") {
        url = nameOrId.toString();
    }
    const bodyPayload = await apiFetch("GET", `${url}`);
    const pokemon: PokemonData = {
        id: bodyPayload.id,
        name: bodyPayload.name,
        imageUrl: bodyPayload.sprites.other["official-artwork"].front_default,
        types: bodyPayload.types.map(
            (a: { type: { name: string } }) => a.type.name
        ),
        weight: bodyPayload.weight,
        height: bodyPayload.height,
    };
    return pokemon;
}
