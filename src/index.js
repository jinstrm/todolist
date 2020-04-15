import {main_css} from "./../theme/main.css"
import {toDoListContainer_css} from "./../theme/toDoListContainer.css"
import {list_css} from "./../theme/list.css"
import {listElem_css} from "./../theme/listElem.css"

import {loadState} from "./modules/storage"
import {searchInList} from "./modules/eventListeners"

let state = loadState()
state.initialize()

const header = document.querySelector(".toToListHeader")
const search = header.lastElementChild
search.addEventListener("input", searchInList)
