import * as React from 'react';
import {
  StyleProp,
  ViewStyle,
  ImageURISource,
  FlatListProps,
  SectionListProps,
} from 'react-native';

interface Params = {
  allLoad: boolean;
};

export interface ListViewProps<ItemT>
  extends FlatListProps,
    SectionListProps<ItemT> {
  listType?: 'FlatList' | 'SectionList';
  initialRefresh?: boolean;
  enableLoadMore?: boolean;
  enableRefresh?: boolean;
  emptyStyle?: StyleProp<ViewStyle>;
  emptySource?: ImageSourcePropType;
  emptyTitle?: string;
  onRefresh: (stopRefresh: () => void) => void;
  onEndReached: (stopEndReached: (params?: Params) => void) => void;
}

class ListView<ItemT> extends React.Component<ListViewProps<ItemT>> {
  startRefresh: () => void;
  stopRefresh: () => void;
  startEndReached: () => void;
  stopEndReached: (params?: Params) => void;
}

export default ListView;
