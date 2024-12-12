export type MovieTypes = 'popular' | 'nowPlaying' | 'topRated' | 'upcoming';

export type MovieDetailResponseType = MovieDetailType

export type MoviePicturesResponseType = {
      backdrops: MoviePictureType[];
      id: number;
      logos: MoviePictureType[];
      posters: MoviePictureType[];
}

export type MoviePictureType = {
      aspect_ratio: number;
      height: number;
      iso_639_1: string;
      file_path: string;
      vote_average: number;
      vote_count: number;
      width: number;
}

export type MovieDetailType = {
      adult: boolean;
      backdrop_path: string;
	genres: {id: number, name: string}[]
	homepage: string
	id: number;
      origin_country: string;
      original_language: string;
      original_title: string;
      overview: string;
      popularity: number;
      poster_path: string;
      release_date: string;
      runtime: string;
      spoken_languages:{english_name:string, iso_639_1: string, name: string}[],
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export type MovieResponseType = {
      dates: {maximum: string, minimum: string};
      page: number;
      results: MovieType[];
      total_pages: number;
      total_results: number;
}

export type MovieCollectionType = MovieResponseType & {
      title: string;
      type?: MovieTypes;
}

export type MovieCollectionList = {
      [movieType: string]: MovieCollectionType;
};

export type MovieType = {
      adult: boolean;
      backdrop_path: string;
      genre_ids: number[];
      id: number;
      original_language: string;
      original_title: string;
      overview: string;
      popularity: number;
      poster_path: string;
      release_date: string;
      title: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
}
