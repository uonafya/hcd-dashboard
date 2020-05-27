const ouLevels = [
  { id: 1, name: 'National level' },
  { id: 2, name: 'County level' },
  { id: 3, name: 'Subcounty level' },
  { id: 4, name: 'Ward level' },
  { id: 5, name: 'Facility level' },
  { id: 6, name: 'Community unit level' }
];

const filterUrlConstructor = (pe, ou, lvl, baseUrl) => {
  /* construct URL upon filter. Passing in selected PE & OU. Pick defaults if none passed */
  /* defaults always = '~' */
  let period = pe != null && pe != '' ? pe : '~';
  let lev = lvl != null && lvl != '' ? lvl : '~';
  let ounit = ou != null && ou != '' ? ou : '~';

  let url = `${baseUrl}/${ounit}/${lev}/${period}`;
  // console.log(`filterUrlConstructor PE=${pe} OU=${ou} LVL=${lvl}`)
  return url;
};

const getValidOUs = async () => {
  let url = 'http://41.89.94.99:3000/api/common/mcf-facilities';
  if (localStorage.getItem('validOUs')) {
    // console.log('returning validOUs from localStorage')
    return localStorage.getItem('validOUs');
  }
  return fetch(url)
    .then(rsp => rsp.json())
    .then(reply => {
      let vous = [];
      let validOUs = reply.fetchedData.dataSets[0].organisationUnits;
      validOUs.map(ovou => {
        vous.push(ovou.id);
      });
      if (validOUs.length > 1 && !localStorage.getItem('validOUs')) {
        // localStorage.setItem('validOUs', JSON.stringify(validOUs));
        localStorage.setItem('validOUs', JSON.stringify(vous));
      }
      // return validOUs
      return vous;
    });
};

const findPeriodRange = drange => {
  let date_range_string = '';
  let startDate =
    drange[0].substring(0, 4) + '-' + drange[0].substring(4) + '-01';
  let endDate =
    drange[drange.length - 1].substring(0, 4) +
    '-' +
    drange[drange.length - 1].substring(4) +
    '-01';
  let full_dates_arr = dateRange(startDate, endDate);
  full_dates_arr.map(onedate => {
    let adate = onedate.split('-');
    date_range_string += adate[0] + adate[1] + ';';
  });
  return date_range_string;
};

const dateRange = (startDate, endDate) => {
  let start = startDate.split('-');
  let end = endDate.split('-');
  let startYear = parseInt(start[0]);
  let endYear = parseInt(end[0]);
  let dates = [];

  for (let i = startYear; i <= endYear; i++) {
    let endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
    let startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
    for (let j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
      let month = j + 1;
      let displayMonth = month < 10 ? '0' + month : month;
      dates.push([i, displayMonth, '01'].join('-'));
    }
  }
  return dates;
};

const humanizePe = pe => {
    let ledate = '' + pe;
    let yer = ledate.substr(0, 4);
    let lemonth = ledate.substr(4, 5);
    let mont = '';
    if (lemonth == '01') {
      mont = 'Jan';
    }
    if (lemonth == '02') {
      mont = 'Feb';
    }
    if (lemonth == '03') {
      mont = 'Mar';
    }
    if (lemonth == '04') {
      mont = 'Apr';
    }
    if (lemonth == '05') {
      mont = 'May';
    }
    if (lemonth == '06') {
      mont = 'Jun';
    }
    if (lemonth == '07') {
      mont = 'Jul';
    }
    if (lemonth == '08') {
      mont = 'Aug';
    }
    if (lemonth == '09') {
      mont = 'Sept';
    }
    if (lemonth == '10') {
      mont = 'Oct';
    }
    if (lemonth == '11') {
      mont = 'Nov';
    }
    if (lemonth == '12') {
      mont = 'Dec';
    }
    let lenudate = mont + ' ' + yer;
    return lenudate;
  };

export { ouLevels, filterUrlConstructor, getValidOUs, findPeriodRange, humanizePe };
