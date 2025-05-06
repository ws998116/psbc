import { ScrollView, StyleSheet } from 'react-native';

import { Text, View } from '@/src/components/Themed';
import { Image } from 'expo-image';

export default function TabOneScreen() {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* <Image
        source={
          "https://www.parkstreetbrethren.org/upload/images/spire_shoot/first_service/resized_for_content_use/600_resize2016_06_05_parkstreet_115.jpg"
        }
        style={{
          width: "100%",
          height: "100%",
          padding: "5%",
          borderRadius: borderRadius,
        }}
      /> */}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.title}>Welcome!</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    // marginTop: "5%",
    paddingBottom: '25%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
