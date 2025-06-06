import { Character } from '@/types/data';
import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  AnimatedList: undefined;
  Details: { item: Character };
};

export type DetailScreenProps = StackScreenProps<RootStackParamList, 'Details'>;
export type AnimatedListScreenProps = StackScreenProps<RootStackParamList, 'AnimatedList'>;
