const ouLevels = [ {id: 1, name: "National level"}, {id: 2, name: "County level"}, {id: 3, name: "Subcounty level"}, {id: 4, name: "Ward level"}, {id: 5, name: "Facility level"}, {id: 6, name: "Community unit level"}, ]

const filterUrlConstructor = (pe, ou, lvl, baseUrl) => { 
  /* construct URL upon filter. Passing in selected PE & OU. Pick defaults if none passed */
  /* defaults always = '~' */
  let period = pe!=null&&pe!=""?pe:"~"
  let lev = lvl!=null&&lvl!=""?lvl:"~"
  let ounit = ou!=null&&ou!=""?ou:"~"
  
  let url = `${baseUrl}/${ounit}/${lev}/${period}`
  // console.log(`filterUrlConstructor PE=${pe} OU=${ou} LVL=${lvl}`)
  return url
}

export {
  ouLevels, filterUrlConstructor
};
