import React, { useMemo } from 'react';
import { Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';
import Header from '../../components/molecules/header';
import { MovieDetailType } from '../../constant/types/types';
import { Movie_Image_BASE_URL } from '../../constant';
import { color } from '../../assets/style/global';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../helper/redux/store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Label from '../../components/atoms/label';
import CollectionView from '../../components/layouts/collectionview';
import { removeMovie } from '../../helper/redux/movieSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../helper/navigation/rootStackParams';
import { shareContent } from '../../helper/functions/helper';

interface CellProps {
      item: MovieDetailType;
}

const MovieFavoriteScreen = () => {
      const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'MovieFavorite'>>();
      const { movies } = useSelector((state: RootState) => state.movies);
      const dispatch = useDispatch();

      const removeMovieToFavorite = (id: number) => {
            dispatch(removeMovie(id));
      };

      const onSharePress = (movie: MovieDetailType) => {
            shareContent(Movie_Image_BASE_URL + movie.poster_path, movie?.title)
      };

      const Cell = useMemo(() => {
            return ({ item }: CellProps) => (
                  <Pressable key={`idx_${item.id}_${item.backdrop_path}`} style={styles.cellCard} onPress={() => navigation.navigate('MovieDetail', { movieId: item?.id, movieTitle: item?.title})}>
                        <Image
                              src={Movie_Image_BASE_URL + item.poster_path}
                              resizeMode="cover"
                              style={styles.cellImageCard}
                        />
                        <View style={styles.likeIconContainer}>
                              <Icon name={'heart'} size={24} color={color.default.pink} onPress={() => removeMovieToFavorite(item?.id)} />
                        </View>
                        <View style={styles.shareIconContainer}>
                              <Icon name={'share-variant-outline'} size={24} color={color.default.pink} onPress={() => onSharePress(item)} />
                        </View>
                  </Pressable>
            );
      }, []);

      return (
            <View style={styles.container}>
                  <Header
                        showMenuButton
                        text="Favorite"
                        leftIcon={'magnify'}
                        onLeftIconPress={() => navigation.navigate('Search')}
                  />
                  {
                        movies?.length > 0
                        ?
                              <CollectionView
                                    data={movies}
                                    renderItem={({item}) => <Cell item={item}/>}
                                    contentContainerStyle={styles.cellContainer}
                                    columnWrapperStyle={styles.cellColumnContainer}
                              />
                        :
                              <View style={styles.bodyContainer}>
                                    <Icon name={'alert-circle-outline'} size={120} color={color.dark.primary} />
                                    <Label text='No Movies Favored' type='title' />
                              </View>
                  }
            </View>
      );
};

export default MovieFavoriteScreen;

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
