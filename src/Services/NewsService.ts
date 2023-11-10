// services/NewsService.ts

import { apiKeys } from "../Utils/NewsApiConfig"

class NewsService {
  static API_KEY = apiKeys.API_KEY // Replace with your actual News API key
  static BASE_URL = apiKeys.BASE_URL
  static COUNTRY = apiKeys.COUNTRY

  // Static method to fetch top headlines
  static getTopHeadlines = async () => {
    try {
      const response = await fetch(
        `${NewsService.BASE_URL}?country=${NewsService.COUNTRY}&pageSize=100&page=1&apiKey=${NewsService.API_KEY}`
      )
      const data = await response.json()
      return data
    } catch (error) {
      throw new Error("Error fetching headlines")
    }
  }
}

export default NewsService
