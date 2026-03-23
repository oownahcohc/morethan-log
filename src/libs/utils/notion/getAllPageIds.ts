import { idToUuid } from "notion-utils"
import { ExtendedRecordMap, ID } from "notion-types"

export default function getAllPageIds(
  response: ExtendedRecordMap,
  viewId?: string
) {
  const collectionQuery = response.collection_query
  const views = Object.values(collectionQuery)[0]

  let pageIds: ID[] = []
  if (viewId) {
    const vId = idToUuid(viewId)
    pageIds = views[vId]?.blockIds
  } else {
    const pageSet = new Set<ID>()
    // * type not exist
    Object.values(views).forEach((view: any) => {
      // grouped views (Board, Grouped Gallery) store ids in collection_group_results
      view?.collection_group_results?.blockIds?.forEach((id: ID) =>
        pageSet.add(id)
      )
      // ungrouped views (Table, Gallery, List) store ids directly in blockIds
      view?.blockIds?.forEach((id: ID) => pageSet.add(id))
    })
    pageIds = [...pageSet]
  }
  return pageIds
}
