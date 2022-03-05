export default function auth({next, router}) {
    console.log("[Middleware] auth test")
    return next();
}