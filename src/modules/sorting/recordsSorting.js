import {createSorting} from "./sorting"

function compareAsc(entry, otherEntry) {
	return entry.content.localeCompare(otherEntry.content)
}

function compareDesc(entry, otherEntry) {
	return !compareAsc(entry, otherEntry)
}

export let recordSorting = createSorting(compareAsc, compareDesc)