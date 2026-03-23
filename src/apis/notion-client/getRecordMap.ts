import { NotionAPI } from "notion-client"

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const getRecordMap = async (pageId: string, retries = 3) => {
  const api = new NotionAPI()
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const recordMap = await api.getPage(pageId)
      return recordMap
    } catch (e) {
      if (attempt === retries) throw e
      console.warn(`getRecordMap attempt ${attempt} failed for ${pageId}, retrying...`)
      await wait(attempt * 1000)
    }
  }
  throw new Error(`getRecordMap failed after ${retries} attempts for ${pageId}`)
}
