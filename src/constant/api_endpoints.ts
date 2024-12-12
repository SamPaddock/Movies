const discoverURL = '/discover';
const movieURL = '/movie';
const searchURL = '/search';

const discoverEndpoint = {
      get_movies: `${discoverURL}/movie`,
      search_movies: `${searchURL}/movie`,
};

const movie_listEndpoint = {
      now_playing: `${movieURL}/now_playing`,
      popular: `${movieURL}/popular`,
      top_rated: `${movieURL}/top_rated`,
      upcoming: `${movieURL}/upcoming`,
      get_movie_details: `${movieURL}/`,
      get_movie_pictures: `${movieURL}/{movie_id}/images`,
};

export {
      discoverEndpoint,
      movie_listEndpoint,
};