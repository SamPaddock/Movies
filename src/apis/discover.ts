import { movie_listEndpoint } from '../constant/api_endpoints';
import { MovieResponseType, MovieTypes } from '../constant/types/types';
import {get} from '../helper/functions/axiosRequests';

const getMovies = async (type: MovieTypes ,page: number) => {
      const apiUrl = type === 'popular' ? movie_listEndpoint.popular
                  : type === 'nowPlaying' ? movie_listEndpoint.now_playing
                  : type === 'upcoming' ? movie_listEndpoint.upcoming
                  : movie_listEndpoint.top_rated;
      const data = await get<MovieResponseType>(apiUrl, {page: page});
      return data;
};

const getNowPlayingMovies = async (page: number) => {
      return await get<MovieResponseType>(movie_listEndpoint.now_playing, {page: page});
};

const getPopularMovies = async (page: number) => {
      return await get<MovieResponseType>(movie_listEndpoint.popular, {page: page});
};

const getTopRatedMovies = async (page: number) => {
      return await get<MovieResponseType>(movie_listEndpoint.top_rated, {page: page});
};

const getUpcomingMovies = async (page: number) => {
      return await get<MovieResponseType>(movie_listEndpoint.upcoming, {page: page});
};

export {
      getMovies,
      getNowPlayingMovies,
      getPopularMovies,
      getTopRatedMovies,
      getUpcomingMovies,
};
