import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.containerView}>
      <View style={styles.views1}></View>
      <View style={styles.views2}></View>
      <View style={styles.views3}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center ",
    justifyContent: "center",
  },
  text: {
    color: "blue",
  },
  containerView: {
    flex: 1,
  },
  views1: {
    flex: 0.1,
    backgroundColor: "tomato",
  },
  views2: {
    flex: 0.8,
    backgroundColor: "green",
  },
  views3: {
    flex: 0.1,
    backgroundColor: "blue",
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

// width/height
// avatarやimageなどにはwidth/heightを利用してサイズを調整するけど、
// layoutに対しては端末の画面のサイズがそれぞれ違うので、width/heightを使わない。
// よって、react nativeではflex:1のように比率でlayoutを調整する
