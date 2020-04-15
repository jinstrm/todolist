import {newElement, removeElement, checkElement} from "./eventListeners"

export function initializeState(state) {
	const toDoListBody = document.querySelector(".toDoListBody")

	for (let i = toDoListBody.children.length - 1; i > 0 ; i--) {
		toDoListBody.children[i].remove()
	}

	toDoListBody.append(state.openList.htmlEntry)
	toDoListBody.append(state.doneList.htmlEntry)

	toDoListBody.state = state

	toDoListBody.addEventListener("click", newElement)
	toDoListBody.addEventListener("click", removeElement)
	toDoListBody.addEventListener("change", checkElement)

	return toDoListBody
}

export function getState() {
	const toDoListBody = document.querySelector(".toDoListBody")
	return toDoListBody.state
}