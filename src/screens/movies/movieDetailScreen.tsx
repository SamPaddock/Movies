import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, Image, ImageBackground, Linking, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import { convertMinutesToHours, getTranslation, getYearFromData, shareContent } from '../../helper/functions/helper';
import { RootStackParamList } from '../../helper/navigation/rootStackParams';
import { addMovie, removeMovie } from '../../helper/redux/movieSlice';
import { MovieDetailType, MoviePicturesResponseType, MoviePictureType } from '../../constant/types/types';
import { Movie_Image_BASE_URL } from '../../constant';
import { RootState } from '../../helper/redux/store';
import { getMovieDetails, getMoviePictures } from '../../apis/movie';
import { color } from '../../assets/style/global';

import Header from '../../components/molecules/header';
import Button from '../../components/atoms/button';
import Label from '../../components/atoms/label';
import HorizontalListView from '../../components/layouts/collectionview/horizontalList';
import { Pressable } from 'react-native';

const MovieDetailScreen = () => {
      const route = useRoute<RouteProp<RootStackParamList, 'MovieDetail'>>();
      const { movieId, movieTitle } = route.params;
      const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'MovieDetail'>>();
      const [movie, setMovie] = useState<MovieDetailType>();
      const [moviePictures, setMoviePictures] = useState<MoviePicturesResponseType>();
      const [movieName, setMovieName] = useState<MoviePictureType>();
      const [genre, setGenre] = useState<string>();
      const [isMovieFavored, setIsMovieFavored] = useState<boolean>();
      const { movies } = useSelector((state: RootState) => state.movies);
      const dispatch = useDispatch();
      const [refreshing, setRefreshing] = useState(false);

      useEffect(() => {
            getMovieInfo();
      },[]);

      const getMovieInfo = () => {
            getMovieDetails(movieId).then(response => {
                  const genreList = response?.data?.genres.map((item) => item.name);
                  setGenre(genreList.toString().replaceAll(',', ', '));
                  setMovie(response?.data);
                  setRefreshing(false);
            });
            getMoviePictures(movieId).then(response => {
                  setMovieName(response?.data?.logos[0]);
                  setMoviePictures(response?.data);
            });
            const movieExists = movies.some(movie => movie.id === movieId);
            setIsMovieFavored(movieExists);
      }

      const openLink = async (url: string) => {
            const supported = await Linking.canOpenURL(url);

            if (supported) {
              await Linking.openURL(url);
            }
      };

      const onFavoritePress = (id: number) => {
            if(isMovieFavored) { 
                  removeMovieToFavorite(id);
            } else {
                  addMovieToFavorite();
            }
      };

      const addMovieToFavorite = () => {
            if(movie && !isMovieFavored) { 
                  dispatch(addMovie(movie));
                  setIsMovieFavored(true);
            }
      };

      const removeMovieToFavorite = (id: number) => {
            dispatch(removeMovie(id));
            setIsMovieFavored(false);
      };

      const onSharePress = (movie: MovieDetailType) => {
            shareContent(Movie_Image_BASE_URL + movie.poster_path, movie?.title)
      };

      const onRefresh = useCallback(() => {
            setRefreshing(true);

            getMovieInfo();
      }, []);



      const CellHeader = useMemo(() => {
            return ({title}: {title: string}) => (
                  <View style={styles.titleContainer} >
                        <Label style={{color: color.default.white}} text={title} type="header" />
                  </View>
            );
      }, []);

      const Cell = useMemo(() => {
            return ({ item }: {item: MoviePictureType}) => {
                  return (
                        <View
                              key={`idx_${item.file_path}}`}
                              style={styles.cellCard}
                        >
                              <Image
                                    src={Movie_Image_BASE_URL + item.file_path}
                                    resizeMode="cover"
                                    style={{
                                          height: '100%',
                                          aspectRatio: item?.aspect_ratio,
                                          borderRadius: 4,
                                          borderColor: color.default.dimGray,
                                          borderWidth: 0.5,
                                    }}
                              />
                        </View>
                  )};
      }, []);

      return (
            <View style={styles.container}>
                  <ScrollView
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                  >
                        <ImageBackground
                              src={Movie_Image_BASE_URL + movie?.backdrop_path}
                              resizeMode="cover"
                              style={styles.imageContainer}
                        >
                              <Header
                                    transparent
                                    showBackButton
                                    onBackPress={() => navigation.goBack()}
                                    leftIcon={'share-variant-outline'}
                                    onLeftIconPress={() => onSharePress(movie)}
                              />
                              <LinearGradient
                                    locations={[0, 0.2, 0.8, 1]}
                                    colors={['#1C1F2A00', '#1C1F2A77', color.dark.background, color.dark.background]}
                                    style={styles.movieTitleContainer}
                              >
                                    <View style={styles.gapContainer}>
                                          <Image
                                                src={Movie_Image_BASE_URL + movieName?.file_path}
                                                resizeMode="cover"
                                                style={{
                                                      width: Dimensions.get('screen').width / 3,
                                                      aspectRatio: movieName?.aspect_ratio,
                                                }}
                                          />
                                          <Label style={styles.textColorStyle} text={movie?.tagline} type='body' />
                                          <View style={styles.textIconStyle}>
                                                <Icon name={'star'} size={24} color={color.dark.warning}/>
                                                <Label
                                                      style={styles.subTextColorStyle}
                                                      text={movie?.vote_average?.toFixed(1)}
                                                      type='body'
                                                />
                                          </View>
                                          <Label
                                                style={styles.subTextColorStyle}
                                                text={`${genre} | ${convertMinutesToHours(Number(movie?.runtime))}`}
                                                type='body'
                                          />
                                    </View>
                              </LinearGradient>
                        </ImageBackground>
                        <View style={styles.bodyContainer}>
                              <View style={styles.chipContainer}>
                                    <Label style={styles.chipCellContainer} text={movie?.status} type='body' />
                                    <Label style={styles.chipCellContainer} text={getYearFromData(movie?.release_date)} type='body' />
                              </View>
                              <View style={styles.gapContainer}>
                                    <Label style={styles.textColorStyle} text={'Plot Summary'} type='header' />
                                    <Label style={styles.textColorStyle} text={movie?.overview} type='body' />
                              </View>
                              {
                                    moviePictures && Object.keys(moviePictures).filter((key) => key !== 'id').map((key) => {
                                          return (
                                                <HorizontalListView
                                                      key={`idx_${key}`}
                                                      ListHeaderComponent={<CellHeader title={getTranslation(`movie_type.${key}`)}/>}
                                                      data={moviePictures[key] as MoviePictureType[]}
                                                      renderItem={({item}) => <Cell key={`idx_${movie?.id}_${key}`} item={item} />}
                                                      containerStyle={styles.gapContainer}
                                                />
                                          );
                                    })
                              }
                        </View>
                  </ScrollView>
                  <View style={styles.bottomContainer} >
                        <Button icon={isMovieFavored ? 'heart' : 'heart-outline'} onPress={() => onFavoritePress(movieId)} />                        
                        <Button
                              style={styles.buttonContainer}
                              title='Go to Website'
                              icon='web'
                              onPress={() => openLink(movie?.homepage ?? `https://en.wikipedia.org/wiki/${movie?.title.replaceAll(' ','_')}`)}
                        />
                  </View>
            </View>
      );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
      container: {
            flex: 1,
            backgroundColor: color.dark.background,
      },
      buttonContainer: {
            flexGrow: 1,
      },
      bodyContainer: {
            gap: 20,
            paddingBottom: 60,
            paddingHorizontal: 20,
      },
      movieTitleContainer: {
            width: '100%',
            bottom: 0,
            position: 'absolute',
            padding: 20,
            alignItems: 'flex-start',
      },
      imageContainer: {
            width: '100%',
            aspectRatio: 7 / 8,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 20,
      },
      bottomContainer: {
            flexDirection: 'row',
            paddingHorizontal: 20,
            gap: 12,
            paddingBottom: 30,
      },
      chipContainer: {
            flexDirection: 'row',
            gap: 12,
      },
      chipCellContainer: {
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 4,
            backgroundColor: color.default.dimGray,
            color: color.default.white,
            overflow: 'hidden',
      },
      gapContainer: {
            gap: 12,
      },
      cellCard: {
            height: 110,
      },
      textIconStyle: {
            flexDirection: 'row',
            gap: 8,
            alignItems: 'center',
      },
      textColorStyle: {
            color: color.default.white,
            textAlign: 'justify',
      },
      subTextColorStyle: {
            color: color.default.gray,
            textAlign: 'justify',
      },
      titleContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            paddingVertical: 12,
      },
      cellContainer: {
            paddingHorizontal: 20,
            gap: 12,
      },
});
