let DHIS_BASE_API_URL = process.env.REACT_APP_DHIS_BASE_API_URL;
let APP_BASE_URL =
  process.env.REACT_APP_APP_BASE_URL || 'http://41.89.94.99:3000';

let m_al =  [
	{
	  page: 'Global',
	  level: 'All',
	  name: 'Levels list',
	  id: 'all__levels_list',
	  url: `${DHIS_BASE_API_URL}/organisationUnitLevels.json?paging=false&fields=name,level`,
	  Filters: '',
	  Notes: ''
	},
	{
	  page: 'Global',
	  level: 'All',
	  name: 'Organisation unit details',
	  id: 'all__org_unit_details',
	  local_url: `${APP_BASE_URL}/api/common/organisationUnit`,
	  url: `${DHIS_BASE_API_URL}/organisationUnits`,
	  Filters: '',
	  Notes: ''
	},
	{
	  page: 'Global',
	  level: 'All',
	  name: 'Counties list',
	  id: 'all__counties_list',
	  local_url: `${APP_BASE_URL}/api/common/counties`,
	  url: `${DHIS_BASE_API_URL}/organisationUnits.json?filter=level:eq:2&fields=id,name,level&paging=false`,
	  Filters: '',
	  Notes: ''
	},
	{
	  page: 'Global',
	  level: 'All',
	  name: 'Subcounties list',
	  id: 'all__subcounties_list',
	  local_url: `${APP_BASE_URL}/api/common/subcounties`,
	  url: `${DHIS_BASE_API_URL}/organisationUnits.json?filter=level:eq:3&fields=id,name,level,parent&paging=false`,
	  Filters: '',
	  Notes: ''
	},
	{
	  page: 'Global',
	  level: 'All',
	  name: 'Wards list',
	  id: 'all__wards_list',
	  local_url: `${APP_BASE_URL}/api/common/wards`,
	  url: `${DHIS_BASE_API_URL}/organisationUnits.json?filter=level:eq:4&fields=id,name,level,parent&paging=false`,
	  Filters: '',
	  Notes: ''
	},
	{
	  page: 'Global',
	  level: 'All',
	  name: 'Facilities list',
	  id: 'all__facilities_list',
	  local_url: `${APP_BASE_URL}/api/common/facilities`,
	  url: `${DHIS_BASE_API_URL}/organisationUnits.json?filter=level:eq:5&fields=id,name,level,parent&paging=false`,
	  Filters: '',
	  Notes: ''
	},
	{
	  page: 'Global',
	  level: 'All',
	  name: 'CUs list',
	  id: 'all__cus_list',
	  local_url: `${APP_BASE_URL}/api/common/community-units`,
	  url: `${DHIS_BASE_API_URL}/organisationUnits.json?filter=level:eq:6&fields=id,name,level,parent&paging=false`,
	  Filters: '',
	  Notes: ''
	},
	{
	  page: 'Global',
	  level: 'All',
	  name: 'MFL codes',
	  id: 'all__mfl_codes',
	  local_url: `${APP_BASE_URL}/api/common/mfl-codes`,
	  url: `${DHIS_BASE_API_URL}/organisationUnits.json?fields=id,code&paging=false`,
	  Filters: '',
	  Notes: ''
	},
	{
	  page: 'Global',
	  level: 'All',
	  name: 'User details',
	  id: 'all__user_details',
	  local_url: `${APP_BASE_URL}/api/common/defaults`,
	  url: `${DHIS_BASE_API_URL}/me.json`,
	  Filters: '',
	  Notes: ''
	},
	{
	  page: 'Global',
	  level: 'All',
	  name: 'Program Commodities',
	  id: 'all__commodities',
	  local_url: `${APP_BASE_URL}/api/common/commodities`,
	  url: `${DHIS_BASE_API_URL}/dataSets/RRnz4uPHXdl.json?fields=dataSetElements[dataElement[id,name]]`,
	  Filters: '',
	  Notes: ''
	},
	{
	  page: 'Global',
	  level: 'All',
	  name: 'Facilities assigned form',
	  id: 'all__mcf_orgunits',
	  local_url: `${APP_BASE_URL}/api/common/mcf-facilities`,
	  url: `${DHIS_BASE_API_URL}/dataSets.json?fields=id,name,organisationUnits[id,name,code,level]&filter=id:ilike:RRnz4uPHXdl&paging=false`,
	  Filters: '',
	  Notes: ''
	},
	{
	  page: 'Global',
	  level: 'All',
	  name: 'Expected Reports',
	  id: 'all__expected_reports',
	  local_url: `${APP_BASE_URL}/api/common/expected-reports`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:RRnz4uPHXdl.EXPECTED_REPORTS`,
	  default_period: 'LAST_MONTH',
	  default_org_unit: 'HfVjCurKxh2',
	  Filters: '',
	  Notes: ''
	},
	{
		page: 'Global',
		level: 'All',
		name: 'Actual Reports on Time',
		id: 'all__actual_reports_on_time',
		local_url: `${APP_BASE_URL}/api/common/actual-reports-on-time`,
		url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:RRnz4uPHXdl.ACTUAL_REPORTS_ON_TIME`,
		default_period: 'LAST_MONTH',
		default_org_unit: 'HfVjCurKxh2',
		Filters: '',
		Notes: ''
	},
	{
		page: 'Global',
		level: 'All',
		name: 'Actual Reports',
		id: 'all__actual_reports',
		local_url: `${APP_BASE_URL}/api/common/actual-reports`,
		url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:RRnz4uPHXdl.ACTUAL_REPORTS`,
		default_period: 'LAST_MONTH',
		default_org_unit: 'HfVjCurKxh2',
		Filters: '',
		Notes: ''
	},
	{
	  page: 'Dashboard',
	  level: 'All',
	  name: 'Stock Status',
	  id: 'all__stock_status',
	  local_url: `${APP_BASE_URL}/api/dashboard/stockstatus`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:HfGVoCZAwtd;nK8sqMAeQHY;ZcngDQJKiEg;wOKbEd8Dbi3;lHPLS1G5CUc;SSARcWY2Ge1;AX1co0SXobM;UUNwkYQhYgX;gEDxkvJmRAm;BnGDrFwyQp9.rPAsF4cpNxm;c0MB4RmVjxk.rPAsF4cpNxm;qnZmg5tNSMy.rPAsF4cpNxm;gVp1KSFI69G.rPAsF4cpNxm;Mmy9MoUdbhZ;iOARK31NdLp.rPAsF4cpNxm;imheYfA1Kiw.rPAsF4cpNxm;cPlWFYbBacW.rPAsF4cpNxm;f0AIAR5pJ2F.rPAsF4cpNxm;jfUzb86mBSP.miM6uIJ2cWx;HwvUHnslwbh.miM6uIJ2cWx;OLYLVMDHEj8.miM6uIJ2cWx;UJeKVZzAnfS.miM6uIJ2cWx;fiVSJyM5cDs;naztfZrbMtd.miM6uIJ2cWx;EtG9ozt2joA.miM6uIJ2cWx;Umi8ZsiqBHw.miM6uIJ2cWx;xZs759QOGvh.miM6uIJ2cWx`,
	  default_period: 'LAST_MONTH',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: '',
	  Filters: '',
	  Notes: ''
	},
	{
	  page: 'Dashboard',
	  level: 'All',
	  name: 'MOS by commodity',
	  id: 'all__mos_by_commodity',
	  local_url: `${APP_BASE_URL}/api/dashboard/mos-by-commodity`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:HfGVoCZAwtd;nK8sqMAeQHY;ZcngDQJKiEg;wOKbEd8Dbi3;lHPLS1G5CUc;SSARcWY2Ge1;AX1co0SXobM;UUNwkYQhYgX;gEDxkvJmRAm`,
	  default_period: 'LAST_MONTH',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: '',
	  Notes: ''
	},
	{
	  page: 'Dashboard',
	  level: 'All',
	  name: 'Facilities stock status (count)',
	  id: 'all__facilities_stock_status',
	  local_url: `${APP_BASE_URL}/api/dashboard/facility-stock-status`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:HfGVoCZAwtd;nK8sqMAeQHY;ZcngDQJKiEg;wOKbEd8Dbi3;SSARcWY2Ge1;AX1co0SXobM;UUNwkYQhYgX;gEDxkvJmRAm`,
	  default_period: 'LAST_MONTH',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 5,
	  Filters: '',
	  Notes: ''
	},
  
	{
	  page: 'Stock status',
	  level: 'County',
	  name: 'Artemether Lumefantrine (AL)',
	  id: 'county__artemether_lumefantrine',
	  local_url: `${APP_BASE_URL}/api/county/stockstatus/one/gVp1KSFI69G`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:RRnz4uPHXdl.REPORTING_RATE;RRnz4uPHXdl.REPORTING_RATE_ON_TIME;BnGDrFwyQp9.rPAsF4cpNxm;HfGVoCZAwtd;c0MB4RmVjxk.rPAsF4cpNxm;nK8sqMAeQHY;qnZmg5tNSMy.rPAsF4cpNxm;ZcngDQJKiEg;gVp1KSFI69G.rPAsF4cpNxm;wOKbEd8Dbi3;lHPLS1G5CUc`,
	  default_period: 'LAST_MONTH',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 5,
	  Notes: ''
	},
	{
	  page: 'Stock status',
	  level: 'County',
	  name: 'Artesunate Injection (AS)',
	  id: 'county__artesunate_injection',
	  local_url: `${APP_BASE_URL}/api/county/stockstatus/one/iOARK31NdLp`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:RRnz4uPHXdl.REPORTING_RATE;naztfZrbMtd.miM6uIJ2cWx;nvJsVaN8FOB.NhSoXUMPK2K;U2KpOVZOegw;iOARK31NdLp.rPAsF4cpNxm;SSARcWY2Ge1`,
	  default_period: 'LAST_MONTH',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 5,
	  Notes: ''
	},
	{
	  page: 'Stock status',
	  level: 'County',
	  name: 'Sulphadoxine Pyrimethamine (SP)',
	  id: 'county__sulphadoxine_pyrimethamine',
	  local_url: `${APP_BASE_URL}/api/county/stockstatus/one/imheYfA1Kiw`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:RRnz4uPHXdl.REPORTING_RATE;EtG9ozt2joA.miM6uIJ2cWx;TNWcde51FIt;imheYfA1Kiw.rPAsF4cpNxm;AX1co0SXobM`,
	  default_period: 'LAST_MONTH',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 5,
	  Notes: ''
	},
	{
	  page: 'Stock status',
	  level: 'County',
	  name: 'Rapid Diagnostic Tests (RDT)',
	  id: 'county__rapid_diagnostic_tests',
	  local_url: `${APP_BASE_URL}/api/county/stockstatus/one/cPlWFYbBacW`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:RRnz4uPHXdl.REPORTING_RATE;Umi8ZsiqBHw.miM6uIJ2cWx;AecI5IRlRSR;cPlWFYbBacW.rPAsF4cpNxm;UUNwkYQhYgX`,
	  default_period: 'LAST_MONTH',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 5,
	  Notes: ''
	},
	{
	  page: 'Stock status',
	  level: 'County',
	  name: 'LLINs',
	  id: 'county__llins',
	  local_url: `${APP_BASE_URL}/api/county/stockstatus/one/f0AIAR5pJ2F`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:RRnz4uPHXdl.REPORTING_RATE;xZs759QOGvh.miM6uIJ2cWx;nNlAdtxPHRL;f0AIAR5pJ2F.rPAsF4cpNxm;gEDxkvJmRAm`,
	  default_period: 'LAST_MONTH',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 5,
	  Notes: ''
	},
	{
	  page: 'Stock status all',
	  level: 'County',
	  name: 'All commodities',
	  id: 'county__all_commodities',
	  local_url: `${APP_BASE_URL}/api/county/stockstatus/all`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:jfUzb86mBSP.miM6uIJ2cWx;HwvUHnslwbh.miM6uIJ2cWx;OLYLVMDHEj8.miM6uIJ2cWx;UJeKVZzAnfS.miM6uIJ2cWx;naztfZrbMtd.miM6uIJ2cWx;EtG9ozt2joA.miM6uIJ2cWx;Umi8ZsiqBHw.miM6uIJ2cWx;xZs759QOGvh.miM6uIJ2cWx;BnGDrFwyQp9.rPAsF4cpNxm;c0MB4RmVjxk.rPAsF4cpNxm;qnZmg5tNSMy.rPAsF4cpNxm;gVp1KSFI69G.rPAsF4cpNxm;iOARK31NdLp.rPAsF4cpNxm;imheYfA1Kiw.rPAsF4cpNxm;cPlWFYbBacW.rPAsF4cpNxm;;f0AIAR5pJ2F.rPAsF4cpNxm`,
	  default_period: 'LAST_MONTH',
	  default_org_unit: 'hfVjCurKxh2',
	  default_org_unit_level: '',
	  Notes: ''
	},
	{
	  page: 'Reporting Rate',
	  level: 'County',
	  name: 'Reporting Rate Trend',
	  id: 'county__reporting_rate_trend',
	  local_url: `${APP_BASE_URL}/api/county/reportingrate/trend`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:RRnz4uPHXdl.REPORTING_RATE;RRnz4uPHXdl.REPORTING_RATE_ON_TIME`,
	  default_period: 'LAST_12_MONTHS',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 1,
	  Notes: ''
	},
	{
	  page: 'Reporting Rate',
	  level: 'County',
	  name: 'Reporting Rate Trend (latest subcounty)',
	  id: 'county__latest_reporting_rate_subcounty',
	  local_url: `${APP_BASE_URL}/api/county/reportingrate/latesttrend`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:RRnz4uPHXdl.REPORTING_RATE`,
	  default_period: 'LAST_MONTH',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 3,
	  Notes: ''
	},
  
	{
	  page: 'Reporting Rate',
	  level: 'County',
	  name: 'Facility Reporting Rate',
	  id: 'county__facility_reporting_rate',
	  local_url: `${APP_BASE_URL}/api/county/reportingrate/facility`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:RRnz4uPHXdl.ACTUAL_REPORTS;RRnz4uPHXdl.EXPECTED_REPORTS`,
	  default_period: 'LAST_6_MONTHS',
	  default_org_unit: 'vvOK1BxTbet',
	  default_org_unit_level: 5,
	  Notes: ''
	},
	{
	  page: 'Reporting Rate',
	  level: 'County',
	  name: 'Subcounty Reporting Rate',
	  id: 'county__subcounty_reporting_rate',
	  local_url: `${APP_BASE_URL}/api/county/reportingrate/subcounty`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:RRnz4uPHXdl.ACTUAL_REPORTS;RRnz4uPHXdl.EXPECTED_REPORTS`,
	  default_period: 'LAST_6_MONTHS',
	  default_org_unit: 'vvOK1BxTbet',
	  default_org_unit_level: 4,
	  Notes: ''
	},
	{
	  page: 'Data Quality: Completeness',
	  level: 'County',
	  name: 'Completeness',
	  id: 'county__dq_completeness',
	  local_url: `${APP_BASE_URL}/api/county/dataquality/completeness`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:zB1NW37bi46;RRnz4uPHXdl.EXPECTED_REPORTS`,
	  default_period: 'LAST_12_MONTHS',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 5,
	  Notes: 'Has commodity filter'
	},
	{
	  page: "Data Quality: Concordance",
	  level: "County",
	  name: "Artemether-Lumefantrine 20/120 Tabs 6s",
	  id: "county__dq_concordance_al6",
	  local_url: `${APP_BASE_URL}/api/county/dataquality/concordance/BnGDrFwyQp9`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:BnGDrFwyQp9.rPAsF4cpNxm;BnGDrFwyQp9.HWtHCLAwprR`,
	  default_period: "LAST_MONTH",
	  default_org_unit: "HfVjCurKxh2",
	  default_level: 5,
	  notes: ""
	},
	{
	  page: "Data Quality: Concordance",
	  level: "County",
	  name: "Artemether-Lumefantrine 20/120 Tabs 12s",
	  id: "county__dq_concordance_al12",
	  local_url: `${APP_BASE_URL}/api/county/dataquality/concordance/c0MB4RmVjxk`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:c0MB4RmVjxk.rPAsF4cpNxm;c0MB4RmVjxk.HWtHCLAwprR`,
	  default_period: "LAST_MONTH",
	  default_org_unit: "HfVjCurKxh2",
	  default_level: 5,
	  notes: ""
	},
	{
	  page: "Data Quality: Concordance",
	  level: "County",
	  name: "Artemether-Lumefantrine 20/120 Tabs 18s",
	  id: "county__dq_concordance_al18",
	  local_url: `${APP_BASE_URL}/api/county/dataquality/concordance/qnZmg5tNSMy`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:qnZmg5tNSMy.rPAsF4cpNxm;qnZmg5tNSMy.HWtHCLAwprR`,
	  default_period: "LAST_MONTH",
	  default_org_unit: "HfVjCurKxh2",
	  default_level: 5,
	  notes: ""
	},
	{
	  page: "Data Quality: Concordance",
	  level: "County",
	  name: "Artemether-Lumefantrine 20/120 Tabs 24s",
	  id: "county__dq_concordance_al24",
	  local_url: `${APP_BASE_URL}/api/county/dataquality/concordance/gVp1KSFI69G`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:gVp1KSFI69G.rPAsF4cpNxm;gVp1KSFI69G.HWtHCLAwprR`,
	  default_period: "LAST_MONTH",
	  default_org_unit: "HfVjCurKxh2",
	  default_level: 5,
	  notes: ""
	},
	{
	  page: "Data Quality: Concordance",
	  level: "County",
	  name: "Artesunate Injection (AS)",
	  id: "county__dq_concordance_as",
	  local_url: `${APP_BASE_URL}/api/county/dataquality/concordance/iOARK31NdLp`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:iOARK31NdLp.rPAsF4cpNxm;iOARK31NdLp.HWtHCLAwprR`,
	  default_period: "LAST_MONTH",
	  default_org_unit: "HfVjCurKxh2",
	  default_level: 5,
	  notes: ""
	},
	{
	  page: "Data Quality: Concordance",
	  level: "County",
	  name: "Sulphadoxine Pyrimethamine (SP)",
	  id: "county__dq_concordance_sp",
	  local_url: `${APP_BASE_URL}/api/county/dataquality/concordance/imheYfA1Kiw`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:imheYfA1Kiw.rPAsF4cpNxm;imheYfA1Kiw.HWtHCLAwprR`,
	  default_period: "LAST_MONTH",
	  default_org_unit: "HfVjCurKxh2",
	  default_level: 5,
	  notes: ""
	},
	{
	  page: "Data Quality: Concordance",
	  level: "County",
	  name: "Rapid Diagnostic Tests (RDTs)",
	  id: "county__dq_concordance_rdt",
	  local_url: `${APP_BASE_URL}/api/county/dataquality/concordance/gVp1KSFI69G`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:cPlWFYbBacW.rPAsF4cpNxm;cPlWFYbBacW.HWtHCLAwprR`,
	  default_period: "LAST_MONTH",
	  default_org_unit: "HfVjCurKxh2",
	  default_level: 5,
	  notes: ""
	},
	{
	  page: "Data Quality: Concordance",
	  level: "County",
	  name: "LLINs",
	  id: "county__dq_concordance_llins",
	  local_url: `${APP_BASE_URL}/api/county/dataquality/concordance/f0AIAR5pJ2F`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:f0AIAR5pJ2F.rPAsF4cpNxm;f0AIAR5pJ2F.HWtHCLAwprR`,
	  default_period: "LAST_MONTH",
	  default_org_unit: "HfVjCurKxh2",
	  default_level: 5,
	  notes: ""
	},
	{
	  page: 'Data Quality: Consistency',
	  level: 'County',
	  name: 'Artemether-Lumefantrine 20/120 Tabs 6s',
	  id: 'county__dq_consistency_al6',
	  local_url: `${APP_BASE_URL}/api/county/dataquality/consistency/BnGDrFwyQp9`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:BnGDrFwyQp9.HWtHCLAwprR;BnGDrFwyQp9.yuvCdaFqdCW;BnGDrFwyQp9.CckV73xy6HB;BnGDrFwyQp9.unVIt2C0cdW;BnGDrFwyQp9.w77uMi1KzOH;BnGDrFwyQp9.rPAsF4cpNxm`,
	  default_period: 'LAST_MONTH',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 5,
	  Notes: ''
	},
	{
	  page: 'Data Quality: Consistency',
	  level: 'County',
	  name: 'Artemether-Lumefantrine 20/120 Tabs 12s',
	  id: 'county__dq_consistency_al12',
	  local_url: `${APP_BASE_URL}/api/county/dataquality/consistency/c0MB4RmVjxk`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:c0MB4RmVjxk.HWtHCLAwprR;c0MB4RmVjxk.yuvCdaFqdCW;c0MB4RmVjxk.CckV73xy6HB;c0MB4RmVjxk.unVIt2C0cdW;c0MB4RmVjxk.w77uMi1KzOH;c0MB4RmVjxk.rPAsF4cpNxm`,
	  default_period: 'LAST_MONTH',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 5,
	  Notes: ''
	},
	{
	  page: 'Data Quality: Consistency',
	  level: 'County',
	  name: 'Artemether-Lumefantrine 20/120 Tabs 18s',
	  id: 'county__dq_consistency_al18',
	  local_url: `${APP_BASE_URL}/api/county/dataquality/consistency/qnZmg5tNSMy`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:qnZmg5tNSMy.HWtHCLAwprR;qnZmg5tNSMy.yuvCdaFqdCW;qnZmg5tNSMy.CckV73xy6HB;qnZmg5tNSMy.unVIt2C0cdW;qnZmg5tNSMy.w77uMi1KzOH;qnZmg5tNSMy.rPAsF4cpNxm`,
	  default_period: 'LAST_MONTH',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 5,
	  Notes: ''
	},
	{
	  page: 'Data Quality: Consistency',
	  level: 'County',
	  name: 'Artemether-Lumefantrine 20/120 Tabs 24s',
	  id: 'county__dq_consistency_al24',
	  local_url: `${APP_BASE_URL}/api/county/dataquality/consistency/gVp1KSFI69G`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:gVp1KSFI69G.HWtHCLAwprR;gVp1KSFI69G.yuvCdaFqdCW;gVp1KSFI69G.CckV73xy6HB;gVp1KSFI69G.unVIt2C0cdW;gVp1KSFI69G.w77uMi1KzOH;gVp1KSFI69G.rPAsF4cpNxm`,
	  default_period: 'LAST_MONTH',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 5,
	  Notes: ''
	},
	{
	  page: 'Data Quality: Consistency',
	  level: 'County',
	  name: 'Artesunate Injection (AS)',
	  id: 'county__dq_consistency_as',
	  local_url: `${APP_BASE_URL}/api/county/dataquality/consistency/iOARK31NdLp`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:iOARK31NdLp.HWtHCLAwprR;iOARK31NdLp.yuvCdaFqdCW;iOARK31NdLp.CckV73xy6HB;iOARK31NdLp.unVIt2C0cdW;iOARK31NdLp.w77uMi1KzOH;iOARK31NdLp.rPAsF4cpNxm`,
	  default_period: 'LAST_MONTH',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 5,
	  Notes: ''
	}, 
	{
	  page: 'Data Quality: Consistency',
	  level: 'County',
	  name: 'Sulphadoxine Pyrimethamine (SP)',
	  id: 'county__dq_consistency_sp',
	  local_url: `${APP_BASE_URL}/api/county/dataquality/consistency/imheYfA1Kiw`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:imheYfA1Kiw.HWtHCLAwprR;imheYfA1Kiw.yuvCdaFqdCW;imheYfA1Kiw.CckV73xy6HB;imheYfA1Kiw.unVIt2C0cdW;imheYfA1Kiw.w77uMi1KzOH;imheYfA1Kiw.rPAsF4cpNxm`,
	  default_period: 'LAST_MONTH',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 5,
	  Notes: ''
	},
	{
	  page: 'Data Quality: Consistency',
	  level: 'County',
	  name: 'Rapid Diagnostic Tests (RDTs)',
	  id: 'county__dq_consistency_rdts',
	  local_url: `${APP_BASE_URL}/api/county/dataquality/consistency/cPlWFYbBacW`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:cPlWFYbBacW.HWtHCLAwprR;cPlWFYbBacW.yuvCdaFqdCW;cPlWFYbBacW.CckV73xy6HB;cPlWFYbBacW.unVIt2C0cdW;cPlWFYbBacW.w77uMi1KzOH;cPlWFYbBacW.rPAsF4cpNxm`,
	  default_period: 'LAST_MONTH',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 5,
	  Notes: ''
	},
	{
	  page: 'Data Quality: Consistency',
	  level: 'County',
	  name: 'LLINs',
	  id: 'county__dq_consistency_llins',
	  local_url: `${APP_BASE_URL}/api/county/dataquality/consistency/f0AIAR5pJ2F`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:f0AIAR5pJ2F.HWtHCLAwprR;f0AIAR5pJ2F.yuvCdaFqdCW;f0AIAR5pJ2F.CckV73xy6HB;f0AIAR5pJ2F.unVIt2C0cdW;f0AIAR5pJ2F.w77uMi1KzOH;f0AIAR5pJ2F.rPAsF4cpNxm`,
	  default_period: 'LAST_MONTH',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 5,
	  Notes: ''
	},
	{
	  page: 'Data Quality: Comparison',
	  level: 'County',
	  name: 'Comparison',
	  id: 'county__dq_comparison',
	  local_url: `${APP_BASE_URL}/api/county/dataquality/comparison`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:E1J6vMP5hFO;Gwr4lywXLiM`,
	  default_period: 'LAST_MONTH',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 5,
	  Notes: ''
	},
	{
	  page: 'Supply Chain Performance Summary',
	  level: 'County',
	  name: 'Indicator Summary',
	  id: 'county__indicator_summary',
	  local_url: `${APP_BASE_URL}/api/county/supplychain/indicatorsummary`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:RRnz4uPHXdl.REPORTING_RATE;RRnz4uPHXdl.REPORTING_RATE_ON_TIME;zLR3PBVPgN5;bJILAolJsSJ;jtGNoWcdNcx;p2aNqT2HVyr`,
	  default_period: 'LAST_MONTH',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 5,
	  Notes: ''
	},
	{
	  page: 'Supply Chain Performance Trends',
	  level: 'County',
	  name: 'Artemether-Lumefantrine 20/120 Tabs 6s',
	  id: 'county__indicator_trends_al6',
	  local_url: `${APP_BASE_URL}/api/county/supplychain/indicatortrends/HfGVoCZAwtd`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:HfGVoCZAwtd`,
	  default_period: 'LAST_6_MONTHS',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 5,
	  Notes: ''
	},
	{
	  page: 'Supply Chain Performance Trends',
	  level: 'County',
	  name: 'Artemether-Lumefantrine 20/120 Tabs 12s',
	  id: 'county__indicator_trends_al12',
	  local_url: `${APP_BASE_URL}/api/county/supplychain/indicatortrends/nK8sqMAeQHY`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:nK8sqMAeQHY`,
	  default_period: 'LAST_6_MONTHS',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 5,
	  Notes: ''
	},
	{
	  page: 'Supply Chain Performance Trends',
	  level: 'County',
	  name: 'Artemether-Lumefantrine 20/120 Tabs 18s',
	  id: 'county__indicator_trends_al18',
	  local_url: `${APP_BASE_URL}/api/county/supplychain/indicatortrends/ZcngDQJKiEg`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:ZcngDQJKiEg`,
	  default_period: 'LAST_6_MONTHS',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 5,
	  Notes: ''
	},
	{
	  page: 'Supply Chain Performance Trends',
	  level: 'County',
	  name: 'Artemether-Lumefantrine 20/120 Tabs 24s',
	  id: 'county__indicator_trends_al24',
	  local_url: `${APP_BASE_URL}/api/county/supplychain/indicatortrends/wOKbEd8Dbi3`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:wOKbEd8Dbi3`,
	  default_period: 'LAST_6_MONTHS',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 5,
	  Notes: ''
	},
	{
	  page: 'Supply Chain Performance Trends',
	  level: 'County',
	  name: 'Artesunate Injection (AS)',
	  id: 'county__indicator_trends_as',
	  local_url: `${APP_BASE_URL}/api/county/supplychain/indicatortrends/SSARcWY2Ge1`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:SSARcWY2Ge1`,
	  default_period: 'LAST_6_MONTHS',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 5,
	  Notes: ''
	},
	{
	  page: 'Supply Chain Performance Trends',
	  level: 'County',
	  name: 'Sulphadoxine Pyrimethamine (SP)',
	  id: 'county__indicator_trends_sp',
	  local_url: `${APP_BASE_URL}/api/county/supplychain/indicatortrends/AX1co0SXobM`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:AX1co0SXobM`,
	  default_period: 'LAST_6_MONTHS',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 5,
	  Notes: ''
	},
	{
	  page: 'Supply Chain Performance Trends',
	  level: 'County',
	  name: 'Rapid Diagnostic Tests (RDTs)',
	  id: 'county__indicator_trends_rdts',
	  local_url: `${APP_BASE_URL}/api/county/supplychain/indicatortrends/UUNwkYQhYgX`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:UUNwkYQhYgX`,
	  default_period: 'LAST_6_MONTHS',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 5,
	  Notes: ''
	},
	{
	  page: 'Supply Chain Performance Trends',
	  level: 'County',
	  name: 'LLINs',
	  id: 'county__indicator_trends_llins',
	  local_url: `${APP_BASE_URL}/api/county/supplychain/indicatortrends/gEDxkvJmRAm`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:gEDxkvJmRAm`,
	  default_period: 'LAST_6_MONTHS',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 5,
	  Notes: ''
	},
	{
	  page: 'Accountability',
	  level: 'County',
	  name: 'Accountability',
	  id: 'county__accountability',
	  local_url: `${APP_BASE_URL}/api/county/accountability`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:BnGDrFwyQp9.HWtHCLAwprR;c0MB4RmVjxk.HWtHCLAwprR;qnZmg5tNSMy.HWtHCLAwprR;gVp1KSFI69G.HWtHCLAwprR;iOARK31NdLp.HWtHCLAwprR;imheYfA1Kiw.HWtHCLAwprR;cPlWFYbBacW.HWtHCLAwprR;f0AIAR5pJ2F.HWtHCLAwprR;BnGDrFwyQp9.CckV73xy6HB;gVp1KSFI69G.CckV73xy6HB;qnZmg5tNSMy.CckV73xy6HB;c0MB4RmVjxk.CckV73xy6HB;iOARK31NdLp.CckV73xy6HB;imheYfA1Kiw.CckV73xy6HB;cPlWFYbBacW.CckV73xy6HB;f0AIAR5pJ2F.CckV73xy6HB;BnGDrFwyQp9.yuvCdaFqdCW;c0MB4RmVjxk.yuvCdaFqdCW;qnZmg5tNSMy.yuvCdaFqdCW;gVp1KSFI69G.yuvCdaFqdCW;iOARK31NdLp.yuvCdaFqdCW;imheYfA1Kiw.yuvCdaFqdCW;cPlWFYbBacW.yuvCdaFqdCW;f0AIAR5pJ2F.yuvCdaFqdCW;BnGDrFwyQp9.w77uMi1KzOH;c0MB4RmVjxk.w77uMi1KzOH;qnZmg5tNSMy.w77uMi1KzOH;gVp1KSFI69G.w77uMi1KzOH;iOARK31NdLp.w77uMi1KzOH;imheYfA1Kiw.w77uMi1KzOH;cPlWFYbBacW.w77uMi1KzOH;f0AIAR5pJ2F.w77uMi1KzOH;BnGDrFwyQp9.unVIt2C0cdW;c0MB4RmVjxk.unVIt2C0cdW;qnZmg5tNSMy.unVIt2C0cdW;gVp1KSFI69G.unVIt2C0cdW;iOARK31NdLp.unVIt2C0cdW;imheYfA1Kiw.unVIt2C0cdW;cPlWFYbBacW.unVIt2C0cdW;f0AIAR5pJ2F.unVIt2C0cdW;BnGDrFwyQp9.rPAsF4cpNxm;c0MB4RmVjxk.rPAsF4cpNxm;qnZmg5tNSMy.rPAsF4cpNxm;gVp1KSFI69G.rPAsF4cpNxm;iOARK31NdLp.rPAsF4cpNxm;imheYfA1Kiw.rPAsF4cpNxm;cPlWFYbBacW.rPAsF4cpNxm;f0AIAR5pJ2F.rPAsF4cpNxm`,
	  default_period: 'LAST_MONTH',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 1,
	  Notes: ''
	},
	{
	  page: 'Issues vs Receipts',
	  level: 'County',
	  name: 'Issues vs Receipts',
	  id: 'county__issues_vs_receipts',
	  local_url: `${APP_BASE_URL}/api/county/issuesvsreceipts`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:jfUzb86mBSP.DTnItSklSr8;HwvUHnslwbh.DTnItSklSr8;OLYLVMDHEj8.DTnItSklSr8;UJeKVZzAnfS.DTnItSklSr8;naztfZrbMtd.DTnItSklSr8;EtG9ozt2joA.DTnItSklSr8;Umi8ZsiqBHw.DTnItSklSr8;xZs759QOGvh.DTnItSklSr8;BnGDrFwyQp9.yuvCdaFqdCW;c0MB4RmVjxk.yuvCdaFqdCW;qnZmg5tNSMy.yuvCdaFqdCW;gVp1KSFI69G.yuvCdaFqdCW;iOARK31NdLp.yuvCdaFqdCW;imheYfA1Kiw.yuvCdaFqdCW;eFqDcjgvt39.yuvCdaFqdCW;f0AIAR5pJ2F.yuvCdaFqdCW`,
	  default_period: 'LAST_3_MONTHS',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: 1,
	  Notes: ''
	},
	
	{   
		page: 'Health Facility Followup',
		level: 'County',
		id: 'county__facilities_followup_al6s',
		name: 'Artemether-Lumefantrine 20/120 Tabs 6s',
		local_url: `${APP_BASE_URL}/api/county/hffollowup/understocked/HfGVoCZAwtd`,
		url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:HfGVoCZAwtd;BnGDrFwyQp9.rPAsF4cpNxm;jfUzb86mBSP.miM6uIJ2cWx`,
		default_period: 'LAST_MONTH',
		default_org_unit: 'HfVjCurKxh2',
		default_org_unit_level: 5,
		Notes: ''
	},
	{   
		page: 'Health Facility Followup',
		level: 'County',
		id: 'county__facilities_followup_al12s',
		name: 'Artemether-Lumefantrine 20/120 Tabs 12s',
		local_url: `${APP_BASE_URL}/api/county/hffollowup/understocked/nK8sqMAeQHY`,
		url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:nK8sqMAeQHY;c0MB4RmVjxk.rPAsF4cpNxm;HwvUHnslwbh.miM6uIJ2cWx`,
	},
	{   
		page: 'Health Facility Followup',
		level: 'County',
		id: 'county__facilities_followup_al18s',
		name: 'Artemether-Lumefantrine 20/120 Tabs 18s',
		local_url: `${APP_BASE_URL}/api/county/hffollowup/understocked/ZcngDQJKiEg`,
		url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:ZcngDQJKiEg;qnZmg5tNSMy.rPAsF4cpNxm;OLYLVMDHEj8.miM6uIJ2cWx`,
	},
	{   
		page: 'Health Facility Followup',
		level: 'County',
		id: 'county__facilities_followup_al24s',
		name: 'Artemether-Lumefantrine 20/120 Tabs 24s',
		local_url: `${APP_BASE_URL}/api/county/hffollowup/understocked/wOKbEd8Dbi3`,
		url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:wOKbEd8Dbi3;gVp1KSFI69G.rPAsF4cpNxm;UJeKVZzAnfS.miM6uIJ2cWx`,
	},
	{   
		page: 'Health Facility Followup',
		level: 'County',
		id: 'county__facilities_followup_as',
		name: 'Artesunate injection',
		local_url: `${APP_BASE_URL}/api/county/hffollowup/understocked/SSARcWY2Ge1`,
		url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:SSARcWY2Ge1;iOARK31NdLp.rPAsF4cpNxm;naztfZrbMtd.miM6uIJ2cWx`,
	},
	{   
		page: 'Health Facility Followup',
		level: 'County',
		id: 'county__facilities_followup_sp',
		name: 'Sulphadoxine Pyrimethamine tabs',
		local_url: `${APP_BASE_URL}/api/county/hffollowup/understocked/AX1co0SXobM`,
		url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:AX1co0SXobM;imheYfA1Kiw.rPAsF4cpNxm;EtG9ozt2joA.miM6uIJ2cWx`,
	},
	{   
		page: 'Health Facility Followup',
		level: 'County',
		id: 'county__facilities_followup_rdts',
		name: 'Rapid Diagnostic Tests',
		local_url: `${APP_BASE_URL}/api/county/hffollowup/understocked/UUNwkYQhYgX`,
		url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:UUNwkYQhYgX;cPlWFYbBacW.rPAsF4cpNxm;Umi8ZsiqBHw.miM6uIJ2cWx`,
	},
	{   
		page: 'Health Facility Followup',
		level: 'County',
		id: 'county__facilities_followup_llins',
		name: 'LLINs',
		local_url: `${APP_BASE_URL}/api/county/hffollowup/understocked/gEDxkvJmRAm`,
		url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:gEDxkvJmRAm;f0AIAR5pJ2F.rPAsF4cpNxm;xZs759QOGvh.miM6uIJ2cWx`,
	},

	{
	  page: 'National Stocks',
	  level: 'National',
	  name: 'National Summary',
	  id: 'national__summary_facility_mos',
	  local_url: `${APP_BASE_URL}/api/national/summary/facility-mos`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:HfGVoCZAwtd;ZcngDQJKiEg;nK8sqMAeQHY;wOKbEd8Dbi3;SSARcWY2Ge1;AX1co0SXobM;UUNwkYQhYgX;gEDxkvJmRAm`,
	  default_period: 'LAST_MONTH',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: '',
	  Notes: ''
	},
	{
	  page: 'National Stocks',
	  level: 'National',
	  name: 'National Summary',
	  id: 'national__summary_pending_mos',
	  local_url: `${APP_BASE_URL}/api/national/summary/pending-mos`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:E8WZg2xUe6D;LzIEVzUpWIG;UW54RautAEK;V00M1X2mgCp;Rf9K17Q8KA5;ELorMg0kQhA;W1VReF5uwnI;W1VReF5uwnI`,
	  default_period: 'LAST_MONTH',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: '',
	  Notes: ''
	},
	{
	  page: 'National Stocks',
	  level: 'National',
	  name: 'National Summary',
	  id: 'national__summary_kemsa_mos',
	  local_url: `${APP_BASE_URL}/api/national/summary/kemsa-mos`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:A3hCPRmBEc1;VJjIApOdBDM;xifzJdZepGL;m5JchlPXYGh;AcHIhCDHQ5q;ImjyH2PKcrb;MqaP08m7qpB;TaF3YvKkHvw`,
	  default_period: 'LAST_MONTH',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: '',
	  Notes: ''
	},	
	{
	  page: 'National Stocks',
	  level: 'National',
	  name: 'National Stocks',
	  id: 'national__kemsa_summary',
	  local_url: `${APP_BASE_URL}/api/national/summary/kemsasummary`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:Aui7lNDOsSF.svPoNZ3VkVx;Aui7lNDOsSF.G3eMNWySdZq;Aui7lNDOsSF.Q9rPivWnD4K;Aui7lNDOsSF.HMTuusGLTUj;Aui7lNDOsSF.sEiFVVjqcfg;Kkh8ZtRWFmX.svPoNZ3VkVx;Kkh8ZtRWFmX.G3eMNWySdZq;Kkh8ZtRWFmX.Q9rPivWnD4K;Kkh8ZtRWFmX.HMTuusGLTUj;Kkh8ZtRWFmX.sEiFVVjqcfg;iZe9QHpC31Y.svPoNZ3VkVx;iZe9QHpC31Y.G3eMNWySdZq;iZe9QHpC31Y.Q9rPivWnD4K;iZe9QHpC31Y.HMTuusGLTUj;iZe9QHpC31Y.sEiFVVjqcfg;E7M967QxxFc.svPoNZ3VkVx;E7M967QxxFc.G3eMNWySdZq;E7M967QxxFc.Q9rPivWnD4K;E7M967QxxFc.HMTuusGLTUj;E7M967QxxFc.sEiFVVjqcfg;Wupc6TOJhcK.svPoNZ3VkVx;Wupc6TOJhcK.G3eMNWySdZq;Wupc6TOJhcK.Q9rPivWnD4K;Wupc6TOJhcK.HMTuusGLTUj;Wupc6TOJhcK.sEiFVVjqcfg;lZCba7Ijb7x.svPoNZ3VkVx;lZCba7Ijb7x.G3eMNWySdZq;lZCba7Ijb7x.Q9rPivWnD4K;lZCba7Ijb7x.HMTuusGLTUj;lZCba7Ijb7x.sEiFVVjqcfg;ALnonKSyDct.svPoNZ3VkVx;ALnonKSyDct.G3eMNWySdZq;ALnonKSyDct.Q9rPivWnD4K;ALnonKSyDct.HMTuusGLTUj;ALnonKSyDct.sEiFVVjqcfg;ZiLVFNkjwdB.svPoNZ3VkVx;ZiLVFNkjwdB.G3eMNWySdZq;ZiLVFNkjwdB.Q9rPivWnD4K;ZiLVFNkjwdB.HMTuusGLTUj;ZiLVFNkjwdB.sEiFVVjqcfg`,
	  default_period: 'LAST_MONTH',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: '',
	  Notes: ''
	},
	{
	  page: 'National SOH Comparison',
	  level: 'National',
	  name: 'SOH Comparison',
	  id: 'national__soh_comparison',
	  local_url: `${APP_BASE_URL}/api/national/sohcomparison`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:jfUzb86mBSP.miM6uIJ2cWx;HwvUHnslwbh.miM6uIJ2cWx;OLYLVMDHEj8.miM6uIJ2cWx;UJeKVZzAnfS.miM6uIJ2cWx;naztfZrbMtd.miM6uIJ2cWx;EtG9ozt2joA.miM6uIJ2cWx;Umi8ZsiqBHw.miM6uIJ2cWx;xZs759QOGvh.miM6uIJ2cWx;Aui7lNDOsSF.HMTuusGLTUj;iZe9QHpC31Y.HMTuusGLTUj;Kkh8ZtRWFmX.HMTuusGLTUj;E7M967QxxFc.HMTuusGLTUj;Wupc6TOJhcK.HMTuusGLTUj;lZCba7Ijb7x.HMTuusGLTUj;ALnonKSyDct.HMTuusGLTUj;ZiLVFNkjwdB.HMTuusGLTUj;BnGDrFwyQp9.rPAsF4cpNxm;c0MB4RmVjxk.rPAsF4cpNxm;qnZmg5tNSMy.rPAsF4cpNxm;gVp1KSFI69G.rPAsF4cpNxm;iOARK31NdLp.rPAsF4cpNxm;imheYfA1Kiw.rPAsF4cpNxm;cPlWFYbBacW.rPAsF4cpNxm;f0AIAR5pJ2F.rPAsF4cpNxm`,
	  default_period: 'LAST_MONTH',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: '',
	  Notes: ''
	},
	{
	  page: 'Pending Shipments',
	  level: 'National',
	  name: 'Pending Shipments',
	  id: 'national__pending_shipments',
	  local_url: `${APP_BASE_URL}/api/national/pendingshipment`,
	  url: `${DHIS_BASE_API_URL}/dataStore/pending/stocks`,
	  default_period: '',
	  default_org_unit: '',
	  default_org_unit_level: '',
	  Notes: ''
	},
	{
	  page: 'Issues vs Receipts',
	  level: 'National',
	  name: 'Issues vs Receipts',
	  id: 'national__issues_vs_receipts',
	  local_url: `${APP_BASE_URL}/api/national/issuesvsreceipts`,
	  url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:jfUzb86mBSP.DTnItSklSr8;HwvUHnslwbh.DTnItSklSr8;OLYLVMDHEj8.DTnItSklSr8;UJeKVZzAnfS.DTnItSklSr8;naztfZrbMtd.DTnItSklSr8;EtG9ozt2joA.DTnItSklSr8;Umi8ZsiqBHw.DTnItSklSr8;BnGDrFwyQp9.yuvCdaFqdCW;c0MB4RmVjxk.yuvCdaFqdCW;qnZmg5tNSMy.yuvCdaFqdCW;gVp1KSFI69G.yuvCdaFqdCW;iOARK31NdLp.yuvCdaFqdCW;imheYfA1Kiw.yuvCdaFqdCW;eFqDcjgvt39.EJ8nUfcupBq`,
	  default_period: 'LAST_3_MONTHS',
	  default_org_unit: 'HfVjCurKxh2',
	  default_org_unit_level: '',
	  Notes: ''
	},
	{
		page: 'Risk Parameters',
		level: 'County',
		name: 'Risk One',
		id: 'county__risk_parameters_risk_1',
		local_url: `${APP_BASE_URL}/api/county/riskparameters/f0AIAR5pJ2F`,
		url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:f0AIAR5pJ2F.w77uMi1KzOH&displayProperty=NAME&outputIdScheme=UID`,
		default_period: 'LAST_3_MONTHS',
		default_org_unit: 'HfVjCurKxh2',
		default_org_unit_level: 5,
		Notes: ''
	  },
	  {
		page: 'Risk Parameters',
		level: 'County',
		name: 'Risk Two',
		id: 'county__risk_parameters_Risk_2',
		local_url: `${APP_BASE_URL}/api/county/riskparameters/Bi2Lyr2ZZk0`,
		url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:Bi2Lyr2ZZk0&displayProperty=NAME&outputIdScheme=UID`,
		default_period: 'LAST_MONTH',
		default_org_unit: 'HfVjCurKxh2',
		default_org_unit_level: 5,
		Notes: ''
	  },
	  {
		page: 'Risk Parameters',
		level: 'County',
		name: 'Risk Three',
		id: 'county__risk_parameters_risk_3',
		local_url: `${APP_BASE_URL}/api/county/riskparameters/VlJEww8KcUD`,
		url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:f0AIAR5pJ2F.w77uMi1KzOH;VlJEww8KcUD&displayProperty=NAME&outputIdScheme=UID`,
		default_period: 'LAST_MONTH',
		default_org_unit: 'HfVjCurKxh2',
		default_org_unit_level: 5,
		Notes: ''
	  },
	  {
		page: 'Risk Parameters',
		level: 'County',
		name: 'Risk Four',
		id: 'county__risk_parameters_Risk_4',
		local_url: `${APP_BASE_URL}/api/county/riskparameters/RURwrNJC9h6`,
		url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:Bi2Lyr2ZZk0&displayProperty=NAME&outputIdScheme=UID`,
		default_period: 'LAST_MONTH',
		default_org_unit: 'HfVjCurKxh2',
		default_org_unit_level: 5,
		Notes: ''
	  },
	  {
		page: 'Risk Parameters',
		level: 'County',
		name: 'Risk Five',
		id: 'county__risk_parameters_risk_5',
		local_url: `${APP_BASE_URL}/api/county/riskparameters/rqzfl66VFyd`,
		url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:f0AIAR5pJ2F.rqzfl66VFyd&displayProperty=NAME&outputIdScheme=UID`,
		default_period: 'LAST_6_MONTHS',
		default_org_unit: 'HfVjCurKxh2',
		default_org_unit_level: 5,
		Notes: ''
	  },
	  {
		page: 'Risk Parameters',
		level: 'County',
		name: 'Risk Six',
		id: 'county__risk_parameters_Risk_6',
		local_url: `${APP_BASE_URL}/api/county/riskparameters/c6A37DQWMIt`,
		url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:c6A37DQWMIt&displayProperty=NAME&outputIdScheme=UID`,
		default_period: 'LAST_MONTH', //&filter=pe:202201
		default_org_unit: 'HfVjCurKxh2',
		default_org_unit_level: 5,
		Notes: ''
	  },
	  {
		page: 'Risk Parameters',
		level: 'County',
		name: 'Risk Seven',
		id: 'county__risk_parameters_risk_7',
		local_url: `${APP_BASE_URL}/api/county/riskparameters/rPAsF4cpNxm`,
		url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:f0AIAR5pJ2F.rPAsF4cpNxm;f0AIAR5pJ2F.HWtHCLAwprR&displayProperty=NAME&outputIdScheme=UID`,
		default_period: 'LAST_3_MONTHS',
		default_org_unit: 'HfVjCurKxh2',
		default_org_unit_level: 5,
		Notes: ''
	  },
	  {
		page: 'Risk Parameters',
		level: 'County',
		name: 'Risk Eight',
		id: 'county__risk_parameters_Risk_8',
		local_url: `${APP_BASE_URL}/api/county/riskparameters/rPAsYicpNxml`,
		url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:f0AIAR5pJ2F.rPAsF4cpNxm&displayProperty=NAME&outputIdScheme=UID`,
		default_period: 'LAST_6_MONTHS',
		default_org_unit: 'HfVjCurKxh2',
		default_org_unit_level: 5,
		Notes: ''
	  },
	  {
		page: 'Risk Parameters',
		level: 'County',
		name: 'Risk Nine',
		id: 'county__risk_parameters_risk_9',
		local_url: `${APP_BASE_URL}/api/county/riskparameters/RRnz4uPHXdl`,
		url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:RRnz4uPHXdl.ACTUAL_REPORTS&displayProperty=NAME&outputIdScheme=UID`,
		default_period: 'LAST_MONTH',
		default_org_unit: 'HfVjCurKxh2',
		default_org_unit_level: 5,
		Notes: ''
	  },
	  {
		page: 'Risk Parameters',
		level: 'County',
		name: 'Risk Ten',
		id: 'county__risk_parameters_Risk_10',
		local_url: `${APP_BASE_URL}/api/county/riskparameters/xKXO1rvSnRh`,
		url: `${DHIS_BASE_API_URL}/analytics.json?dimension=dx:xKXO1rvSnRh&displayProperty=NAME&outputIdScheme=UID`,
		default_period: 'LAST_MONTH',
		default_org_unit: 'HfVjCurKxh2',
		default_org_unit_level: 5,
		Notes: ''
	  },
	
  ];

  module.exports = m_al
