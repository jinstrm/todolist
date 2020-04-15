import {State} from "./state"

const storageItem = "toDoListState"


export function storeState(state) {
	localStorage.removeItem(storageItem)
	const toStore = State.toPlaneObject(state)

	localStorage.setItem(storageItem, JSON.stringify(toStore))
}

export function loadState() {
	const state = JSON.parse(localStorage.getItem(storageItem))
	return State.fromPlaneObject(state)
}
