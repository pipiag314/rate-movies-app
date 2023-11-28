export const mutationLogin = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new`, {
        headers: {
            Authorization: import.meta.env.VITE_API_HEADERS_AUTH,
        }
    });

    return await res.json();
}