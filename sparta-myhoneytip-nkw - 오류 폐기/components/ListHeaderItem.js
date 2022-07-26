import { Button } from "native-base";

export default function ListHeaderItem({ title }) {
  const showCates = () => {
    console.log(`get ${title} data `);
  };

  return (
    <Button size="sm" variant="ghost" onPress={showCates}>
      {title}
    </Button>
  );
}
