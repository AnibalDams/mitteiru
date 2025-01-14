import axios from "axios"


export async function load({ cookies, params }) {
    let userId = cookies.get("userId")
    try{
    const decodedUser =  await axios.get(`http://localhost:8000/user/decode`, {
        headers:{
            Authorization: `Bearer ${userId}`
        }
    })
    const anime = await axios(`http://localhost:8000/anime/${params.animeId}`)
    const episodes = await axios(`http://localhost:8000/anime/${params.animeId}/episode/all`)
    const similarAnimes = (await axios(`http://localhost:8000/anime/${params.animeId}/similar`)).data.animes
    const randomnumber = (Math.round(Math.random() * (similarAnimes.length - 1)) + 1)-1;
    const similarAnime = similarAnimes[randomnumber]
    return { status:200,userId:decodedUser.data.user, anime: anime.data.animes, genres: anime.data.genres,episodes: episodes.data.episodes, similarAnime}
    }catch(error){
        if (error.message==="Request failed with status code 404") {
            return {userId,status:404}
        }

    }

}