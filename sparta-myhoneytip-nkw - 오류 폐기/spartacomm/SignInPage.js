import { Box, Button, Center, Image, Spacer } from "native-base";
import { StyleSheet } from "react-native";
import '../global.js'

export default function SignInPage({ navigation }) {
  const goMain = () => {
    global.load = "false"
    navigation.push("Home");
  };

  return (
    <Center style={styles.container}>
      <Image
        alt="logo"
        size="2xl"
        resizeMode="contain"
        source={{
          uri: "data:image/png;base64,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",
        }}
      />
      <Box>Welcome to Sparta Community</Box>
      <Button
        mt={10}
        onPress={goMain}
        varient="ghost"
        backgroundColor="#facc15">
        KaKao Login
      </Button>
    </Center>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
