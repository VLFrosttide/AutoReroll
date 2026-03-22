import { GetCurrentItem } from "./HelperFn.js";
window.api.ExportItemsListener((event, data) => {
  let MyItem = GetCurrentItem();
  if (MyItem !== null) {
    MyItem.push(data);
    window.api.ReturnExportData(MyItem);
  } else {
    DisplayInsertionMsg("No mods to export", "red");
  }
});
