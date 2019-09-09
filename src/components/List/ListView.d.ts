import * as React from 'react';
import { StyleProp, ImageURISource, FlatListProps } from 'react-native';

export interface ListViewProps extends FlatListProps {
  data: Array | object;
  listType: 'FlatList' | 'SectionList';
  initialRefresh: boolean;
  enableLoadMore: boolean;
  enableRefresh: boolean;
  emptyStyle: StyleProp;
  emptySource: ImageSourcePropType;
  emptyTitle: string;
}

const ListView: React.ComponentClass<ListViewProps>;

export default ListView;
