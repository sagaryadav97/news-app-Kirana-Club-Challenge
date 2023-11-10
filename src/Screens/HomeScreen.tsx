import React, { useEffect, useRef, useState } from "react"
import { FlatList, Text, View } from "react-native"
import { NewsCard } from "../Components/NewsCard"
import NewsService from "../Services/NewsService"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from "@react-navigation/native"
import { NewsTypeList, NewsType } from "../Types/NewsType"
import Header from "../Components/Header"
import { colorObj } from "../Utils/Colors"

const STORAGE_KEY = "headlines"
let timer: string | number | NodeJS.Timeout | undefined

const HomeScreen = () => {
  const [viewState, setViewState] = useState<Array<NewsType>>([])
  const flatListRef = useRef(null)
  const [pin, setPin] = useState<NewsType>()

  const scrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current?.scrollToOffset({
        y: 0,
        animated: true,
      })
    }
  }
  const handlePin = (id: number) => {
    const pinnedHeadline = viewState[id]
    setPin(pinnedHeadline)
  }

  const handleDelete = (id: number) => {
    setViewState((prevHeadlines) => prevHeadlines.filter((_, i) => i !== id))
  }

  const fetchHeadlines = async () => {
    try {
      const response = await NewsService.getTopHeadlines()
      const newHeadlines = response.articles
      const newViewState = newHeadlines.slice(0, 10)
      const remainingHeadlines = newHeadlines.slice(10)
      setViewState(newViewState)
      await AsyncStorage.setItem(
        "headlines",
        JSON.stringify(remainingHeadlines)
      )
    } catch (error) {
      console.error("Error fetching headlines:", error)
    }
  }

  const getStoredHeadlines = async (): Promise<any[]> => {
    const storedData = await AsyncStorage.getItem(STORAGE_KEY)

    return storedData ? JSON.parse(storedData) : []
  }

  const addFiveObjectsToViewState = async () => {
    const storedHeadlines = await getStoredHeadlines()
    if (storedHeadlines.length >= 5) {
      setViewState((prevViewState) => {
        const newViewState = [...prevViewState, ...storedHeadlines.slice(0, 5)] // Add 5 objects
        const remainingHeadlines = storedHeadlines.slice(5)

        // Update local storage with the remaining headlines
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(remainingHeadlines))

        return newViewState
      })
      scrollToTop()
    } else {
      fetchHeadlines()
    }
  }

  const addFiveAndResetTimer = (): void => {
    addFiveObjectsToViewState()
    resetTimer()
  }

  const resetTimer = (): void => {
    clearInterval(timer)
    startTimer()
  }

  const startTimer = (): void => {
    // Set up a timer to add 5 objects every 10 seconds
    timer = setInterval(() => {
      addFiveObjectsToViewState()
    }, 5000)
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchHeadlines()
      // Initial load
    }, [])
  )

  useEffect(() => {
    startTimer()

    // Clear the timer on component unmount
    return () => clearInterval(timer)
  }, []);

  return (
    <View>
      <Header refresh={addFiveAndResetTimer} />
      {pin && (
        <View
          style={{
            backgroundColor: colorObj.pin,
            padding: 10,
          }}
        >
          <Text>{pin.title}</Text>
        </View>
      )}
      <FlatList
        data={viewState.reverse()}
        ref={flatListRef}
        // keyExtractor={(item, index) => index.toString()}
        style={{
          backgroundColor: colorObj.flatList,
        }}
        renderItem={({ item, index }: NewsTypeList) => {
          return (
            <NewsCard
              handleDelete={handleDelete}
              handlePin={handlePin}
              urlToImage={item.urlToImage}
              publishedAt={item.publishedAt}
              title={item.title}
              description={item.description}
              id={index}
            />
          )
        }}
      />
    </View>
  )
}

export default HomeScreen
