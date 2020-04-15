import {createSorting} from "./sorting"

function compareAsc(entry, otherEntry) {
	return entry.creationTime > otherEntry.creationTime
}

function compareDesc(entry, otherEntry) {
	return !compareAsc(entry, otherEntry)
}

export let creationTimeSorting = createSorting(compareAsc, compareDesc)