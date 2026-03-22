import { app, ipcMain } from "electron";
import { win } from "../main.js";
import path from "path";
import { WriteToFile } from "./LogFiles.js";
import { StartCraft } from "./SpawnPython.js";

let DocPath;
let ExePath;
let LogFilePath;
let LiftKeysPath;
let RerollPath;
let HarvestRerollPath;
let RerollFolder;
let LocalDev = process.env.NODE_ENV;
let Counter;
console.log("LocalDev: ", LocalDev);
if (LocalDev === "Dev") {
  DocPath = "C:\\Users\\shacx";
  RerollFolder = "C:\\Users\\shacx\\Documents\\RerollLogs";
  LogFilePath = "C:\\Users\\shacx\\Documents\\RerollLogs\\Logs.txt";
  LiftKeysPath =
    "C:\\Users\\shacx\\Documents\\GitHub\\AutoReroll\\python\\LiftKeys.py";
  RerollPath =
    "C:\\Users\\shacx\\Documents\\GitHub\\AutoReroll\\python\\Reroll.py";
  HarvestRerollPath =
    "C:\\Users\\shacx\\Documents\\GitHub\\AutoReroll\\python\\HarvestReroll.py";
} else {
  DocPath = app.getPath("documents");
  ExePath = app.getPath("exe");
  ExePath = ExePath.substring(0, ExePath.lastIndexOf("\\"));
  RerollFolder = path.join(DocPath, "RerollLogs");
  LogFilePath = path.join(RerollFolder, "/Logs.txt");
  LiftKeysPath = path.join(ExePath, "/python/LiftKeys.py");
  RerollPath = path.join(ExePath, "/python/Reroll.py");
  HarvestRerollPath = path.join(ExePath, "/python/HarvestReroll.py");
}

ipcMain.on("StartCrafting", (event, args) => {
  win.webContents.send("Counter", "reset");
  Counter = 0;
  WriteToFile(LogFilePath, "");
  WriteToFile(LogFilePath, "{~~~~~~~~~~~~New Crafting Project~~~~~~~~~~~~");

 let ModName = args[0];
 let CraftMaterial = args[4];
 let ExclusionMods = args[6];

  WriteToFile(LogFilePath, `ModName: ${ModName}`);
  WriteToFile(LogFilePath, `CraftMaterial: ${CraftMaterial}`);
  if (ExclusionMods.length > 0) {
    WriteToFile(LogFilePath, `ExclusionMods: ${ExclusionMods}`);
  }
  console.log("CraftMaterial: ", CraftMaterial);
  if (CraftMaterial === "Harvest") {
    StartCraft(HarvestRerollPath, args);
  } else {
    StartCraft(RerollPath, args);
    
  }
});
