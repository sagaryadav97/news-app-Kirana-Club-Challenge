import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { imagesObj } from "../Utils/Images"
import { colorObj } from "../Utils/Colors"

interface cardProps {
  title: String
  description: String
  author: String
  url: String
  urlToImage: String
  publishedAt: Date
  content: String
}

export const NewsCard = ({ description, title }: cardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text ellipsizeMode="tail" numberOfLines={2} style={styles.leftTitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit. </Text>
        <Text style={styles.time}>3 min age - 10 min read</Text>
      </View>
      <View style={styles.right}>
        <Image source={imagesObj.logoImage} style={styles.rightImage} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 100,
    padding: 20,
    backgroundColor: colorObj.backgroundColor,
    borderRadius: 20,
    margin: 10,
  },
  right: {
    width: "30%",
  },
  left: {
    width: "70%",
  },
  rightImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  leftTitle: {
    fontSize: 16,
    fontWeight: "700"
  },
  time: {
    marginTop: 12,
    fontSize: 12,
    color: colorObj.gray,
    fontWeight: "600"
  },
})
