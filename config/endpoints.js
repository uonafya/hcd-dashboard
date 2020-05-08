let DHIS_BASE_API_URL = process.env.DHIS_BASE_API_URL
let endpoints = [
  {
    "page": "Global",
    "level": "All",
    "name": "Counties list",
    "id": "all__counties_list",
    "url": `${DHIS_BASE_API_URL}/organisationUnits.json?filter=level:eq:2&fields=id,name,level&paging=false`,
    "Filters": "",
    "Notes": ""
  },
  {
    "page": "Global",
    "level": "All",
    "name": "Subcounties list",
    "id": "all__subcounties_list",
    "url": `${DHIS_BASE_API_URL}/organisationUnits.json?filter=level:eq:3&fields=id,name,level,parent&paging=false`,
    "Filters": "",
    "Notes": ""
  },
  {
    "page": "Global",
    "level": "All",
    "name": "Wards list",
    "id": "all__wards_list",
    "url": `${DHIS_BASE_API_URL}/organisationUnits.json?filter=level:eq:4&fields=id,name,level,parent&paging=false`,
    "Filters": "",
    "Notes": ""
  },
  {
    "page": "Global",
    "level": "All",
    "name": "Facilities list",
    "id": "all__facilities_list",
    "url": `${DHIS_BASE_API_URL}/organisationUnits.json?filter=level:eq:5&fields=id,name,level,parent&paging=false`,
    "Filters": "",
    "Notes": ""
  },
  {
    "page": "Global",
    "level": "All",
    "name": "CUs list",
    "id": "all__cus_list",
    "url": `${DHIS_BASE_API_URL}/organisationUnits.json?filter=level:eq:6&fields=id,name,level,parent&paging=false`,
    "Filters": "",
    "Notes": ""
  },
  {
    "page": "Global",
    "level": "All",
    "name": "MFL codes",
    "id": "all__mfl_codes",
    "url": `${DHIS_BASE_API_URL}/organisationUnits.json?fields=id,code&paging=false`,
    "Filters": "",
    "Notes": ""
  },
  {
    "page": "Global",
    "level": "All",
    "name": "User details",
    "id": "all__user_details",
    "url": `${DHIS_BASE_API_URL}/me.json`,
    "Filters": "",
    "Notes": ""
  },
  {
    "page": "Global",
    "level": "All",
    "name": "Malaria Commodities",
    "id": "all__commodities",
    "url": `${DHIS_BASE_API_URL}/dataSets/JPaviRmSsJW.json?fields=dataSetElements[dataElement[id,name]]`,
    "Filters": "",
    "Notes": ""
  },
  {
    "page": "Global",
    "level": "All",
    "name": "Facilities assigned MCF",
    "id": "all__mcf_orgunits",
    "url": `${DHIS_BASE_API_URL}/dataSets.json?fields=id,name,organisationUnits[id,name,code,level]&filter=id:ilike:JPaviRmSsJW&paging=false`,
    "Filters": "",
    "Notes": ""
  },
  {
    "page": "Global",
    "level": "All",
    "name": "Expected Reports",
    "id": "all__expected_reports",
    "url": `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:JPaviRmSsJW.EXPECTED_REPORTS`,
    "default_period": "LAST_MONTH",
    "default_org_unit": "HfVjCurKxh2",
    "Filters": "",
    "Notes": ""
  },
  {
    "page": "Dashboard",
    "level": "All",
    "name": "Stock Status",
    "id": "all__stock_status",
    "url": `${DHIS_BASE_API_URL}/26/analytics.json?dimension=dx:HfGVoCZAwtd;nK8sqMAeQHY;ZcngDQJKiEg;wOKbEd8Dbi3;lHPLS1G5CUc;SSARcWY2Ge1;AX1co0SXobM;UUNwkYQhYgX;BnGDrFwyQp9.rPAsF4cpNxm;c0MB4RmVjxk.rPAsF4cpNxm;qnZmg5tNSMy.rPAsF4cpNxm;gVp1KSFI69G.rPAsF4cpNxm;Mmy9MoUdbhZ;iOARK31NdLp.rPAsF4cpNxm;imheYfA1Kiw.rPAsF4cpNxm;cPlWFYbBacW.rPAsF4cpNxm;jfUzb86mBSP.miM6uIJ2cWx;HwvUHnslwbh.miM6uIJ2cWx;OLYLVMDHEj8.miM6uIJ2cWx;UJeKVZzAnfS.miM6uIJ2cWx;fiVSJyM5cDs;naztfZrbMtd.miM6uIJ2cWx;EtG9ozt2joA.miM6uIJ2cWx;Umi8ZsiqBHw.miM6uIJ2cWx`,
    "default_period": "LAST_MONTH",
    "default_org_unit": "HfVjCurKxh2",
    "default_org_unit_level": "",
    "Filters": "",
    "Notes": ""
  },
  {
    "page": "Dashboard",
    "level": "All",
    "name": "MOS by commodity",
    "id": "all__mos_by_commodity",
    "url": `${DHIS_BASE_API_URL}/26/analytics.json?dimension=dx:HfGVoCZAwtd;nK8sqMAeQHY;ZcngDQJKiEg;wOKbEd8Dbi3;lHPLS1G5CUc;SSARcWY2Ge1;AX1co0SXobM;UUNwkYQhYgX`,
    "default_period": "LAST_MONTH",
    "default_org_unit": "HfVjCurKxh2",
    "default_org_unit_level": "",
    "Notes": ""
  },
  {
    "page": "Dashboard",
    "level": "All",
    "name": "Facilities stock status (count)",
    "id": "all__facilities_stock_status",
    "url": `${DHIS_BASE_API_URL}/26/analytics.json?dimension=dx:HfGVoCZAwtd;nK8sqMAeQHY;ZcngDQJKiEg;wOKbEd8Dbi3;SSARcWY2Ge1;AX1co0SXobM;UUNwkYQhYgX
    `,
    "default_period": "LAST_MONTH",
    "default_org_unit": "HfVjCurKxh2",
    "default_org_unit_level": 5,
    "Filters": "",
    "Notes": ""
  },

  {
    "page": "Stock status",
    "level": "County",
    "name": "Artemether Lumefantrine (AL)",
    "id": "county__artemether_lumefantrine",
    "url": `${DHIS_BASE_API_URL}/26/analytics.json?dimension=dx:JPaviRmSsJW.REPORTING_RATE;JPaviRmSsJW.REPORTING_RATE_ON_TIME;BnGDrFwyQp9.rPAsF4cpNxm;HfGVoCZAwtd;c0MB4RmVjxk.rPAsF4cpNxm;nK8sqMAeQHY;qnZmg5tNSMy.rPAsF4cpNxm;ZcngDQJKiEg;gVp1KSFI69G.rPAsF4cpNxm;wOKbEd8Dbi3;lHPLS1G5CUc`,
    "local_url": `http://41.89.94.99:3000/api/county/stockstatus/al`,
    "default_period": "LAST_MONTH",
    "default_org_unit": "HfVjCurKxh2",
    "default_org_unit_level": 5,
    "Notes": ""
  },
  {
    "page": "Stock status",
    "level": "County",
    "name": "Artesunate Injection (AS)",
    "id": "county__artesunate_injection",
    "url": `${DHIS_BASE_API_URL}/26/analytics.json?dimension=dx:JPaviRmSsJW.REPORTING_RATE;naztfZrbMtd.miM6uIJ2cWx;nvJsVaN8FOB.NhSoXUMPK2K;U2KpOVZOegw;iOARK31NdLp.rPAsF4cpNxm;SSARcWY2Ge1`,
    "local_url": `http://41.89.94.99:3000/api/county/stockstatus/as`,
    "default_period": "LAST_MONTH",
    "default_org_unit": "HfVjCurKxh2",
    "default_org_unit_level": 5,
    "Notes": ""
  },
  {
    "page": "Stock status",
    "level": "County",
    "name": "Sulphadoxine Pyrimethamine (SP)",
    "id": "county__sulphadoxine_pyrimethamine",
    "url": `${DHIS_BASE_API_URL}/26/analytics.json?dimension=dx:JPaviRmSsJW.REPORTING_RATE;EtG9ozt2joA.miM6uIJ2cWx;TNWcde51FIt;imheYfA1Kiw.rPAsF4cpNxm;AX1co0SXobM`,
    "local_url": `http://41.89.94.99:3000/api/county/stockstatus/sp`,
    "default_period": "LAST_MONTH",
    "default_org_unit": "HfVjCurKxh2",
    "default_org_unit_level": 5,
    "Notes": ""
  },
  {
    "page": "Stock status",
    "level": "County",
    "name": "Rapid Diagnostic Tests (RDT)",
    "id": "county__rapid_diagnostic_tests",
    "url": `${DHIS_BASE_API_URL}/26/analytics.json?dimension=dx:JPaviRmSsJW.REPORTING_RATE;Umi8ZsiqBHw.miM6uIJ2cWx;AecI5IRlRSR;cPlWFYbBacW.rPAsF4cpNxm;UUNwkYQhYgX`,
    "local_url": `http://41.89.94.99:3000/api/county/stockstatus/rdt`,
    "default_period": "LAST_MONTH",
    "default_org_unit": "HfVjCurKxh2",
    "default_org_unit_level": 5,
    "Notes": ""
  },
  {
    "page": "Stock status",
    "level": "County",
    "name": "All commodities",
    "id": "county__all_commodities",
    "url": `${DHIS_BASE_API_URL}/26/analytics.json?dimension=dx:jfUzb86mBSP.miM6uIJ2cWx;HwvUHnslwbh.miM6uIJ2cWx;OLYLVMDHEj8.miM6uIJ2cWx;UJeKVZzAnfS.miM6uIJ2cWx;naztfZrbMtd.miM6uIJ2cWx;EtG9ozt2joA.miM6uIJ2cWx;Umi8ZsiqBHw.miM6uIJ2cWx;BnGDrFwyQp9.rPAsF4cpNxm;c0MB4RmVjxk.rPAsF4cpNxm;qnZmg5tNSMy.rPAsF4cpNxm;gVp1KSFI69G.rPAsF4cpNxm;iOARK31NdLp.rPAsF4cpNxm;imheYfA1Kiw.rPAsF4cpNxm;cPlWFYbBacW.rPAsF4cpNxm`,
    "local_url": `http://41.89.94.99:3000/api/county/stockstatus/all`,
    "default_period": "LAST_MONTH",
    "default_org_unit": "hfVjCurKxh2",
    "default_org_unit_level": 1,
    "Notes": ""
  },
  {
    "page": "Reporting Rate",
    "level": "County",
    "name": "Reporting Rate Trend",
    "id": "county__reporting_rate_trend",
    "url": `${DHIS_BASE_API_URL}/26/analytics.json?dimension=dx:JPaviRmSsJW.REPORTING_RATE;JPaviRmSsJW.REPORTING_RATE_ON_TIME`,
    "default_period": "LAST_12_MONTHS",
    "default_org_unit": "HfVjCurKxh2",
    "default_org_unit_level": 5,
    "Notes": ""
  },
{
  "page" : "Reporting Rate",
  "level" :  "County",
  "name" : "Reporting Rate Trend (latest subcounty)",
  "id" : "county__latest_reporting_rate_subcounty",
  "url" : `${DHIS_BASE_API_URL}/26/analytics.json?dimension=dx:JPaviRmSsJW.REPORTING_RATE`,
  "default_period" : "LAST_MONTH",
  "default_org_unit" : "HfVjCurKxh2",
  "default_org_unit_level" : 3,
  "Notes" : ""
  
},
  
  {
    "page": "Reporting Rate",
    "level": "County",
    "name": "Facility Reporting Rate",
    "id": "county__facility_reporting_rate",
    "url": `${DHIS_BASE_API_URL}/26/analytics.json?dimension=dx:JPaviRmSsJW.ACTUAL_REPORTS;JPaviRmSsJW.EXPECTED_REPORTS`,
    "default_period": "LAST_6_MONTHS",
    "default_org_unit": "vvOK1BxTbet",
    "default_org_unit_level": 5,
    "Notes": ""
  },
  {
    "page": "Reporting Rate",
    "level": "County",
    "name": "Subcounty Reporting Rate",
    "id": "county__subcounty_reporting_rate",
    "url": `${DHIS_BASE_API_URL}/26/analytics.json?dimension=dx:JPaviRmSsJW.ACTUAL_REPORTS;JPaviRmSsJW.EXPECTED_REPORTS`,
    "default_period": "LAST_6_MONTHS",
    "default_org_unit": "vvOK1BxTbet",
    "default_org_unit_level": 4,
    "Notes": ""
  },
  {
    "page": "Data Quality",
    "level": "County",
    "name": "Completeness",
    "id": "county__dq_completeness",
    "url": `${DHIS_BASE_API_URL}/26/analytics.json?dimension=dx:zB1NW37bi46;JPaviRmSsJW.EXPECTED_REPORTS`,
    "default_period": "LAST_12_MONTHS",
    "default_org_unit": "HfVjCurKxh2",
    "default_org_unit_level": 5,
    "Notes": "Has commodity filter"
  },
  {
    "page": "Data Quality",
    "level": "County",
    "name": "Concordance",
    "id": "county__dq_concordance",
    "url": `${DHIS_BASE_API_URL}/26/analytics.json?dimension=dx:iOARK31NdLp.HWtHCLAwprR;iOARK31NdLp.rPAsF4cpNxm`,
    "default_period": "201911;201912",
    "default_org_unit": "HfVjCurKxh2",
    "default_org_unit_level": 5,
    "Notes": ""
  },
  {
    "page": "Data Quality",
    "level": "County",
    "name": "Consistency",
    "id": "county__dq_consistency",
    "url": `${DHIS_BASE_API_URL}/26/analytics.json?dimension=dx:iOARK31NdLp.HWtHCLAwprR;iOARK31NdLp.yuvCdaFqdCW;iOARK31NdLp.CckV73xy6HB;iOARK31NdLp.unVIt2C0cdW;iOARK31NdLp.w77uMi1KzOH;iOARK31NdLp.rPAsF4cpNxm`,
    "default_period": "LAST_MONTH",
    "default_org_unit": "HfVjCurKxh2",
    "default_org_unit_level": 5,
    "Notes": ""
  },
  {
    "page": "Data Quality",
    "level": "County",
    "name": "Comparison",
    "id": "county__dq_comparison",
    "url": `${DHIS_BASE_API_URL}/26/analytics.json?dimension=dx:E1J6vMP5hFO;Gwr4lywXLiM`,
    "default_period": "LAST_MONTH",
    "default_org_unit": "HfVjCurKxh2",
    "default_org_unit_level": 5,
    "Notes": ""
  },
  {
    "page": "Supply Chain Performance",
    "level": "County",
    "name": "Indicator Summary",
    "id": "county__indicator_summary",
    "url": `${DHIS_BASE_API_URL}/26/analytics.json?dimension=dx:JPaviRmSsJW.REPORTING_RATE;JPaviRmSsJW.REPORTING_RATE_ON_TIME;zLR3PBVPgN5;bJILAolJsSJ;jtGNoWcdNcx;p2aNqT2HVyr`,
    "default_period": "LAST_MONTH",
    "default_org_unit": "HfVjCurKxh2",
    "default_org_unit_level": 5,
    "Notes": ""
  },
  {
    "page": "Supply Chain Performance",
    "level": "County",
    "name": "Indicator Trends",
    "id": "county__indicator_trends",
    "url": `${DHIS_BASE_API_URL}/26/analytics.json?dimension=dx:HfGVoCZAwtd`,
    "default_period": "LAST_6_MONTHS",
    "default_org_unit": "HfVjCurKxh2",
    "default_org_unit_level": 5,
    "Notes": ""
  },
  {
    "page": "Accountability",
    "level": "County",
    "name": "Accountability",
    "id": "county__accountability",
    "url": `${DHIS_BASE_API_URL}/26/analytics.json?dimension=dx:BnGDrFwyQp9.HWtHCLAwprR;c0MB4RmVjxk.HWtHCLAwprR;qnZmg5tNSMy.HWtHCLAwprR;gVp1KSFI69G.HWtHCLAwprR;iOARK31NdLp.HWtHCLAwprR;imheYfA1Kiw.HWtHCLAwprR;cPlWFYbBacW.HWtHCLAwprR;BnGDrFwyQp9.CckV73xy6HB;gVp1KSFI69G.CckV73xy6HB;qnZmg5tNSMy.CckV73xy6HB;c0MB4RmVjxk.CckV73xy6HB;iOARK31NdLp.CckV73xy6HB;imheYfA1Kiw.CckV73xy6HB;cPlWFYbBacW.CckV73xy6HB;BnGDrFwyQp9.yuvCdaFqdCW;c0MB4RmVjxk.yuvCdaFqdCW;qnZmg5tNSMy.yuvCdaFqdCW;gVp1KSFI69G.yuvCdaFqdCW;iOARK31NdLp.yuvCdaFqdCW;imheYfA1Kiw.yuvCdaFqdCW;cPlWFYbBacW.yuvCdaFqdCW;BnGDrFwyQp9.w77uMi1KzOH;c0MB4RmVjxk.w77uMi1KzOH;qnZmg5tNSMy.w77uMi1KzOH;gVp1KSFI69G.w77uMi1KzOH;iOARK31NdLp.w77uMi1KzOH;imheYfA1Kiw.w77uMi1KzOH;cPlWFYbBacW.w77uMi1KzOH;BnGDrFwyQp9.unVIt2C0cdW;c0MB4RmVjxk.unVIt2C0cdW;qnZmg5tNSMy.unVIt2C0cdW;gVp1KSFI69G.unVIt2C0cdW;iOARK31NdLp.unVIt2C0cdW;imheYfA1Kiw.unVIt2C0cdW;cPlWFYbBacW.unVIt2C0cdW;BnGDrFwyQp9.rPAsF4cpNxm;c0MB4RmVjxk.rPAsF4cpNxm;qnZmg5tNSMy.rPAsF4cpNxm;gVp1KSFI69G.rPAsF4cpNxm;iOARK31NdLp.rPAsF4cpNxm;imheYfA1Kiw.rPAsF4cpNxm;cPlWFYbBacW.rPAsF4cpNxm`,
    "default_period": "LAST_MONTH",
    "default_org_unit": "HfVjCurKxh2",
    "default_org_unit_level": 1,
    "Notes": ""
  },
  {
    "page": "Issues vs Receipts",
    "level": "County",
    "name": "Issues vs Receipts",
    "id": "county__issues_vs_receipts",
    "url": `${DHIS_BASE_API_URL}/26/analytics.json?dimension=dx:jfUzb86mBSP.DTnItSklSr8;HwvUHnslwbh.DTnItSklSr8;OLYLVMDHEj8.DTnItSklSr8;UJeKVZzAnfS.DTnItSklSr8;naztfZrbMtd.DTnItSklSr8;EtG9ozt2joA.DTnItSklSr8;Umi8ZsiqBHw.DTnItSklSr8;BnGDrFwyQp9.yuvCdaFqdCW;c0MB4RmVjxk.yuvCdaFqdCW;qnZmg5tNSMy.yuvCdaFqdCW;gVp1KSFI69G.yuvCdaFqdCW;iOARK31NdLp.yuvCdaFqdCW;imheYfA1Kiw.yuvCdaFqdCW;eFqDcjgvt39.EJ8nUfcupBq`,
    "default_period": "201912;202001",
    "default_org_unit": "HfVjCurKxh2",
    "default_org_unit_level": 1,
    "Notes": ""
  },
  {
    "page": "Health Facility Followup",
    "level": "County",
    "name": "Understocked Facilities",
    "id": "county__understocked_facilities",
    "url": `${DHIS_BASE_API_URL}/26/analytics.json?dimension=dx:SSARcWY2Ge1;iOARK31NdLp.rPAsF4cpNxm;naztfZrbMtd.miM6uIJ2cWx`,
    "default_period": "LAST_MONTH",
    "default_org_unit": "HfVjCurKxh2",
    "default_org_unit_level": 5,
    "Notes": ""
  },
  {
    "page": "Health Facility Followup",
    "level": "County",
    "name": "Overstocked Facilities",
    "id": "county__overstocked_facilities",
    "url": `${DHIS_BASE_API_URL}/26/analytics.json?dimension=dx:SSARcWY2Ge1;iOARK31NdLp.rPAsF4cpNxm;naztfZrbMtd.miM6uIJ2cWx`,
    "default_period": "LAST_MONTH",
    "default_org_unit": "HfVjCurKxh2",
    "default_org_unit_level": 5,
    "Notes": ""
  },
  {
    "page": "National Summary",
    "level": "National",
    "name": "National Summary",
    "id": "national__summary_facility_mos",
    "url": `${DHIS_BASE_API_URL}/26/analytics.json?dimension=dx:HfGVoCZAwtd;nK8sqMAeQHY;ZcngDQJKiEg;wOKbEd8Dbi3;SSARcWY2Ge1;AX1co0SXobM;UUNwkYQhYgX`,
    "default_period": "LAST_MONTH",
    "default_org_unit": "HfVjCurKxh2",
    "default_org_unit_level": "",
    "Notes": ""
  },
  {
    "page": "National Summary",
    "level": "National",
    "name": "National Summary",
    "id": "national__summary_pending_mos",
    "url": `${DHIS_BASE_API_URL}/26/analytics.json?dimension=dx:E8WZg2xUe6D;LzIEVzUpWIG;UW54RautAEK;V00M1X2mgCp;Rf9K17Q8KA5;ELorMg0kQhA;W1VReF5uwnI`,
    "default_period": "LAST_MONTH",
    "default_org_unit": "HfVjCurKxh2",
    "default_org_unit_level": "",
    "Notes": ""
  },
  {
    "page": "National Summary",
    "level": "National",
    "name": "National Summary",
    "id": "national__summary_kemsa_mos",
    "url": `${DHIS_BASE_API_URL}/26/analytics.json?dimension=dx:A3hCPRmBEc1;VJjIApOdBDM;xifzJdZepGL;m5JchlPXYGh;AcHIhCDHQ5q;ImjyH2PKcrb;MqaP08m7qpB`,
    "default_period": "LAST_MONTH",
    "default_org_unit": "HfVjCurKxh2",
    "default_org_unit_level": "",
    "Notes": ""
  },
  {
    "page": "National Summary",
    "level": "National",
    "name": "KEMSA Summary",
    "id": "national__kemsa_summary",
    "url": `${DHIS_BASE_API_URL}/26/analytics.json?dimension=dx:Aui7lNDOsSF.svPoNZ3VkVx;Aui7lNDOsSF.G3eMNWySdZq;Aui7lNDOsSF.Q9rPivWnD4K;Aui7lNDOsSF.HMTuusGLTUj;Aui7lNDOsSF.sEiFVVjqcfg;Kkh8ZtRWFmX.svPoNZ3VkVx;Kkh8ZtRWFmX.G3eMNWySdZq;Kkh8ZtRWFmX.Q9rPivWnD4K;Kkh8ZtRWFmX.HMTuusGLTUj;Kkh8ZtRWFmX.sEiFVVjqcfg;iZe9QHpC31Y.svPoNZ3VkVx;iZe9QHpC31Y.G3eMNWySdZq;iZe9QHpC31Y.Q9rPivWnD4K;iZe9QHpC31Y.HMTuusGLTUj;iZe9QHpC31Y.sEiFVVjqcfg;E7M967QxxFc.svPoNZ3VkVx;E7M967QxxFc.G3eMNWySdZq;E7M967QxxFc.Q9rPivWnD4K;E7M967QxxFc.HMTuusGLTUj;E7M967QxxFc.sEiFVVjqcfg;Wupc6TOJhcK.svPoNZ3VkVx;Wupc6TOJhcK.G3eMNWySdZq;Wupc6TOJhcK.Q9rPivWnD4K;Wupc6TOJhcK.HMTuusGLTUj;Wupc6TOJhcK.sEiFVVjqcfg;lZCba7Ijb7x.svPoNZ3VkVx;lZCba7Ijb7x.G3eMNWySdZq;lZCba7Ijb7x.Q9rPivWnD4K;lZCba7Ijb7x.HMTuusGLTUj;lZCba7Ijb7x.sEiFVVjqcfg;ALnonKSyDct.svPoNZ3VkVx;ALnonKSyDct.G3eMNWySdZq;ALnonKSyDct.Q9rPivWnD4K;ALnonKSyDct.HMTuusGLTUj;ALnonKSyDct.sEiFVVjqcfg`,
    "default_period": "LAST_MONTH",
    "default_org_unit": "HfVjCurKxh2",
    "default_org_unit_level": "",
    "Notes": ""
  },
  {
    "page": "All Malaria Commodities",
    "level": "National",
    "name": "SOH Comparison",
    "id": "national__soh_comparison",
    "url": `${DHIS_BASE_API_URL}/26/analytics.json?dimension=dx:jfUzb86mBSP.miM6uIJ2cWx;HwvUHnslwbh.miM6uIJ2cWx;OLYLVMDHEj8.miM6uIJ2cWx;UJeKVZzAnfS.miM6uIJ2cWx;naztfZrbMtd.miM6uIJ2cWx;EtG9ozt2joA.miM6uIJ2cWx;Umi8ZsiqBHw.miM6uIJ2cWx;Aui7lNDOsSF.HMTuusGLTUj;iZe9QHpC31Y.HMTuusGLTUj;Kkh8ZtRWFmX.HMTuusGLTUj;E7M967QxxFc.HMTuusGLTUj;Wupc6TOJhcK.HMTuusGLTUj;lZCba7Ijb7x.HMTuusGLTUj;ALnonKSyDct.HMTuusGLTUj;BnGDrFwyQp9.rPAsF4cpNxm;c0MB4RmVjxk.rPAsF4cpNxm;qnZmg5tNSMy.rPAsF4cpNxm;gVp1KSFI69G.rPAsF4cpNxm;iOARK31NdLp.rPAsF4cpNxm;imheYfA1Kiw.rPAsF4cpNxm;cPlWFYbBacW.rPAsF4cpNxm`,
    "default_period": "LAST_MONTH",
    "default_org_unit": "HfVjCurKxh2",
    "default_org_unit_level": "",
    "Notes": ""
  },
  {
    "page": "Pending Shipments",
    "level": "National",
    "name": "Pending Shipments",
    "id": "national__pending_shipments",
    "url": `${DHIS_BASE_API_URL}/26/dataStore/pending/stocks`,
    "default_period": "",
    "default_org_unit": "",
    "default_org_unit_level": "",
    "Notes": ""
  },
  {
    "page": "Issues vs Receipts",
    "level": "National",
    "name": "Issues vs Receipts",
    "id": "national__issues_vs_receipts",
    "url": `${DHIS_BASE_API_URL}/26/analytics.json?dimension=dx:jfUzb86mBSP.DTnItSklSr8;HwvUHnslwbh.DTnItSklSr8;OLYLVMDHEj8.DTnItSklSr8;UJeKVZzAnfS.DTnItSklSr8;naztfZrbMtd.DTnItSklSr8;EtG9ozt2joA.DTnItSklSr8;Umi8ZsiqBHw.DTnItSklSr8;BnGDrFwyQp9.yuvCdaFqdCW;c0MB4RmVjxk.yuvCdaFqdCW;qnZmg5tNSMy.yuvCdaFqdCW;gVp1KSFI69G.yuvCdaFqdCW;iOARK31NdLp.yuvCdaFqdCW;imheYfA1Kiw.yuvCdaFqdCW;eFqDcjgvt39.EJ8nUfcupBq`,
    "default_period": "201912;202001",
    "default_org_unit": "HfVjCurKxh2",
    "default_org_unit_level": "",
    "Notes": ""
  }
]

module.exports = endpoints
