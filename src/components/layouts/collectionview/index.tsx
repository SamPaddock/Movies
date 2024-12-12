import React from 'react';
import { FlatList, ViewStyle, ListRenderItem, ActivityIndicator} from 'react-native';
import { color } from '../../../assets/style/global';

type CollectionViewProps<T> = {
      data: T[] | undefined;
      renderItem: ListRenderItem<T>;
      numColumns?: number;
      contentContainerStyle?: ViewStyle;
      columnWrapperStyle?: ViewStyle;
      onEndReached?: () => void;
      isLoadingMore?: boolean;
};

const CollectionView = <T,>({
      data,
      renderItem,
      numColumns = 2,
      contentContainerStyle,
      columnWrapperStyle,
      onEndReached,
      isLoadingMore = false,
}: CollectionViewProps<T>) => {

      return (
            <FlatList
                  data={data}
                  renderItem={({ item, index }) => renderItem({ item, index, separators: { highlight: () => {}, unhighlight: () => {}, updateProps: () => {} } })}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={numColumns}
                  contentContainerStyle={[
                        contentContainerStyle,
                  ]}
                  columnWrapperStyle={[
                        columnWrapperStyle,
                  ]}
                  onEndReached={onEndReached}
                  onEndReachedThreshold={0.1}
                  ListFooterComponent={isLoadingMore ? <ActivityIndicator size="small" color={color.dark.accent} /> : null}
            />
      );
};

export default CollectionView;
