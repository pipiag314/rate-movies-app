export const fetchTvShowDetails = async (id: string) => {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, {
        headers: {
            Authorization: import.meta.env.VITE_API_HEADERS_AUTH,
        }
    });

    return await res.json();
}
