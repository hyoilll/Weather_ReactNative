import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "21bda8e399d110518c102ec4ec22ffa5";

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [mainWeather, setMainWeather] = useState();
  const [days, setDays] = useState({});
  const [permission, setPermission] = useState(true);

  const getMainWeather = (jsonDays) => {
    let daysObj = new Object();

    jsonDays.forEach((day) => {
      const date = day.dt_txt.split(" ")[0];
      const time = day.dt_txt.split(" ")[1];
      const weather = day.weather[0].main;
      const description = day.weather[0].description;
      const temp = day.main.temp;

      const keys = Object.keys(daysObj);
      if (keys.includes(date)) {
        daysObj[date][time] = {
          weather,
          description,
          temp,
        };
      } else {
        daysObj[date] = {
          [time]: {
            weather,
            description,
            temp,
          },
        };
      }
    });
    setDays(daysObj);
  };

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setPermission(false);
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city + " " + location[0].district);

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    const json = await res.json();

    return json.list;
  };

  useEffect(() => {
    getWeather().then((item) => {
      getMainWeather(item);
    });
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.city}>
          <Text style={styles.cityName}>{city}</Text>
        </View>
        <ScrollView
          horizontal
          pagingEnabled
          contentContainerStyle={styles.weather}
        >
          {Object.keys(days).length === 0 ? (
            <View style={styles.day}>
              <ActivityIndicator
                size="large"
                color="purple"
              ></ActivityIndicator>
            </View>
          ) : (
            Object.keys(days).map((day, idx) => {
              console.log(days[day]);

              let sumTemp = 0;
              const weatherDays = {};
              for (const property in days[day]) {
                sumTemp += days[day][property].temp;

                const weather = days[day][property].weather;
                const keys = Object.keys(weatherDays);
                if (keys.includes(days[day][property].weather)) {
                  weatherDays[weather] += 1;
                } else {
                  weatherDays[weather] = 1;
                }
              }
              const maxValue = Math.max(...Object.values(weatherDays));
              const weatherToday = Object.keys(weatherDays).find(
                (key) => weatherDays[key] === maxValue
              );

              const avgTemp = Math.floor(
                sumTemp / Object.keys(days[day]).length
              );

              let date = day.split("-");
              const m = date[1];
              const d = date[2];
              date = m + "月" + d + "日";

              return (
                <View key={idx} style={styles.day}>
                  <View style={styles.info}>
                    <Text style={styles.date}>{date}</Text>
                    <Text style={styles.description}>{weatherToday}</Text>
                    <Text style={styles.temp}>{avgTemp}</Text>
                  </View>
                  <View style={styles.detail}>
                    {Object.keys(days[day]).map((detail, idx) => {
                      return (
                        <View key={idx} style={styles.detailWrapper}>
                          <Text style={styles.detailTime}>{detail}</Text>
                          <Text style={styles.detailWeather}>
                            {days[day][detail].weather}
                          </Text>
                          <Text style={styles.detailTemp}>
                            {days[day][detail].temp}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })
          )}
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
  date: {
    fontSize: 40,
    fontWeight: "bold",
  },
  temp: {
    marginTop: -30,
    fontSize: 60,
    fontWeight: "bold",
  },
  description: {
    fontSize: 100,
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
  detailWrapper: {
    flexDirection: "row",
  },
  detailTime: { flex: 1, fontSize: 20, marginBottom: 5 },
  detailWeather: { flex: 1, fontSize: 20, marginBottom: 5 },
  detailTemp: { flex: 1, fontSize: 20, marginBottom: 5 },
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
