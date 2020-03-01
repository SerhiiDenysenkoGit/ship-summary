export const createPath = (api) => { return window.location.host.indexOf(':8081') !== -1 ? "http://localhost:8080" + api : api; };
