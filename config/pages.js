let DHIS_BASE_API_URL = process.env.DHIS_BASE_API_URL
let APP_BASE_URL = process.env.APP_BASE_URL || "http://41.89.94.99:3000"
const endpoints = require('./endpoints')
let pages = [
  {
    "page": "Dashboard",
    "level": "All",
    "name": "Stock Status",
	"id": "all__dashboard",
	"url": `${APP_BASE_URL}/api/dashboard`,
    "Notes": ""
  }

  {
    "page": "Stock status",
    "level": "County",
    "name": "Artemether Lumefantrine (AL)",
    "id": "county__artemether_lumefantrine",
    "url": `${APP_BASE_URL}/api/county/stockstatus/al`,
    "Notes": ""
  },
  {
    "page": "Stock status",
    "level": "County",
    "name": "Artesunate Injection (AS)",
    "id": "county__artesunate_injection",
    "url": `${APP_BASE_URL}/api/county/stockstatus/as`,
    "Notes": ""
  },
  {
    "page": "Stock status",
    "level": "County",
    "name": "Sulphadoxine Pyrimethamine (SP)",
    "id": "county__sulphadoxine_pyrimethamine",
    "url": `${APP_BASE_URL}/api/county/stockstatus/sp`,
    "Notes": ""
  },
  {
    "page": "Stock status",
    "level": "County",
    "name": "Rapid Diagnostic Tests (RDT)",
    "id": "county__rapid_diagnostic_tests",
    "url": `${APP_BASE_URL}/api/county/stockstatus/rdt`,
    "Notes": ""
  },
  {
    "page": "Stock status all",
    "level": "County",
    "name": "All commodities",
    "id": "county__all_commodities",
    "url": `${APP_BASE_URL}/api/county/stockstatus/all`,
    "Notes": ""
  },
  {
    "page": "Reporting Rate",
    "level": "County",
    "name": "Reporting Rate Trend",
	"id": "county__reporting_rate_trend",
	"url": `${APP_BASE_URL}/api/county/reportingrate/trend`,
    "Notes": ""
  },
  {
  "page" : "Reporting Rate",
  "level" :  "County",
  "name" : "Reporting Rate Trend (latest subcounty)",
  "id" : "county__latest_reporting_rate_subcounty",
  "url": `${APP_BASE_URL}/api/county/reportingrate/latesttrend`,
  "Notes" : ""
  
  },
  {
    "page": "Reporting Rate",
    "level": "County",
    "name": "Facility Reporting Rate",
	"id": "county__facility_reporting_rate",
	"url": `${APP_BASE_URL}/api/county/reportingrate/facility`,
    "Notes": ""
  },
  {
    "page": "Reporting Rate",
    "level": "County",
    "name": "Subcounty Reporting Rate",
	"id": "county__subcounty_reporting_rate",
	"url": `${APP_BASE_URL}/api/county/reportingrate/subcounty`,
    "Notes": ""
  },
  {
    "page": "Data Quality",
    "level": "County",
    "name": "Completeness",
	"id": "county__dq_completeness",
	"url": `${APP_BASE_URL}/api/county/dataquality/completeness`,
    "Notes": "Has commodity filter"
  },
  {
    "page": "Data Quality",
    "level": "County",
    "name": "Concordance",
	"id": "county__dq_concordance",
	"url": `${APP_BASE_URL}/api/county/dataquality/concordance`,
    "Notes": ""
  },
  {
    "page": "Data Quality",
    "level": "County",
    "name": "Consistency",
	"id": "county__dq_consistency",
	"url": `${APP_BASE_URL}/api/county/dataquality/consistency`,
    "Notes": ""
  },
  {
    "page": "Data Quality",
    "level": "County",
    "name": "Comparison",
	"id": "county__dq_comparison",
	"url": `${APP_BASE_URL}/api/county/dataquality/comparison`,
    "Notes": ""
  },
  {
    "page": "Supply Chain Performance",
    "level": "County",
    "name": "Indicator Summary",
	"id": "county__indicator_summary",
	"url": `${APP_BASE_URL}/api/county/supplychain/indicatorsummary`,
    "Notes": ""
  },
  {
    "page": "Supply Chain Performance",
    "level": "County",
    "name": "Indicator Trends",
	"id": "county__indicator_trends",
	"url": `${APP_BASE_URL}/api/county/supplychain/indicatortrends`,
    "Notes": ""
  },
  {
    "page": "Accountability",
    "level": "County",
    "name": "Accountability",
	"id": "county__accountability",
	"url": `${APP_BASE_URL}/api/county/accountability`,
    "Notes": ""
  },
  {
    "page": "Issues vs Receipts",
    "level": "County",
    "name": "Issues vs Receipts",
	"id": "county__issues_vs_receipts",
	"url": `${APP_BASE_URL}/api/county/issuesvsreceipts`,
    "Notes": ""
  },
  {
    "page": "Health Facility Followup",
    "level": "County",
    "name": "Understocked Facilities",
	"id": "county__understocked_facilities",
	"url": `${APP_BASE_URL}/api/county/hhfollowup/understocked`,
    "Notes": ""
  },
  {
    "page": "Health Facility Followup",
    "level": "County",
    "name": "Overstocked Facilities",
	"id": "county__overstocked_facilities",
	"url": `${APP_BASE_URL}/api/county/hhfollowup/overstocked`,
    "Notes": ""
  },
  {
    "page": "National Summary",
    "level": "National",
    "name": "KEMSA Summary",
	"id": "national__summary",
	"url": `${APP_BASE_URL}/api/national/summary`,
    "Notes": ""
  },
  {
    "page": "All Malaria Commodities",
    "level": "National",
    "name": "SOH Comparison",
	"id": "national__soh_comparison",
	"url": `${APP_BASE_URL}/api/national/allmalariacommodities`,
    "Notes": ""
  },
  {
    "page": "Pending Shipments",
    "level": "National",
    "name": "Pending Shipments",
	"id": "national__pending_shipments",
	"url": `${APP_BASE_URL}/api/national/pendingshipment`,
    "Notes": ""
  },
  {
    "page": "Issues vs Receipts",
    "level": "National",
    "name": "Issues vs Receipts",
	"id": "national__issues_vs_receipts",
	"url": `${APP_BASE_URL}/api/national/issuesvsreceipts`,
    "Notes": ""
  }
]

module.exports = pages
