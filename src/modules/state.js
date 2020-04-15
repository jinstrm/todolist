import { initializeEntry, changeView, show, hide, showRemoveButton, hideRemoveButton, isHidden } from "./entryHtmlStrategies"
import { addToList, initializeList, initializeEntries, addToListBefore, addToListAfter } from "./listHtmlStrategies"
import { initializeState } from "./stateHtmlStrategies"
import { recordSorting } from "./sorting/recordsSorting"
import { creationTimeSorting } from "./sorting/creationTimeSorting"
import { dueDateSorting } from "./sorting/dueDateSorting"
import { storeState } from "./storage"


const sorting = {
	openList: {
		recordsAsc: recordSorting.sortAsc,
		recordsDesc: recordSorting.sortDesc,
		creationTimeAsc: creationTimeSorting.sortAsc,
		creationTimeDesc: creationTimeSorting.sortDesc,
		strategies: [
			{
				id: "recordsAsc",
				name: "Records (ASC)"
			}, {
				id: "recordsDesc",
				name: "Records (DESC)"
			}, {
				id: "creationTimeAsc",
				name: "Creatied (ASC)"
			}, {
				id: "creationTimeDesc",
				name: "Creatied (DESC)"
			}
		]
	},
	doneList: {
		recordsAsc: recordSorting.sortAsc,
		recordsDesc: recordSorting.sortDesc,
		dueDateAsc: dueDateSorting.sortAsc,
		dueDateDesc: dueDateSorting.sortDesc,
		strategies: [
			{
				id: "recordsAsc",
				name: "Records (ASC)"
			}, {
				id: "recordsDesc",
				name: "Records (DESC)"
			}, {
				id: "dueDateAsc",
				name: "Done (ASC)"
			}, {
				id: "dueDateDesc",
				name: "Done (DESC)"
			}
		]
	}
}

const inserting = {
	openList: {
		recordsAsc: recordSorting.insertSortingAsc,
		recordsDesc: recordSorting.insertSortingDesc,
		creationTimeAsc: creationTimeSorting.insertSortingAsc,
		creationTimeDesc: creationTimeSorting.insertSortingDesc
	},
	doneList: {
		recordsAsc: recordSorting.insertSortingAsc,
		recordsDesc: recordSorting.insertSortingDesc,
		dueDateAsc: dueDateSorting.insertSortingAsc,
		dueDateDesc: dueDateSorting.insertSortingDesc
	}
}

export class Entry {
	constructor(content, noInit) {
		this.content = content
		this.creationTime = new Date()
		this.completionTime = undefined
		this.done = false
		if (!noInit) {
			this.initialize()
		}

	}

	static toPlaneObject(entry) {
		return {
			content: entry.content,
			creationTime: entry.creationTime,
			completionTime: entry.completionTime,
			done: entry.done

		}
	}

	static fromPlaneObject(entry) {
		const newEntry = new Entry(entry.content, true)
		newEntry.creationTime = new Date(entry.creationTime)
		newEntry.completionTime = new Date(entry.completionTime)
		newEntry.done = entry.done

		return newEntry
	}


	remove() {
		if (this.htmlEntry) {
			this.htmlEntry.remove()
			this.htmlEntry = undefined
		}
	}

	reinitialize() {
		if (this.htmlEntry) {
			const hidden = isHidden(this)
			this.remove()
			this.initialize(hidden)
		}
		else {
			this.initialize()
		}
	}

	complete() {
		this.done = true
		this.completionTime = new Date()
	}

	uncomplete() {
		this.done = false
	}

	initialize(hidden) {
		this.htmlEntry = initializeEntry(this, hidden)
	}

	changeView() {
		this.content = changeView(this)
	}

	showIf(value) {
		if (!value || value.length == 0) {
			show(this)
		}
		else if (this.content.includes(value)) {
			show(this)
		}
		else {
			hide(this)
		}
	}

	showRemoveButton() {
		showRemoveButton(this)
	}

	hideRemoveButton() {
		hideRemoveButton(this)
	}
}

