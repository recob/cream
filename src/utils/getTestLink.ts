export function getTestLink(host: string, port: number | string) {
    return `${window.location.origin}/${host}:${port}`;
}
