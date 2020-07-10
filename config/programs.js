let DHIS_BASE_API_URL = process.env.REACT_APP_DHIS_BASE_API_URL
let APP_BASE_URL = process.env.REACT_APP_APP_BASE_URL || "http://41.89.94.99:3000"
let programs = []
const {m_al, f_p, t_b, h_iv} = require('./endpoints')

const getPages = (end_points)=>{
	let pages = [
		{
		  "page": "Dashboard",
		  "level": "Dashboard",
		  "name": "Stock Status",
		  "id": "all__dashboard",
		  "route": `/dashboard`,
		  "endpoints": end_points.filter(pg=>pg.page=="Dashboard"),
		  "Notes": ""
		},
		{
		  "page": "Stock status",
		  "level": "County",
		  "name": "Commodity-specific",
		  "id": "county__commodity_specific",
		  "route": `/ss/commodity`,
		  "endpoints": end_points.filter(pg=>pg.page=="Stock status"),
		  "Notes": ""
		},
		{
		  "page": "Stock status",
		  "level": "County",
		  "name": "All commodities",
		  "id": "county__all_commodities",
		  "route": `/ss/all`,
		  "endpoints": end_points.filter(pg=>pg.page=="Stock status all"),
		  "Notes": ""
		},
		{
		  "page": "Reporting Rate",
		  "level": "County",
		  "name": "Reporting Rate Summary",
		  "id": "county__reporting_rate_trend",
		  "route": `/rr/summary`,
		  "endpoints": end_points.filter(pg=>pg.page=="Reporting Rate"),
		  "periodFilter": "range",
		  "Notes": ""
		},
		{
		  "page": "Reporting Rate",
		  "level": "County",
		  "name": "Facility Reporting Rate",
		  "id": "county__facility_reporting_rate",
		  "route": `/rr/facility`,
		  "endpoints": end_points.filter(pg=>pg.page=="Reporting Rate"),
		  "periodFilter": "range",
		  "Notes": ""
		},
		{
		  "page": "Reporting Rate",
		  "level": "County",
		  "name": "Subcounty Reporting Rate",
		  "id": "county__subcounty_reporting_rate",
		  "route": `/rr/subcounty`,
		  "endpoints": end_points.filter(pg=>pg.page=="Reporting Rate"),
		  "periodFilter": "range",
		  "Notes": ""
		},
		{
		  "page": "Data Quality",
		  "level": "County",
		  "name": "Completeness",
		  "id": "county__dq_completeness",
		  "route": `/dq/completeness`,
		  "endpoints": end_points.filter(pg=>pg.page=="Data Quality"),
		  "periodFilter": "range",
		  "Notes": "Has commodity filter"
		},
		{
		  "page": "Data Quality",
		  "level": "County",
		  "name": "Concordance",
		  "id": "county__dq_concordance",
		  "route": `/dq/concordance`,
		  "endpoints": end_points.filter(pg=>pg.page=="Data Quality"),
		  "Notes": ""
		},
		{
		  "page": "Data Quality",
		  "level": "County",
		  "name": "Consistency",
		  "id": "county__dq_consistency",
		  "route": `/dq/consistency`,
		  "endpoints": end_points.filter(pg=>pg.page=="Data Quality"),
		  "Notes": ""
		},
		{
		  "page": "Data Quality",
		  "level": "County",
		  "name": "Comparison",
		  "id": "county__dq_comparison",
		  "route": `/dq/comparison`,
		  "endpoints": end_points.filter(pg=>pg.page=="Data Quality"),
		  "Notes": ""
		},
		{
		  "page": "Supply Chain Performance",
		  "level": "County",
		  "name": "Indicator Summary",
		  "id": "county__indicator_summary",
		  "route": `/scp/summary`,
		  "endpoints": end_points.filter(pg=>pg.page=="Supply Chain Performance"),
		  "Notes": ""
		},
		{
		  "page": "Supply Chain Performance",
		  "level": "County",
		  "name": "Indicator Trends",
		  "id": "county__indicator_trends",
		  "route": `/scp/trends`,
		  "endpoints": end_points.filter(pg=>pg.page=="Supply Chain Performance"),
		  "Notes": ""
		},
		{
		  "page": "Accountability",
		  "level": "County",
		  "name": "Accountability",
		  "id": "county__accountability",
		  "route": `/accountability`,
		  "endpoints": end_points.filter(pg=>pg.page=="Accountability"),
		  "Notes": ""
		},
		{
		  "page": "Issues vs Receipts",
		  "level": "County",
		  "name": "Issues vs Receipts",
		  "id": "county__issues_vs_receipts",
		  "route": `/issues-receipts`,
		  "endpoints": end_points.filter(pg=>pg.page=="Issues vs Receipts"),
		  "Notes": ""
		},
		{
		  "page": "Health Facility Followup",
		  "level": "County",
		  "name": "Understocked Facilities",
		  "id": "county__understocked_facilities",
		  "route": `/hff/understocked`,
		  "endpoints": end_points.filter(pg=>pg.page=="Health Facility Followup"),
		  "Notes": ""
		},
		{
		  "page": "Health Facility Followup",
		  "level": "County",
		  "name": "Overstocked Facilities",
		  "id": "county__overstocked_facilities",
		  "route": `/hff/overstocked`,
		  "endpoints": end_points.filter(pg=>pg.page=="Health Facility Followup"),
		  "Notes": ""
		},
		{
		  "page": "National Summary",
		  "level": "National",
		  "name": "KEMSA Summary",
		  "id": "national__summary",
		  "route": `/national/summary`,
		  "endpoints": end_points.filter(pg=>pg.page=="National Summary"),
		  "Notes": ""
		},
		{
		  "page": "All Malaria Commodities",
		  "level": "National",
		  "name": "SOH Comparison",
		  "id": "national__soh_comparison",
		  "route": `/national/commodities`,
		  "endpoints": end_points.filter(pg=>pg.page=="All Malaria Commodities"),
		  "Notes": ""
		},
		{
		  "page": "Pending Shipments",
		  "level": "National",
		  "name": "Pending Shipments",
		  "id": "national__pending_shipments",
		  "route": `/national/pending-shipments`,
		  "endpoints": end_points.filter(pg=>pg.page=="Pending Shipments"),
		  "Notes": ""
		},
		{
		  "page": "Issues vs Receipts",
		  "level": "National",
		  "name": "Issues vs Receipts",
		  "id": "national__issues_vs_receipts",
		  "route": `/national/issues-receipts`,
		  "endpoints": end_points.filter(pg=>pg.page=="Issues vs Receipts"),
		  "Notes": ""
		}
	  ]
	return pages
}

// <----malaria
let malaria = {}
malaria.name = "Malaria Programme"
malaria.id = 1
malaria.owner = "DNMP"
malaria.pages = getPages(m_al)
malaria.endpoints = m_al
// malaria----- />

// <----FP
let fp = {}
fp.name = "Family Planning"
fp.id = 2
fp.owner = "FP Department, MoH"
fp.pages = getPages(f_p)
fp.endpoints = f_p
// FP----- />

// <----TB
let tb = {}
tb.name = "Tuberculosis"
tb.id = 3
tb.owner = "TB Department, MoH"
tb.pages = getPages(t_b)
tb.endpoints = t_b
// TB----- />

// <----HIV
let hiv = {}
hiv.name = "HIV"
hiv.id = 4
hiv.owner = "NASCOP, MoH"
hiv.pages = getPages(h_iv)
hiv.endpoints = h_iv
// HIV----- />

programs.push(malaria)
programs.push(fp)
programs.push(hiv)
programs.push(tb)

module.exports = programs