class List {
	constructor(id, name, sortingStrategies, noInit) {
		this.id = id
		this.name = name
		this.entries = []
		this.sortStrategy = sortingStrategies[0].id
		this.sortingStrategies = sortingStrategies
		if (!noInit) {
			this.initialize()
		}
	}

	static toPlaneObject(list) {
		return {
			id: list.id,
			name: list.name,
			entries: list.entries.map(e => Entry.toPlaneObject(e)),
			sortStrategy: list.sortStrategy
		}
	}

	static fromPlaneObject(list, sortingStrategies) {
		const newList = new List(list.id, list.name, sortingStrategies, true)
		newList.entries = list.entries.map(e => Entry.fromPlaneObject(e))

		const strategyCorrect = sortingStrategies.find( strategy => strategy.id === list.sortingStrategy)
		if (strategyCorrect) {
			newList.sortingStrategy = list.sortingStrategy
		}
	}


	size() {
		return this.entries.length
	}

	initialize() {
		this.sort(this.sortStrategy)
		this.htmlEntry = initializeList(this, this.sortingStrategies)
		this.initializeEntries(this)
	}

	initializeEntries() {
		if (this.entries && this.entries.length > 0) {
			this.entries.forEach(e => e.reinitialize())
			initializeEntries(this)
		}
	}

	add(entry) {
		const insertedIndex = inserting[this.id][this.sortStrategy](this, entry)

		if (this.entries.length == 1) {
			addToList(entry, this)
		}
		else if (insertedIndex == 0) {
			addToListBefore(this.entries[insertedIndex], this.entries[insertedIndex + 1])
		}
		else {
			addToListAfter(this.entries[insertedIndex], this.entries[insertedIndex - 1])
		}

	}

	remove(entry) {
		this.entries = this.entries.filter(val => val !== entry)
		entry.remove()
	}

	search(value) {
		for (let entry of this.entries) {
			entry.showIf(value)
		}
	}

	sort(algorithm) {
		this.sortStrategy = algorithm
		sorting[this.id][algorithm](this)
		this.initializeEntries()
	}

	clear() {
		this.entries.forEach(e => e.remove())
		this.entries = []
	}
}


export class State {
	constructor(noInit) {
		this.openList = new List("openList", "Open", sorting.openList.strategies)
		this.doneList = new List("doneList", "Done", sorting.doneList.strategies)
		if (!noInit) {
			this.initialize()
		}
	}

	static toPlaneObject(state) {
		return {
			openList: List.toPlaneObject(state.openList),
			doneList: List.toPlaneObject(state.doneList)
		}
	}

	static fromPlaneObject(state) {
		const newState = new State(true)
		if (state) {
			newState.openList.entries = state.openList.entries.map(e => Entry.fromPlaneObject(e))
			newState.doneList.entries = state.doneList.entries.map(e => Entry.fromPlaneObject(e))
			return newState
		}
		else return new State()
	}

	initialize() {
		this.openList.initialize()
		this.doneList.initialize()
		this.htmlEntry = initializeState(this)
	}

	add(content) {
		if (content && content.length > 0) {
			const entry = new Entry(content)
			this.openList.add(entry)
		}
		storeState(this)
	}

	remove(entry) {
		if (entry.done) {
			this.doneList.remove(entry)
		}
		else {
			this.openList.remove(entry)
		}
		storeState(this)
	}

	changeList(entry) {
		let fromList
		let toList
		if (entry.done) {
			entry.uncomplete()
			fromList = this.doneList
			toList = this.openList
		}
		else {
			entry.complete()
			fromList = this.openList
			toList = this.doneList
		}

		fromList.remove(entry)
		entry.initialize()
		toList.add(entry)
		storeState(this)
	}

	search(value) {
		this.openList.search(value)
		this.doneList.search(value)
	}

	showRemoveButton(element) {
		element.showRemoveButton()
	}

	hideRemoveButton(element) {
		element.hideRemoveButton()
	}

	sort(list, sortingStrategy) {
		list.sort(sortingStrategy)
	}

	clearList(list) {
		list.clear()
		storeState(this)
	}
}