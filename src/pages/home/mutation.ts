export const rateMovie = async (id: number, rating: number) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/rating?guest_session_id=${localStorage.getItem("guest_session_id")}&api_key=${import.meta.env.VITE_API_KEY}`, {
        method: "post",
        headers: {
            accept: "application/json",
            "content-type": "application/json;charset=utf-8",
        },
        body: `{"value": ${rating}}`
    });

    return await res.json();
}


export const rateTvShow = async (id: number, rating: number) => {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/rating?guest_session_id=${localStorage.getItem("guest_session_id")}&api_key=${import.meta.env.VITE_API_KEY}`, {
        method: "post",
        headers: {
            accept: "application/json",
            "content-type": "application/json;charset=utf-8",
        },
        body: `{"value": ${rating}}`
    });

    return await res.json();
}