function sort(list, copmpare) {
	list.entries.sort(copmpare)
}

function insertSorting(list, entry, compare) {
	list.entries.push(entry)
	sort(list, compare)
	return list.entries.findIndex(element => {
		return element === entry
	})
}


export function createSorting(compareAsc, compareDesc) {
	return {
		sortAsc: function(list) {
			sort(list, compareAsc)
		},
		sortDesc: function(list) {
			sort(list, compareDesc)
		},
		insertSortingAsc: function(list, entry) {
			return insertSorting(list, entry, compareAsc)
		},
		insertSortingDesc: function(list, entry) {
			return insertSorting(list, entry, compareDesc)
		}
	}
}
