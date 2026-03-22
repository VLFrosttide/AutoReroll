  
  /**
   * 
   * @returns {Array}   two separate arrays of positive and negative modifiers.
   *  If there are no modifiers found, the corresponding array will be empty.
   */
  
  export function GetCurrentMods() {
    let CurrentPMods = Array.from(document.getElementsByClassName("ModName"));
    if(CurrentPMods.length > 0){  
    for (let i = 0; i < CurrentPMods.length; i++) {
      CurrentPMods[i] = CurrentPMods[i].textContent;
    }}
    let CurrentNMods = Array.from(document.getElementsByClassName("ExclusionMod"))
    if(CurrentNMods.length> 0){
    for (let i = 0; i < CurrentNMods.length; i++) {
        CurrentNMods[i] = CurrentNMods[i].textContent;
    }}
    let CurrentMods = {CurrentPMods, CurrentNMods};
    return CurrentMods}