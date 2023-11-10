import React, { useRef } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { imagesObj } from "../Utils/Images"
import { colorObj } from "../Utils/Colors"
import moment from "moment"
import Swipeable from "react-native-gesture-handler/Swipeable"

interface cardProps {
  title: String
  description: String
  //   author: String
  //   url: String
  urlToImage: String
  publishedAt: Date
  //   content: String
  id: number
  handlePin: (id: number) => void
  handleDelete: (id: number) => void
}

export const NewsCard = ({
  publishedAt,
  urlToImage,
  title,
  id,
  handleDelete,
  handlePin,
}: cardProps) => {
  const swipeableRef = useRef<Swipeable>(null)

  const LeftSwipeActions = () => {
    return (
      <View
        style={{
          backgroundColor: colorObj.green,
          justifyContent: "center",
          alignItems: "flex-end",
          height: 100,
          marginTop: 10,
        }}
      >
        <Text
          style={{
            color: "#1b1a17",
            // paddingHorizontal: 10,
            fontWeight: "600",
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}
        >
          Pin
        </Text>
      </View>
    )
  }
  const rightSwipeActions = () => {
    return (
      <View
        style={{
          backgroundColor: colorObj.danger,
          justifyContent: "center",
          alignItems: "flex-end",
          height: 100,
          marginTop: 10,
        }}
      >
        <Text
          style={{
            color: "#1b1a17",
            // paddingHorizontal: 10,
            fontWeight: "600",
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}
        >
          Delete
        </Text>
      </View>
    )
  }
  const swipeFromLeftOpen = () => {
    console.log("Swipe from left de", id)
    handlePin(id)
    swipeableRef.current?.close()
  }
  const swipeFromRightOpen = () => {
    console.log("Swipe from right pi", id)
    handleDelete(id)
    swipeableRef.current?.close()
  }
  return (
    <Swipeable
      ref={swipeableRef}
      renderLeftActions={LeftSwipeActions}
      renderRightActions={rightSwipeActions}
      onSwipeableRightOpen={swipeFromRightOpen}
      onSwipeableLeftOpen={swipeFromLeftOpen}
    >
      <View style={styles.container}>
        <View style={styles.left}>
          <Text ellipsizeMode="tail" numberOfLines={2} style={styles.leftTitle}>
            {title}
          </Text>
          <Text style={styles.time}>
            {moment(publishedAt).fromNow()} - 10 min read
          </Text>
        </View>
        <View style={styles.right}>
          <Image
            source={urlToImage ? { uri: urlToImage } : imagesObj.logoImage}
            style={styles.rightImage}
          />
        </View>
      </View>
    </Swipeable>
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
    marginLeft: 10,
  },
  leftTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  time: {
    marginTop: 12,
    fontSize: 12,
    color: colorObj.cardSubTitle,
    fontWeight: "600",
    textTransform: "capitalize",
  },
})
