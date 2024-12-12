import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Header from '../../components/molecules/header';
import { MovieResponseType, MovieType } from '../../constant/types/types.ts';
import { color } from '../../assets/style/global';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Label from '../../components/atoms/label';
import CollectionView from '../../components/layouts/collectionview';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../helper/navigation/rootStackParams';
import { getMovieSearch } from '../../apis/movie';
import MovieCard from '../../components/molecules/movieCard.ts';

interface CellProps {
      item: MovieType;
}

const SearchScreen = () => {
      const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Search'>>();
      const [searchTerm, setSearchTerm] = useState<string>();
      const [moviesList, setListMovies] = useState<MovieResponseType>();
      const initialPage = 1;
      const [isLoading, setIsLoading] = useState<boolean>(false);

      useEffect(() => {
            searchTerm && searchTerm?.length > 0 && getMovieSearch(searchTerm, initialPage).then(response => {
                  setListMovies(response?.data);
                  setIsLoading(false);
            });
      },[searchTerm]);

      const getMoreMovies = () => {
            if(searchTerm && searchTerm?.length > 0 && moviesList && moviesList?.page + 1 < moviesList?.total_pages) {
                  setIsLoading(true);
                  getMovieSearch(searchTerm, moviesList?.page + 1).then(response => {
                        setListMovies({
                              ...response?.data,
                              results: [...moviesList?.results, ...response?.data?.results],
                        });
                        setIsLoading(false);
                  });
            }
      };

      const Cell = useMemo(() => {
            return ({ item }: CellProps) => {
                  return (
                        <MovieCard
                              showMovieInfo
                              item={item}
                        />
                  )
            };
      }, []);

      return (
            <View style={styles.container}>
                  <Header
                        showBackButton
                        onBackPress={() => navigation.goBack()}
                        showSearchBar
                        onSearchChange={(text) => setSearchTerm(text)}
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

export default SearchScreen;

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
      infoContainer: {
            position: 'absolute',
            start: 0,
            end: 0,
            bottom: 0,
            width: '100%',
            backgroundColor: color.default.black80,
            padding: 4,
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

