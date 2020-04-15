import {entryChangeView, showRemoveButtonListener, hideRemoveButtonListener} from "./eventListeners"

export function initializeEntry(entry, hidden) {
	const li = document.createElement("LI")
	const element = document.createElement("DIV")
	element.classList.toggle("listElem")

	const checkbox = document.createElement("INPUT")
	checkbox.type = "checkbox"
	checkbox.checked = entry.done

	const contentP = document.createElement("P")
	contentP.textContent = entry.content

	const input = document.createElement("INPUT")
	input.classList.toggle("hidden")
	input.type = "text"

	const elementControls = document.createElement("DIV")
	elementControls.classList.toggle("elementControls")

	const timeInfo = document.createElement("DIV")
	timeInfo.classList.toggle("timeInfo")

	const timeCreated = document.createElement("SPAN")
	const crDate = entry.creationTime
	timeCreated.textContent = "" + crDate.getHours() + ":" + crDate.getMinutes() + " " + crDate.getDay() + "." + crDate.getMonth()

	const timeDone = document.createElement("SPAN")
	if (entry.completionTime && entry.done) {
		const cpDate = entry.completionTime
		timeDone.textContent = "" + cpDate.getHours() + ":" + cpDate.getMinutes() + " " + cpDate.getDay() + "." + cpDate.getMonth()
	}
	else {
		timeDone.classList.toggle("hidden")
	}

	timeInfo.append(timeCreated)
	timeInfo.append(timeDone)

	const remove = document.createElement("BUTTON")
	remove.classList.toggle("removeElement")
	remove.classList.toggle("hidden")

	elementControls.append(timeInfo)
	elementControls.append(remove)

	element.append(checkbox)
	element.append(contentP)
	element.append(input)
	element.append(elementControls)

	li.append(element)


	input.addEventListener("blur", entryChangeView)
	contentP.addEventListener("dblclick", entryChangeView)
	li.addEventListener("mouseover", showRemoveButtonListener)
	li.addEventListener("mouseout", hideRemoveButtonListener)

	li.stateEntry = entry

	if (hidden) {
		hideElement(li)
	}
	return li
}

export function changeView(entry) {
	const li = entry.htmlEntry
	const div = li.firstElementChild

	const checkbox = div.firstElementChild
	const paragraph = checkbox.nextElementSibling
	const input = paragraph.nextElementSibling

	checkbox.classList.toggle("hidden")
	paragraph.classList.toggle("hidden")
	input.classList.toggle("hidden")

	if (paragraph.classList.contains("hidden")) {
		input.value = paragraph.textContent
		input.focus()
		return input.value
	}
	else if (input.value && input.value.length > 0) {
		paragraph.textContent = input.value
		return paragraph.textContent
	}
}

export function show(entry) {
	const li = entry.htmlEntry
	if (li.classList.contains("hidden")) {
		li.classList.toggle("hidden")
	}
}

export function hide(entry) {
	const li = entry.htmlEntry
	hideElement(li)
	
}

function hideElement(element) {
	if (!element.classList.contains("hidden")) {
		element.classList.toggle("hidden")
	}
}

export function showRemoveButton(entry) {
	const li = entry.htmlEntry
	const div = li.firstElementChild
	const elementControls = div.lastElementChild
	const removeButton = elementControls.lastElementChild

	if (removeButton.classList.contains("hidden")) {
		removeButton.classList.toggle("hidden")
	}
} 

export function hideRemoveButton(entry) {
	if (!entry.htmlEntry) {
		return
	}
	const li = entry.htmlEntry
	const div = li.firstElementChild
	const elementControls = div.lastElementChild
	const removeButton = elementControls.lastElementChild

	if (!removeButton.classList.contains("hidden")) {
		removeButton.classList.toggle("hidden")
	}
} 

export function isHidden(entry) {
	const li = entry.htmlEntry
	return li.classList.contains("hidden")
}