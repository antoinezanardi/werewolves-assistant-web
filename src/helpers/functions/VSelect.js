import Fuse from "fuse.js";

export function fuseSearch(options, search, keys) {
    const fuse = new Fuse(options, {
        keys,
        shouldSort: true,
        threshold: 0.3,
    });
    return search.length ? fuse.search(search).map(({ item }) => item) : fuse.list;
}