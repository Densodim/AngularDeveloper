import { DataActionType } from "./data.types"

export type FileHistory = {
	fileName: string
	uploadDate: Date
	jsonDate: DataActionType
}

export type FileStateType = {
	history: FileHistory[]
	selectedFileName: string | null
}
