export const mutationLogin = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new`, {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjN2JjYzMyOGFmMjQ1MGU4ZDIwNzJjYWZkNGNhYzY0YSIsInN1YiI6IjY1NjVjMTg5ODlkOTdmMDBlMTcyZGI2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HLDmjmkccmaLoa8CCGUv1wngHMoIgwdIOhda_2TZEGU"
        }
    });

    return await res.json();
}