import {sortingChanged, clearList} from "./eventListeners"

export function initializeList(list, sortingStrategies) {
	const listContainer = document.createElement("DIV")
	listContainer.classList.toggle("listContainer")

	const listHeader = document.createElement("DIV")
	listHeader.classList.toggle("listHeader")

	const header3 = document.createElement("H3")
	header3.textContent = list.name

	const sortOptions = document.createElement("SELECT")

	sortOptions.classList.toggle("sortOptions")
	for (let sortingStrategy of sortingStrategies) {
		let option = document.createElement("OPTION")
		option.value = sortingStrategy.id
		option.textContent = sortingStrategy.name
		sortOptions.append(option)
	}
	sortOptions.addEventListener("change", sortingChanged)

	listHeader.append(header3)
	listHeader.append(sortOptions)

	const ul = document.createElement("UL")
	listContainer.append(listHeader)
	listContainer.append(ul)

	const button = document.createElement("BUTTON")
	button.textContent = `Clear ${list.name.toLowerCase()} task list`
	button.classList.toggle("clearList")
	button.addEventListener("click", clearList)

	listContainer.append(button)



	listContainer.stateList = list
	return listContainer
}

export function initializeEntries(list) {
	list.entries.forEach( element => {
		addToList(element, list)
	})
}

export function addToList(entry, list) {
	const listContainer = list.htmlEntry
	const ul = listContainer.firstElementChild.nextElementSibling

	ul.append (entry.htmlEntry)
}

export function addToListBefore(entry, referenceEntry) {
	const entryHtml = entry.htmlEntry
	const referenceEntryHtml = referenceEntry.htmlEntry

	referenceEntryHtml.before(entryHtml)
}

export function addToListAfter(entry, referenceEntry) {
	const entryHtml = entry.htmlEntry
	const referenceEntryHtml = referenceEntry.htmlEntry

	referenceEntryHtml.after(entryHtml)
}