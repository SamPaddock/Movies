import React, { useEffect, useMemo, useState } from 'react';
import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '../../apis/discover';
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Header from '../../components/molecules/header';
import { MovieCollectionList, MovieType, MovieTypes } from '../../constant/types/types';
import { Movie_Image_BASE_URL } from '../../constant';
import HorizontalListView from '../../components/layouts/collectionview/horizontalList';
import { color } from '../../assets/style/global';
import Label from '../../components/atoms/label';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { RootStackParamList } from '../../helper/navigation/rootStackParams';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getTranslation } from '../../helper/functions/helper';

interface CellProps {
      item: MovieType;
}

interface HeaderCellProps {
      title: string;
      type: MovieTypes;
}

const HomeScreen = () => {
      const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
      const [banner, setBanner] = useState<MovieType>();
      const [movies, setMovies] = useState<MovieCollectionList>();
      const initialPage = 1;

      useEffect(() => {
            getPopularMovies(initialPage).then(response => {
                  console.log(response?.data?.results[0]?.id)
                  setBanner(response?.data?.results[0]);
                  setMovies((prevCollection) => ({
                        ...prevCollection,
                        'popular': {
                              ...response?.data,
                              results: response?.data?.results?.slice(1),
                              title: 'Popular',
                              type: 'popular',
                        },
                  }));
            });
            getNowPlayingMovies(initialPage).then(response => {
                  setMovies((prevCollection) => ({
                        ...prevCollection,
                        'nowPlaying': {
                              ...response?.data,
                              results: response?.data?.results?.slice(1),
                              title: 'Now Playing',
                              type: 'nowPlaying',
                        },
                  }));
            });
            getTopRatedMovies(initialPage).then(response => {
                  setMovies((prevCollection) => ({
                        ...prevCollection,
                        'topRated': {
                              ...response?.data,
                              results: response?.data?.results?.slice(1),
                              title: 'Top Rated',
                              type: 'topRated',
                        },
                  }));
            });
            getUpcomingMovies(initialPage).then(response => {
                  setMovies((prevCollection) => ({
                        ...prevCollection,
                        'upcoming': {
                              ...response?.data,
                              results: response?.data?.results?.slice(1),
                              title: 'Coming Soon',
                              type: 'upcoming',
                        },
                  }));
            });
      },[]);

      const CellHeader = useMemo(() => {
            return ({ title, type }: HeaderCellProps) => (
                  <View style={styles.titleContainer} >
                        <Label style={{color: color.default.white}} text={title} type="header" />
                        <Pressable
                              onPress={() => navigation.navigate('MovieList', {movieType: type})}
                        >
                              <Label style={{color: color.default.silver}} text={getTranslation('action.see_all')} type="caption" />
                        </Pressable>
                  </View>
            );
      }, [navigation]);

      const Cell = useMemo(() => {
            return ({ item }: CellProps) => (
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
                  </Pressable>
            );
      }, [navigation]);

      return (
            <ScrollView
                  style={styles.container}
                  showsVerticalScrollIndicator={false}
            >
                  <ImageBackground
                        src={Movie_Image_BASE_URL + banner?.backdrop_path}
                        resizeMode="cover"
                        style={styles.imageContainer}
                  >
                        <Header
                              transparent
                              showMenuButton
                              leftIcon={'magnify'}
                              onLeftIconPress={() => navigation.navigate('Search')}
                              onBackPress={() => DrawerActions.openDrawer()}
                        />
                        <LinearGradient
                              locations={[0, 0.2, 1]}
                              colors={['#1C1F2A00', '#1C1F2A77', color.dark.background]}
                              style={styles.movieTitleContainer}
                        >
                              <Label style={{color: color.default.white}} text={banner?.title ?? ''} type='title' />
                        </LinearGradient>
                  </ImageBackground>
                  <View style={styles.bodyContainer}>
                        {
                              movies && Object.entries(movies).map(([movieType, movies]) => (
                                    <HorizontalListView
                                          key={`idx_${movieType}`}
                                          ListHeaderComponent={<CellHeader title={getTranslation(`movie_type.${movies?.type}`)} type={movies?.type || ''} />}
                                          data={movies.results}
                                          renderItem={({item}) => <Cell key={`idx_${item.id}_${movieType}`} item={item} />}
                                          containerStyle={styles.cellContainer}
                                    />
                              ))
                        }
                  </View>
            </ScrollView>
      );
};

export default HomeScreen;

const styles = StyleSheet.create({
      container: {
            flex: 1,
            backgroundColor: color.dark.background,
      },
      bodyContainer: {
            gap: 12,
            paddingBottom: 100,
      },
      movieTitleContainer: {
            width: '100%',
            bottom: 0,
            position: 'absolute',
            paddingVertical: 20,
            alignItems: 'center',
      },
      titleContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            paddingHorizontal: 20,
            paddingVertical: 12,
      },
      imageContainer: {
            width: '100%',
            aspectRatio: 3 / 2,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 20,
      },
      cellContainer: {
            paddingHorizontal: 20,
            gap: 12,
      },
      cellCard: {
            width: 110,
      },
      cellImageCard: {
            width: '100%',
            aspectRatio: 2 / 3,
            borderRadius: 4,
            borderColor: color.default.dimGray,
            borderWidth: 0.5,
      },
});
