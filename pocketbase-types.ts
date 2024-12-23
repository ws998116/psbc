/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Series = "series",
	Sermons = "sermons",
	Speakers = "speakers",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type SeriesRecord = {
	date?: IsoDateString
	imageUrl: string
	sermons?: RecordIdString[]
	title: string
	url?: string
}

export type SermonsRecord = {
	audioUrl?: string
	date: IsoDateString
	imageUrl: string
	seriesTitle?: string
	seriesUrl?: string
	slidesUrl?: string
	speaker?: RecordIdString
	title: string
	url: string
}

export type SpeakersRecord = {
	description?: string
	imageUrl?: string
	name: string
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type SeriesResponse<Texpand = unknown> = Required<SeriesRecord> & BaseSystemFields<Texpand>
export type SermonsResponse<Texpand = unknown> = Required<SermonsRecord> & BaseSystemFields<Texpand>
export type SpeakersResponse<Texpand = unknown> = Required<SpeakersRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	series: SeriesRecord
	sermons: SermonsRecord
	speakers: SpeakersRecord
	users: UsersRecord
}

export type CollectionResponses = {
	series: SeriesResponse
	sermons: SermonsResponse
	speakers: SpeakersResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'series'): RecordService<SeriesResponse>
	collection(idOrName: 'sermons'): RecordService<SermonsResponse>
	collection(idOrName: 'speakers'): RecordService<SpeakersResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
