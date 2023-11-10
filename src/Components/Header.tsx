import React from "react"
import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import { colorObj } from "../Utils/Colors"
import { imagesObj } from "../Utils/Images"

interface props {
  refresh: () => void
}

export const Header = ({ refresh }: props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My News</Text>
      <Pressable onPress={refresh} style={styles.iconHolder}>
        <Image style={styles.image} source={imagesObj.refreshIcon} />
      </Pressable>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 70,
    padding: 20,
    backgroundColor: colorObj.backgroundColor,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  image: {
    height: 25,
    width: 25,
  },
  title: {
    fontSize: 30,
  },
  iconHolder: {
    height: 40,
    width: 40,
    backgroundColor: colorObj.gray,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
})
