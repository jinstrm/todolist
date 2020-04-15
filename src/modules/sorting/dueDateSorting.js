import {createSorting} from "./sorting"

function compareAsc(entry, otherEntry) {
	return entry.completionTime > otherEntry.completionTime
}

function compareDesc(entry, otherEntry) {
	return !compareAsc(entry, otherEntry)
}

export let dueDateSorting = createSorting(compareAsc, compareDesc)