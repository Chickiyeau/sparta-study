import * as React from 'react';
import { View, Text } from "react-native";
import * as AuthSession from 'expo-auth-session';

const url = AuthSession.getRedirectUrl();

export default function SettingsScreen() {
   return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<Text style={{fontSize:16,fontWeight:'700'}}>{url}</Text>
</View>
   );
 }