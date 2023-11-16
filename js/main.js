const ITEMS_CONTAINER = document.getElementById("checklist-items");
const ITEM_TEMPLATE = document.getElementById("itemTemplate");
const ADD_BUTTON = document.getElementById("add-item");

let travelItems = getTravelItems()

function getTravelItems() {
    const value = localStorage.getItem("travelChecklist") || "[]";

    return JSON.parse(value);
}

function setItems(travelItems) {
    const itemsJson = JSON.stringify(travelItems);

    localStorage.setItem("travelChecklist", itemsJson);
}

function addItem() {
    travelItems.unshift({
        description: "",
        packed: false
    });

    setItems(travelItems);
    refreshList();
}

function updateItem(item, key, value){
    item[key] = value;
    setItems(travelItems);
    refreshList();
}

function refreshList() {
    //sort items
    ITEMS_CONTAINER.innerHTML = "";

    for (const item of travelItems){
        const itemEl = ITEM_TEMPLATE.content.cloneNode(true);
        const descriptionInput = itemEl.querySelector(".item-description");
        const packedInput = itemEl.querySelector(".item-packed");

        descriptionInput.value = item.description;
        packedInput.checked = item.packed;

        descriptionInput.addEventListener("change", () => {
            updateItem(item, "description", descriptionInput.value);
        });

        packedInput.addEventListener("change", () => {
            updateItem(item, "packed", packedInput.checked);
        });

        ITEMS_CONTAINER.append(itemEl);
    }

};

ADD_BUTTON.addEventListener("click", () => {
    addItem();
})

refreshList();