/// <reference types="react" />
import { DefaultNavigatorOptions, DrawerNavigationState, DrawerRouterOptions, ParamListBase } from '@react-navigation/native';
import type { DrawerNavigationConfig, DrawerNavigationEventMap, DrawerNavigationOptions } from '../types';
declare type Props = DefaultNavigatorOptions<ParamListBase, DrawerNavigationState<ParamListBase>, DrawerNavigationOptions, DrawerNavigationEventMap> & DrawerRouterOptions & DrawerNavigationConfig;
declare function DrawerNavigator({ id, initialRouteName, defaultStatus: customDefaultStatus, backBehavior, children, screenListeners, screenOptions, ...restWithDeprecated }: Props): JSX.Element;
declare const _default: <ParamList extends ParamListBase>() => import("@react-navigation/native").TypedNavigator<ParamList, DrawerNavigationState<ParamListBase>, DrawerNavigationOptions, DrawerNavigationEventMap, typeof DrawerNavigator>;
export default _default;
