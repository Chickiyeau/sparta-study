/// <reference types="react" />
import { DrawerNavigationState, DrawerStatus, ParamListBase } from '@react-navigation/native';
import type { DrawerDescriptorMap, DrawerNavigationConfig, DrawerNavigationHelpers } from '../types';
declare type Props = DrawerNavigationConfig & {
    defaultStatus: DrawerStatus;
    state: DrawerNavigationState<ParamListBase>;
    navigation: DrawerNavigationHelpers;
    descriptors: DrawerDescriptorMap;
};
export default function DrawerView({ navigation, ...rest }: Props): JSX.Element;
export {};
