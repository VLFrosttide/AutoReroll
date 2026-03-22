import { CreateElementFn, RemoveElementByClass } from "./HelperFn.js";
 export function DisplayItemMods(result)  {
  let Pmods
  let Nmods
  try{

     Pmods = JSON.parse(result[0]);
     Nmods = JSON.parse(result[1]);
  }catch(error){
    Pmods = result[0];
    Nmods = result[1];
  } 
    RemoveElementByClass("ModName");
    RemoveElementByClass("ExclusionMod");

            if(Pmods.length > 0){
            for (let i = 0; i < Pmods.length; i++) {
              CreateElementFn(
                "label",
                "",
                ["ModName", "Mod"],
                Pmods[i],
                Container,
                "rgb(112, 255, 112)"
              );
            }}
            if (Nmods.length > 0) {
            for (let i = 0; i < Nmods.length; i++) {
              CreateElementFn(
                "label",
                "",
                ["ExclusionMod", "Mod"],
                Nmods[i],
                ExclusionContainer,
                "rgb(255, 62, 28)"
              );
            }}
    
    
}
