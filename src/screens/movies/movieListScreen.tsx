import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';
import Header from '../../components/molecules/header';
import { MovieResponseType, MovieType } from '../../constant/types/types';
import { Movie_Image_BASE_URL } from '../../constant';
import { color } from '../../assets/style/global';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Label from '../../components/atoms/label';
import CollectionView from '../../components/layouts/collectionview';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../helper/navigation/rootStackParams';
import { getMovies } from '../../apis/discover';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie, removeMovie } from '../../helper/redux/movieSlice';
import { RootState } from '../../helper/redux/store';
import { shareContent } from '../../helper/functions/helper';

interface CellProps {
      item: MovieType;
}

const MovieListScreen = () => {
      const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'MovieList'>>();
      const route = useRoute<RouteProp<RootStackParamList, 'MovieList'>>();
      const { movieType } = route.params;
      const [moviesList, setListMovies] = useState<MovieResponseType>();
      const initialPage = 1;
      const [isLoading, setIsLoading] = useState<boolean>(false);
      const { movies } = useSelector((state: RootState) => state.movies);
      const dispatch = useDispatch();

      useEffect(() => {
            movieType && moviesList?.results?.length === undefined && getMovies(movieType, initialPage).then(response => {
                  setListMovies(response?.data);
            });
      },[movieType]);

      const getMoreMovies = () => {
            if(moviesList && moviesList?.page + 1 < moviesList?.total_pages) {
                  setIsLoading(true);
                  getMovies(movieType, moviesList?.page + 1).then(response => {
                        setListMovies({
                              ...response?.data,
                              results: [...moviesList?.results, ...response?.data?.results],
                        });
                        setIsLoading(false);
                  });
            }
      };


      const Cell = useMemo(() => {
            const onFavoritePress = (isMovieFavored: boolean, movie: MovieType) => {
                  if(isMovieFavored) {
                        removeMovieToFavorite(movie?.id);
                  } else {
                        addMovieToFavorite(isMovieFavored, movie);
                  }
            };

            const addMovieToFavorite = (isMovieFavored: boolean, movie: MovieType) => {
                  if(movie && !isMovieFavored) {
                        dispatch(addMovie(movie));
                  }
            };

            const removeMovieToFavorite = (id: number) => {
                  dispatch(removeMovie(id));
            };

            const onSharePress = (movie: MovieType) => {
                  shareContent(Movie_Image_BASE_URL + movie.poster_path, movie?.title)
            };
            
            return ({ item }: CellProps) => {
                  const movieExists = movies.some(movie => movie.id === item.id);

                  return (
                        <Pressable 
                              key={`idx_${item.id}_${item.backdrop_path}`} 
                              style={styles.cellCard} 
                              onPress={() => navigation.navigate('MovieDetail', { movieId: item?.id, movieTitle: item?.title})}
                        >
                              <Image
                                    src={Movie_Image_BASE_URL + item.poster_path}
                                    resizeMode="cover"
                                    style={styles.cellImageCard}
                              />
                              <View style={styles.likeIconContainer}>
                                    <Icon
                                          name={movieExists ? 'heart' : 'heart-outline'}
                                          size={24}
                                          color={color.default.pink}
                                          onPress={() => onFavoritePress(movieExists, item)}
                                    />
                              </View>
                              <View style={styles.shareIconContainer}>
                                    <Icon name={'share-variant-outline'} size={24} color={color.default.pink} onPress={() => onSharePress(item)} />
                              </View>
                        </Pressable>
                  )
            };
      }, []);

      return (
            <View style={styles.container}>
                  <Header
                        showBackButton
                        onBackPress={() => navigation.goBack()}
                        text="Movies"
                        leftIcon={'magnify'}
                        onLeftIconPress={() => navigation.navigate('Search')}
                  />
                  {
                        (moviesList?.results?.length || 0) > 0
                        ?
                              <CollectionView
                                    data={moviesList?.results}
                                    renderItem={({item}) => <Cell item={item}/>}
                                    contentContainerStyle={styles.cellContainer}
                                    columnWrapperStyle={styles.cellColumnContainer}
                                    onEndReached={() => getMoreMovies()}
                                    isLoadingMore={isLoading}
                              />
                        :
                              <View style={styles.bodyContainer}>
                                    <Icon name={'alert-circle-outline'} size={120} color={color.dark.primary} />
                                    <Label text='No Data' type='title' />
                              </View>
                  }
            </View>
      );
};

export default MovieListScreen;

const styles = StyleSheet.create({
      container: {
            flex: 1,
            backgroundColor: color.dark.background,
      },
      bodyContainer: {
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
      },
      movieTitleContainer: {
            width: '100%',
            bottom: 0,
            position: 'absolute',
            paddingVertical: 20,
            alignItems: 'center',
      },
      cellContainer: {
            paddingHorizontal: 20,
            paddingTop: 12,
            paddingBottom: 30,
            gap: 20,
      },
      cellColumnContainer: {
            gap: 20,
      },
      likeIconContainer: {
            position: 'absolute',
            start: 8,
            top: 8,
            backgroundColor: color.default.black50,
            padding: 6,
            borderRadius: 24,
      },
      shareIconContainer: {
            position: 'absolute',
            end: 8,
            top: 8,
            backgroundColor: color.default.black50,
            padding: 6,
            borderRadius: 24,
      },
      cellCard: {
            width: Dimensions.get('screen').width / 2 - 20 - 12,
      },
      cellImageCard: {
            width: '100%',
            aspectRatio: 2 / 3,
            borderRadius: 4,
            borderColor: color.default.dimGray,
            borderWidth: 0.5,
      },
});
