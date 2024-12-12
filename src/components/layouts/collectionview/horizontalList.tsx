import React from 'react';
import { View, FlatList, ViewStyle, ListRenderItem} from 'react-native';

type HorizontalListViewProps<T> = {
      ListHeaderComponent?: React.ReactElement<any>
      data: T[] | undefined;
      renderItem: ListRenderItem<T>;
      containerStyle?: ViewStyle;
      style?: ViewStyle;
};

const HorizontalListView = <T,>({
      ListHeaderComponent,
      data,
      renderItem,
      containerStyle,
      style,
}: HorizontalListViewProps<T>) => {

      return (
            <View style={style}>
                  {
                        ListHeaderComponent && ListHeaderComponent
                  }
                  <FlatList
                        data={data}
                        renderItem={({ item, index }) => renderItem({ item, index, separators: { highlight: () => {}, unhighlight: () => {}, updateProps: () => {} } })}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={containerStyle}
                  />
            </View>
      );
};

export default HorizontalListView;
