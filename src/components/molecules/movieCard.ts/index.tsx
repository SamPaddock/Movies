import React, { useCallback, useEffect, useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import Label from '../../atoms/label';
import styles from './style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../helper/redux/store';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../helper/navigation/rootStackParams';
import { color } from '../../../assets/style/global';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MovieDetailType, MovieType } from '../../../constant/types/types';
import { Movie_Image_BASE_URL } from '../../../constant';
import { getFormattedDate, getYearFromData, shareContent } from '../../../helper/functions/helper';
import { addMovie, removeMovie } from '../../../helper/redux/movieSlice';
import { MotiView } from 'moti';
import IconView from '../../atoms/icon';

interface MovieCardProps {
      item?: MovieDetailType | MovieType;
      showMovieInfo?: boolean;
}

const MovieCard = (props: MovieCardProps) => {
      const { item, showMovieInfo = false } = props;
      const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Search'>>();
      const { isRTL, theme } = useSelector((state: RootState) => state.preferences);
      const { movies } = useSelector((state: RootState) => state.movies);
      const liked = movies.some((movie) => movie.id === item?.id);
      const dispatch = useDispatch();
      const style = styles(theme);
      const [animating, setAnimating] = useState(false);

      const onCardPress = useCallback(() => {
            if (item?.id) {
                  navigation.navigate('MovieDetail', { movieId: item?.id, movieTitle: item?.title });
            }
      }, [item, navigation]);

      const onSharePress = () => {
            if (item) {
                  shareContent(Movie_Image_BASE_URL + item?.poster_path, item?.title);
            }
      };

      const handleLikePress = useCallback(() => {
            setAnimating(true);
            if (liked) {
              item?.id && dispatch(removeMovie(item.id));
            } else {
              item && dispatch(addMovie(item));
            }
            setTimeout(() => setAnimating(false), 300);
      }, [dispatch, item, liked]);

      return (
            item && (
                  <Pressable
                        key={`idx_${item.id}_${item.backdrop_path}`}
                        style={style.cellCard}
                        onPress={() => onCardPress()}
                  >
                        <Image
                              source={{ uri: Movie_Image_BASE_URL + item.poster_path }}
                              resizeMode="cover"
                              style={style.cellImageCard}
                        />
                        <View style={style.likeIconContainer}>
                        <MotiView
                              key={`like-icon-${item.id}`}
                              from={{ scale: 0.8, opacity: 0 }}
                              animate={{
                                    scale: animating ? [1.2, 1] : 1,
                                    opacity: liked ? 1 : 0.8,
                              }}
                              transition={{
                                    type: 'spring',
                                    duration: 300,
                              }}
                        >
                              <IconView
                                    name={liked ? 'heart' : 'heart-outline'}
                                    color={color.default.pink}
                                    onPress={handleLikePress}
                              />
                        </MotiView>
                        </View>

                        <MotiView style={style.shareIconContainer}>
                              <IconView name="share" color={color.default.pink} onPress={() => onSharePress()} />
                        </MotiView>

                        {showMovieInfo && (
                        <View style={style.infoContainer}>
                              <Label style={{ color: color.default.silver }} text={item?.title} type="body" />
                              <Label
                                    style={{ color: color.default.silver }}
                                    text={`Rating: ${item?.vote_average?.toFixed(1)}`}
                                    type="caption"
                              />
                              <Label
                                    style={{ color: color.default.silver }}
                                    text={`${getYearFromData(item?.release_date)} | ${getFormattedDate(item?.release_date)}`}
                                    type="caption"
                              />
                        </View>
                        )}
                  </Pressable>
            )
      );
};

export default MovieCard;
