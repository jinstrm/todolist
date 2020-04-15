import { getState } from "./stateHtmlStrategies"


export function newElement(event) {
	const submitButton = event.target

	if (submitButton.parentElement.classList.contains("createElement")
		&& submitButton.type === "submit")
	{
		const input = submitButton.previousElementSibling

		const state = getState()
		state.add(input.value)
	}
}

export function removeElement(event) {
	const removeButton = event.target

	if (removeButton.classList.contains("removeElement")) {
		const state = getState()
		const htmlListElement = removeButton.closest("LI")

		const entry =  htmlListElement.stateEntry

		state.remove(entry)
	}
}

export function checkElement(event) {
	const checkbox = event.target
	if (checkbox.parentElement.classList.contains("listElem")
		&& checkbox.type === "checkbox") 
	{
		const state = getState()
		const htmlListElement = checkbox.closest("LI")

		const entry =  htmlListElement.stateEntry

		state.changeList(entry)
	}
}

export function entryChangeView(event) {
	const target = event.target

	let processEvent = false

	if (target.parentElement.classList.contains("listElem") 
		&& target.tagName === "P") 
	{
		processEvent = true
	}
	else if (target.parentElement.classList.contains("listElem") 
		&& target.type === "text") 
	{
		processEvent = true
	}


	if (processEvent) {
		const htmlListElement = target.closest("LI")
		const entry = htmlListElement.stateEntry

		entry.changeView()
	}
}

export function searchInList(event) {
	const value = event.target.value
	getState().search(value)
}

export function showRemoveButtonListener(event) {
	const state = getState()
	callIfMouseCrossedItemOnMouseEvent(event, (element) => state.showRemoveButton(element))
}

export function hideRemoveButtonListener(event) {
	const state = getState()
	callIfMouseCrossedItemOnMouseEvent(event, (element) => state.hideRemoveButton(element))
}

function callIfMouseCrossedItemOnMouseEvent(itemEvent, callback) {
	const target = event.target
	const relatedTarget = event.relatedTarget

	const closetTargetListElement = target.closest(".listElem")
	const closetRelatedTargetListElement = relatedTarget.closest(".listElem")

	if (closetTargetListElement && closetTargetListElement !== closetRelatedTargetListElement) {
		callback(closetTargetListElement.parentElement.stateEntry)
	}
}

export function sortingChanged(event) {
	const newSorting = event.target.value

	const listContainer = event.target.closest(".listContainer")
	getState().sort(listContainer.stateList, newSorting)
}

export function clearList(event) {
	const listClearButton = event.target
	const listContainer = listClearButton.parentElement

	if (listContainer.classList.contains("listContainer")) {
		getState().clearList(listContainer.stateList)
	}
}