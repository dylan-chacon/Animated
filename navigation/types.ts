import { StackScreenProps } from '@react-navigation/stack';

export type MockDataItem = {
  id: string;
  title: string;
  image: string;
};

export type RootStackParamList = {
  AnimatedList: undefined;
  Details: { item: MockDataItem };
};

export type DetailScreenProps = StackScreenProps<RootStackParamList, 'Details'>;
export type AnimatedListScreenProps = StackScreenProps<RootStackParamList, 'AnimatedList'>;
