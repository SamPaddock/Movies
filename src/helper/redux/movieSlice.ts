import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieDetailType, MovieType } from '../../constant/types/types';

interface MoviesState {
      movies: (MovieDetailType | MovieType)[];
}

const initialState: MoviesState = {
      movies: [],
};

const moviesSlice = createSlice({
      name: 'movies',
      initialState,
      reducers: {
            setMovies(state, action: PayloadAction<MovieDetailType[] | MovieType[]>) {
                  state.movies = action.payload;
            },
            addMovie(state, action: PayloadAction<MovieDetailType | MovieType>) {
                  state.movies.push(action.payload);
            },
            removeMovie(state, action: PayloadAction<number>) {
                  state.movies = state.movies.filter(movie => movie.id !== action.payload);
            },
      },
});

export const { setMovies, addMovie, removeMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
