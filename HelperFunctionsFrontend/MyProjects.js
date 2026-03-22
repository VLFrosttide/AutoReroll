import {
   CreateElementFn,
   RemoveElementByClass, DisplayInsertionMsg} from "./HelperFn.js";
import { GetSavedItem } from "./LocalStorageFn.js";
import { DisplayItemMods } from "./DisplayItemMods.js";
import { DeleteSavedItem } from "./HelperFn.js";
import { DeleteLSSaveItem } from "./LocalStorageFn.js";
import { GetCurrentMods } from "./GetCurrentMods.js";
let MyProjects = document.getElementById("MyProjects");
let HoverTooltip = document.getElementsByClassName("HoverTooltip");
let CurrentMods


MyProjects.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("Saved")) {
    e.target.classList.add("Delete");
  }
  if (e.target.classList.contains("Image")) {
    CurrentMods = GetCurrentMods();
    e.target.style.width = "50px";
    e.target.style.height = "50px";
    RemoveElementByClass("HoverTooltip");
    RemoveElementByClass("ModName");
    RemoveElementByClass("ExclusionMod");
    CreateElementFn("div", "", ["HoverTooltip"], `${e.target.id}`, Insertion);
    let Name = e.target.id; // Example:  ShaperWand
    GetSavedItem("Save", Name)
      .then((result) => {
        DisplayItemMods(result);
      })
      .catch((error) => {
        DisplayInsertionMsg(`Error loading item: ${error}`, "red");

        console.error(error);
      });
  }
  
  
});
MyProjects.addEventListener("mouseout", (e) => {
  if (e.target.classList.contains("Delete")) {
    e.target.classList.remove("Delete");
  }
  if (e.target.classList.contains("Image")) {

    e.target.style.width = "40px";
    e.target.style.height = "40px";
    RemoveElementByClass("HoverTooltip");
    RemoveElementByClass("ModName");
    RemoveElementByClass("ExclusionMod");
    if(CurrentMods.CurrentPMods.length > 0 || CurrentMods.CurrentNMods.length > 0){
      let result = [CurrentMods.CurrentPMods, CurrentMods.CurrentNMods]
      DisplayItemMods(result)
    }



    for (let i = HoverTooltip.length - 1; i >= 0; i--) {
      HoverTooltip[i].remove();
    }
  }
});


MyProjects.addEventListener("click", (e) => {
  if (e.target.classList.contains("Image")) {
  CurrentMods = GetCurrentMods();}
})

//#region Delete Saved Items

document.addEventListener("keydown", (e) => {
  if (e.key === "Delete") {
    let SelectedItem = document.getElementsByClassName("Delete")[0];
    if (SelectedItem) {
      DeleteSavedItem(SelectedItem, DeleteLSSaveItem);
      DisplayInsertionMsg("Saved item deleted!", "green");
    }
  }
});

//#endregion