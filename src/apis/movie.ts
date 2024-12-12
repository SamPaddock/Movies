import { movie_listEndpoint, discoverEndpoint } from '../constant/api_endpoints';
import { MovieDetailResponseType, MoviePicturesResponseType, MovieResponseType } from '../constant/types/types';
import {get} from '../helper/functions/axiosRequests';

const getMovies = async () => {
      return await get<MovieResponseType>(discoverEndpoint.get_movies, {});
};

const getMovieSearch = async (query: string, page: number, year?: number) => {
      const data = {query: query, page: page, ...year && {year: year}};
      return await get<MovieResponseType>(discoverEndpoint.search_movies, data);
};

const getMovieDetails = async (movieID: number | string) => {
      return await get<MovieDetailResponseType>(movie_listEndpoint.get_movie_details + movieID, {});
};

const getMoviePictures = async (movieID: number | string) => {
      return await get<MoviePicturesResponseType>(movie_listEndpoint.get_movie_pictures.replace('{movie_id}',movieID.toString()), {});
};

export {
      getMovies,
      getMovieSearch,
      getMovieDetails,
      getMoviePictures,
};
