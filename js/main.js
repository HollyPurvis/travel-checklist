const ITEMS_CONTAINER = document.getElementById("checklist-items");
const ITEM_TEMPLATE = document.getElementById("itemTemplate");
const ADD_BUTTON = document.getElementById("add-item");

let travelItems = getTravelItems()

function getTravelItems() {
    const value = localStorage.getItem("travelChecklist") || "[]";

    return JSON.parse(value);
};

function setItems(travelItems) {
    const itemsJson = JSON.stringify(travelItems);

    localStorage.setItem("travelChecklist", itemsJson);
};

function addItem() {
    const id = new Date().getTime();

    travelItems.unshift({
        id: id,
        description: "",
        packed: false
    });

    setItems(travelItems);
    refreshList();
};

function removeItem(itemId) {
    let index = travelItems.findIndex(item => item.id === itemId);
    travelItems.splice(index, 1);
    
    console.log("remove Button Clicked");
    setItems(travelItems);
    refreshList();
};

function updateItem(item, key, value){
    item[key] = value;
    setItems(travelItems);
    refreshList();
};

function refreshList() {
    //sort items

    travelItems.sort((a, b) => {
        if(a.packed){
            return 1;
        } else if (b.packed){
            return -1;
        }

        return a.description < b.description ? -1 : 1;
    });

    ITEMS_CONTAINER.innerHTML = "";

    for (const item of travelItems){
        const itemEl = ITEM_TEMPLATE.content.cloneNode(true);
        const descriptionInput = itemEl.querySelector(".item-description");
        const packedInput = itemEl.querySelector(".item-packed");
        const deleteButton = itemEl.querySelector("#remove-item");

        descriptionInput.value = item.description;
        packedInput.checked = item.packed;

        descriptionInput.addEventListener("change", () => {
            
            updateItem(item, "description", descriptionInput.value);
            console.log(item.description);
        });

        packedInput.addEventListener("change", () => {
            updateItem(item, "packed", packedInput.checked);
        });

        deleteButton.addEventListener("click", () => {
            removeItem(item.id);
        });

        ITEMS_CONTAINER.append(itemEl);
    }

};

ADD_BUTTON.addEventListener("click", () => {
    addItem();
})


refreshList();
