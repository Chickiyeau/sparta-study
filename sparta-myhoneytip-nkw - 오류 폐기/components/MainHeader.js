import {
  View,
  Text,
  ScrollView,
  HStack,
  Box,
  Button,
  Center,
} from "native-base";
import { StyleSheet } from "react-native";
import ListHeaderItem from "./ListHeaderItem";

export default function ListHeader() {
  return (
    <HStack justifyContent="center">
      <ListHeaderItem title="전체" />
      <ListHeaderItem title="앱개발종합반" />
      <ListHeaderItem title="웹개발종합반" />
      <ListHeaderItem title="액셀보다 쉬운 SQL" />
      <ListHeaderItem title="무료특강" />
    </HStack>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: "gray",
  },
});
