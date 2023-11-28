export const fetchMovieDetails = async (id: string) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
        headers: {
            Authorization: import.meta.env.VITE_API_HEADERS_AUTH,
        }
    });

    return await res.json();
}
