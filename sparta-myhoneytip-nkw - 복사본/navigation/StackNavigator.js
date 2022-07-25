import { createStackNavigator } from "@react-navigation/stack";
import AddPage from "../spartacomm/AddPage";
import DetailPage from "../spartacomm/DetailPage";
import SignInPage from "../spartacomm/SignInPage";
import BottomTabNavigator from "./BottomNavigator";
import sparta from '../spartacomm/sparta';
import Viewsparta from '../spartacomm/Viewsparta';
import Detailsparta from '../spartacomm/Detailsparta';
import Selcourse from '../spartacomm/Selcourse';
import spartaja from '../spartacomm/spartaja';
import MainPage from "../spartacomm/MainPage";

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={SignInPage} />
      <Stack.Screen name="Home" component={BottomTabNavigator} />
      <Stack.Screen name="Add" component={AddPage} />
      <Stack.Screen name="Detail" component={DetailPage} />
      <Stack.Screen name="sparta" component={sparta}/>
            <Stack.Screen name="Viewsparta" component={Viewsparta}/>
            <Stack.Screen name="Detailsparta" component={Detailsparta}/>
            <Stack.Screen name="Selcourse" component={Selcourse}/>
            <Stack.Screen name="spartaja" component={spartaja}/>
            <Stack.Screen name="MainPage" component={MainPage}/>
    </Stack.Navigator>
  );
}
