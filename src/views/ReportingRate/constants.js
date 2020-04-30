const formatPeriods=(periods)=>{

    let holdedMonths=[...periods];
    let formatedMonths=[];

    holdedMonths.map((month)=>{
        let year;
        let monthName;
        let monthVal;
        let formatedMonth;

        year=month.slice(0,4);
        monthVal = month.slice(4,6);

        switch(monthVal){
            case '01':
                monthName ="Jan";
                break;
            case '02':
                monthName ="Feb";
                break;
            case '03':
                monthName ="Mar";
                break;
            case '04':
                monthName ="Apr";
                break;
            case '05':
                monthName ="May";
                break;
            case '06':
                monthName ="June";
                break;
            case '07':
                monthName ="July";
                break;
            case '08':
                monthName ="Aug";
                break;
            case '09':
                monthName ="Sep";
                break;
            case '10':
                monthName ="Oct";
                break;
            case '11':
                monthName ="Nov";
                break;
            case '12':
                monthName ="Dec";
                break;
            default:
                break;
        }

        formatedMonth = `${monthName} ${year}`;
        formatedMonths =[
            ...formatedMonths, formatedMonth
        ];
    


    });

    return formatedMonths;


}

export const sortMetaData=(rawData)=>{
    let data=rawData.slice().sort((a,b)=>{
      return a[1] > b[1]
    })


    return data
  }

export default formatPeriods;