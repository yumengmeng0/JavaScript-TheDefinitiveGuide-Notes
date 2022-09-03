interface NetworkError extends Error {
}

interface NetworkErrorConstructor {
    new(message?: string): NetworkError;
    (message?: string): NetworkError;
    readonly prototype: NetworkError;
}

declare var NetworkError: NetworkErrorConstructor;

/*
interface TypeError extends Error {
}

interface TypeErrorConstructor {
    new(message?: string): TypeError;
    (message?: string): TypeError;
    readonly prototype: TypeError;
}

declare var TypeError: TypeErrorConstructor;
 */