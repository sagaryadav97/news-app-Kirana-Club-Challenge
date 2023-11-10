export interface NewsType {
  source: Source
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: Date
  content: string
}

export interface Source {
  id: string
  name: string
}

export interface NewsTypeList {
    item: NewsType
    index: number
  }
