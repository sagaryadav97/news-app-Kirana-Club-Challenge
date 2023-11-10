import React, { useEffect } from "react"
import { Dimensions, Image, Text, View } from "react-native"
import { imagesObj } from "../Utils/Images"
import { colorObj } from "../Utils/Colors"
import { useNavigation } from "@react-navigation/native"

const windowHeight = Dimensions.get("window").height

const SplashScreen = () => {
  const navigation = useNavigation<any>()

  useEffect(() => {
    setInterval(() => {
      navigation.navigate("HomeScreen")
    }, 1000)
  }, [])

  return (
    <View
      style={{
        height: windowHeight,
        backgroundColor: colorObj.backgroundColor,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View>
        <Image
          source={imagesObj.logoImage}
          style={{ resizeMode: "contain", height: 500, width: 400 }}
        />
        <Text style={{ fontSize: 28, fontWeight: "700", textAlign: "center" }}>
          My News
        </Text>
      </View>
    </View>
  )
}

export default SplashScreen
