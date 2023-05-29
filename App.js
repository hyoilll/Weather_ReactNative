import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.city}>
          <Text style={styles.cityName}>Osaka</Text>
        </View>
        <ScrollView
          horizontal
          pagingEnabled
          contentContainerStyle={styles.weather}
        >
          <View style={styles.day}>
            <View style={styles.info}>
              <Text style={styles.temp}>27</Text>
              <Text style={styles.description}>Sunny</Text>
            </View>
            <View style={styles.detail}>
              <Text>detail</Text>
            </View>
          </View>
          <View style={styles.day}>
            <View style={styles.info}>
              <Text style={styles.temp}>27</Text>
              <Text style={styles.description}>Sunny</Text>
            </View>
            <View style={styles.detail}>
              <Text>detail</Text>
            </View>
          </View>
          <View style={styles.day}>
            <View style={styles.info}>
              <Text style={styles.temp}>27</Text>
              <Text style={styles.description}>Sunny</Text>
            </View>
            <View style={styles.detail}>
              <Text>detail</Text>
            </View>
          </View>
          <View style={styles.day}>
            <View style={styles.info}>
              <Text style={styles.temp}>27</Text>
              <Text style={styles.description}>Sunny</Text>
            </View>
            <View style={styles.detail}>
              <Text>detail</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellowgreen",
  },
  city: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 48,
    fontWeight: "bold",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
  },
  temp: {
    fontSize: 100,
    fontWeight: "bold",
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  },
  info: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "red",
  },
  detail: {
    flex: 1,
  },
});

// ViewはContainer
// divの代わりにViewを使う
// Viewを使うためにはimportする必要がある

// 全てのString（文字列）はText Componentに囲まれなければならない
// span, pの代わりに使う

// 全てのcssを使えるわけではない

// StyleSheet.create()はstyleのObjectを生成する
// create()を使う理由
// ①自動管制機能を提供する

// flex
// Viewは基本的にdisplay flexが適用されている状態
// webとは違って、flex directionのデフォルトはcolumn
// よって、justifyContentも縦軸が基準になる

// width/height
// avatarやimageなどにはwidth/heightを利用してサイズを調整するけど、
// layoutに対しては端末の画面のサイズがそれぞれ違うので、width/heightを使わない。
// よって、react nativeではflex:1のように比率でlayoutを調整する

// ScrollViewは画面より大きいはずなので、flexでサイズを調整できない
