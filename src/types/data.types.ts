const DataField = {
  fieldCategory: "category",
  fieldValue: "value",
} as const

const DataDirection = {
  Up: "asc",
  Down: "desc",
} as const

export type StateDataType = {
  data: DataActionType[]
  originalData: DataActionType[]
  loading: boolean
  minValue: number
  sortBy: "category" | "value" | null
  sortDirection: "asc" | "desc"
}
export type DataActionType = {
  category: string
  value: number
}

export type DataField = (typeof DataField)[keyof typeof DataField]
export type DataDirection = (typeof DataDirection)[keyof typeof DataDirection]
