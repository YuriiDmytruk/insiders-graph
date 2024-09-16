import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  LineChart: undefined;
  PieChart: undefined;
  BarChart: undefined;
};

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
