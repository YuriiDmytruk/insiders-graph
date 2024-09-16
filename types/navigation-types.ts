import { StackNavigationProp } from '@react-navigation/stack';

// Define your stack navigator's parameter list
export type RootStackParamList = {
  LineChart: undefined;
  PieChart: undefined;
};

// Define a type for navigation prop
export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
