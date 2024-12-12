import { MovieTypes } from "../../constant/types/types";

export type RootStackParamList = {
      Main: undefined;
      Splash: undefined;
      Home: undefined;
      MovieFavorite: undefined;
      MovieList: { movieType: MovieTypes};
      MovieDetail: { movieId: number; movieTitle: string };
      Search: undefined;
};