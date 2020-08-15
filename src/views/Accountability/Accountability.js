import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {
  filterUrlConstructor,
  justFetch
} from '../../common/utils';
import { programs } from 'hcd-config';
import Toolbar from 'components/Toolbar/Toolbar';
import ALTable from './components/Table/AccTable';

const activProgId = parseFloat(localStorage.getItem('program')) || 1;
const activProg = programs.filter(pr => pr.id == activProgId)[0];
const paige = activProg.pages.filter(ep => ep.page == 'Accountability')[0];
const periodFilterType = paige.periodFilter;
const endpoints = paige.endpoints;

const abortRequests = new AbortController();

const queryString = require('query-string');
const useStyles = makeStyles(theme => ({
  root: { padding: theme.spacing(3) },
  content: { marginTop: theme.spacing(1) },
  gridchild: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

const Accountability = props => {
  const classes = useStyles();

  let filter_params = queryString.parse(props.location.hash);
  if (
    filter_params.pe &&
    filter_params.pe.search(';') > 0 &&
    periodFilterType != 'range'
  ) {
    filter_params.pe = 'LAST_MONTH';
  }
  let [url, setUrl] = useState(
    filterUrlConstructor(
      filter_params.pe,
      filter_params.ou,
      filter_params.level,
      endpoints[0].local_url
    )
  );
  const [accdata, setAccData] = useState([['Loading...']]);
  const [prd, setPrd] = useState(null);
  const [oun, setOun] = useState(null);
  const [loading, setLoading] = useState(true);
  const [oulvl, setOulvl] = useState(null);
  const [err, setErr] = useState({ error: false, msg: '' });
  let title = `Accountability`;

  const updateData = (rws, priod, ogu, levl) => {
    setAccData(rws);
    // setPrd(priod)
    // setOun(ogu)
    // setOulvl(levl)
  };

  
//////// CUSTOM FXNs \\\\\\\\\\\\\\\\\\\\\\\\
const filterItems = (array, query) => {
    return array.filter(function (el) {
        return el.indexOf(query) > -1;
    });
};
const sumArr = (array) => {
    let sum_total = 0;
    if (array == null || array == undefined) {
        array = [0];
    }
    array.map((val) => {
        if (val == null || val == undefined) {
            val = 0;
        }
        sum_total += parseFloat(val);
    });
    return sum_total;
};
//////// CUSTOM FXNs \\\\\\\\\\\\\\\\\\\\\\\\


  let fetchAcc = async the_url => {
	setLoading(true);
	setErr({ error: false, msg: '' });
    setAccData([['Loading...']]);
    try {
    //   fetch(the_url, { signal: abortRequests.signal })
      justFetch(the_url, { signal: abortRequests.signal })
        // .then(s_p => s_p.json())
        .then(reply => {
		  if (reply.fetchedData.error) {
			setLoading(false)
			setErr({
              error: true,
              msg: reply.fetchedData.message,
              ...reply.fetchedData
            });
          } else {
            setErr({ error: false, msg: '' });
			/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			/// ~~~~~~~~~~~~~~~~~~~~~~ <SUCCESS ~~~~~~~~~~~~~~~~~~~~~~~~~~
			/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			let tableData = [];
			let thedx = reply.fetchedData.metaData.dimensions.dx;
			let therows = reply.fetchedData.rows;
			let commodities_arr = thedx.splice(21, 7);
			let commodities_ki_arr = thedx.splice(14, 7);

			let commodities_id_arr0 = [];
			let commodities_id_ki_arr0 = [];
			let commodities_id_arr = [];
			let commodities_id_ki_arr = [];
			let commodities_name_arr = [];
			commodities_arr.map((co_ar) => {
				commodities_id_arr0 = co_ar.split(".", 2);
				commodities_id_arr.push(commodities_id_arr0[0]);
			});

			commodities_ki_arr.map((co_ki_ar) => {
				commodities_id_ki_arr0 = co_ki_ar.split(".", 1);
				commodities_id_ki_arr.push(commodities_id_ki_arr0);
			});
			commodities_arr.map((coid) => {
				commodities_name_arr.push(
					reply.fetchedData.metaData.items[coid].name.substring(
						0,
						reply.fetchedData.metaData.items[coid].name.length - 26
					)
				);
			});

			reply.fetchedData.metaData.dimensions.ou.map((ou, ou_ix) => {
				let tdata = [];
				let ki_cells = [];
				let rows_filtered_ou = filterItems(therows, ou);
				let opsoh_arr = [];
				let posadj_arr = [];
				let kemsi_arr = [];
				let qtydisp_arr = [];
				let negadj_arr = [];
				let kissue_arr = [];
				let closbal_arr = [];
				let pcacc_arr = [];
				let letiance_arr = [];

				commodities_ki_arr.map((one_ki) => {
					let filt_rows = filterItems(rows_filtered_ou, one_ki);
					if (filt_rows == undefined) {
						filt_rows = [["", "", "", "0.0"]];
						ki_cells.push("0.0");
					} else {
						if (filt_rows[0] == undefined) {
							ki_cells.push("0.0");
						} else {
							ki_cells.push(filt_rows[0][3]);
						}
					}
				});

				commodities_id_arr.map((cidarr, cid_inx) => {
					let trow = []
					let rows_filtered_ou_commo1 = filterItems( rows_filtered_ou, cidarr + ".HWtHCLAwprR" );
					let rows_filtered_ou_commo2 = filterItems( rows_filtered_ou, cidarr + ".CckV73xy6HB" );
					let rows_filtered_ou_commo3 = filterItems( rows_filtered_ou, cidarr + ".w77uMi1KzOH" );
					let rows_filtered_ou_commo4 = filterItems( rows_filtered_ou, cidarr + ".unVIt2C0cdW" );
					let rows_filtered_ou_commo5 = filterItems( rows_filtered_ou, cidarr + ".rPAsF4cpNxm" );
					let rows_filtered_ou_commo6 = filterItems( rows_filtered_ou, cidarr + ".yuvCdaFqdCW" );
					trow.push(reply.fetchedData.metaData.items[ou].name)
					trow.push(commodities_name_arr[cid_inx])
					// ----------data cells----------
					let opsoh = filterItems( rows_filtered_ou_commo1, cidarr + ".HWtHCLAwprR" )[0];
					if (opsoh == undefined) { opsoh = [0, 0, 0, 0]; }
					opsoh_arr.push(opsoh[3]);
					trow.push(parseFloat(opsoh[3]).toFixed(1))
				
					let posadj = filterItems( rows_filtered_ou_commo2, cidarr + ".CckV73xy6HB"
					)[0];
					if (posadj == undefined) { posadj = [0, 0, 0, 0]; }
					trow.push(parseFloat(posadj[3]).toFixed(1))
					posadj_arr.push(posadj[3]);
				
					//Quantity received this period
					let qtyrec = filterItems( rows_filtered_ou_commo6, cidarr + ".yuvCdaFqdCW" )[0];
					if (qtyrec == undefined) { qtyrec = [0, 0, 0, 0]; }
					kemsi_arr.push(qtyrec[3]);
					trow.push(parseFloat(qtyrec[3]).toFixed(1))
					//end qty received
				
					let qtydisp = filterItems( rows_filtered_ou_commo3, cidarr + ".w77uMi1KzOH" )[0];
					if (qtydisp == undefined) { qtydisp = [0, 0, 0, 0]; }
					qtydisp_arr.push(qtydisp[3]);
					trow.push(parseFloat(qtydisp[3]).toFixed(1))
				
					let negadj = filterItems( rows_filtered_ou_commo4, cidarr + ".unVIt2C0cdW" )[0];
					if (negadj == undefined) { negadj = [0, 0, 0, 0]; }
					negadj_arr.push(negadj[3]);
					trow.push(parseFloat(negadj[3]).toFixed(1))
				
					let closbal = filterItems( rows_filtered_ou_commo5, cidarr + ".rPAsF4cpNxm"
					)[0];
					if (closbal == undefined) { closbal = [0, 0, 0, 0]; }
					closbal_arr.push(closbal[3]);
					trow.push(parseFloat(closbal[3]).toFixed(1))
				
					let kiar = [];
					// kiar = getPerc();
				
					let k_is_val = parseFloat(kiar[cid_inx]);
					if (Number.isNaN(k_is_val)) {
						k_is_val = 0;
					} else {
						k_is_val = parseFloat(kiar[cid_inx]);
					}
				
					let sum_pos = parseFloat(opsoh[3]) + parseFloat(posadj[3]) + parseFloat(qtyrec[3]);
					let sum_neg = parseFloat(qtydisp[3]) + parseFloat(negadj[3]) + parseFloat(closbal[3]);
					let per_acc_for = parseFloat(sum_neg) / parseFloat(sum_pos);
					per_acc_for = per_acc_for * 100;
				
					let expected =
						sum_pos - (parseFloat(qtydisp[3]) + parseFloat(negadj[3]));
					let letiance = expected - parseFloat(closbal[3]);
					letiance_arr.push(letiance.toFixed(1));
				
					trow.push(letiance.toFixed(1))
				
					let n_cell;
					let bgcolor = "#ff0000";
					let fcolor = "#202020";
					if (per_acc_for >= 95 && per_acc_for <= 105) {
						n_cell = (
							<>
							{per_acc_for.toFixed(1)}%
							<span className="cell-fill cell-green" aria-hidden="true" tabIndex="-1"> &nbsp;
							</span>
							</>
						);
					} else {
						n_cell = (
							<>
							{per_acc_for.toFixed(1)}%
							<span className="cell-fill cell-darkred fcwhite" aria-hidden="true" tabIndex="-1"> &nbsp;
							</span>
							</>
						);
					}
					if (isNaN(per_acc_for)) {
						trow.push("-")
					} else {
						trow.push(n_cell)
					}
					pcacc_arr.push(per_acc_for);
					// ----------END data cells----------
				
					tdata.push(trow);
					tableData.push(trow);
				});
				
				// tdata += '<tr class="text-bold fcblack">';
				// tdata +=
				//     '<td class="text-caps">' +
				//     data.metaData.items[ou].name +
				//     " Total</td>";
				// tdata += "<td> - </td>";
				// tdata += '<td class="text-right" id="' + ou + '_totalOpeningSOH"></td>';
				// tdata += '<td class="text-right" id="' + ou + '_totalPveAdj"></td>';
				// tdata += '<td class="text-right" id="' + ou + '_totalKEMSAIssues"></td>';
				// tdata += '<td class="text-right" id="' + ou + '_totalQtyDisp"></td>';
				// tdata += '<td class="text-right" id="' + ou + '_totalNveAdj"></td>';
				// tdata += '<td class="text-right" id="' + ou + '_totalClosingSOH"></td>';
				// tdata += '<td class="text-right" id="' + ou + '_totalletiance"></td>';
				// tdata += '<td class="text-right" id="' + ou + '_totalPcAccounted"></td>';
				// tdata += "</tr>";
				
				// $("#acc_table tbody").append(tdata);

				let o_gu;
				if (filter_params.ou) {
					o_gu = filter_params.ou;
				} else {
					o_gu = '';
				}

				commodities_id_ki_arr.map((com_ki, comki_indx) => {
					let kione_val = filterItems(rows_filtered_ou, com_ki[0]);
					if (
						kione_val[0] == undefined ||
						kione_val == undefined ||
						kione_val == null ||
						kione_val == ""
					) {
						kione_val = [0, 0, 0, 0];
					}
					let kione_value
					if (typeof kione_val[0] == "number") {
						kione_value = kione_val[3];
					} else if (
						typeof kione_val[0] == "array" ||
						typeof kione_val[0] == "object"
					) {
						kione_value = kione_val[0][3];
					}
					let kione_id2 = ou + "_ki_cell_" + comki_indx;
					// $("#" + kione_id2).html(kione_value);
				});

				const getPerc = () => {
					return kissue_arr;
				}
				// $("#" + ou + "_totalOpeningSOH").html(sumArr(opsoh_arr));
				// $("#" + ou + "_totalPveAdj").html(sumArr(posadj_arr));
				// $("#" + ou + "_totalKEMSAIssues").html(sumArr(kemsi_arr));
				// $("#" + ou + "_totalQtyDisp").html(sumArr(qtydisp_arr));
				// $("#" + ou + "_totalNveAdj").html(sumArr(negadj_arr));
				// $("#" + ou + "_totalClosingSOH").html(sumArr(closbal_arr));
				// $("#" + ou + "_totalletiance").html(sumArr(letiance_arr).toFixed(1));

				// let tot_neg =
				//     sumArr(closbal_arr) + sumArr(negadj_arr) + sumArr(qtydisp_arr);
				// let tot_pos =
				//     sumArr(opsoh_arr) + sumArr(posadj_arr) + sumArr(kemsi_arr);
				// let tot_acc = (tot_neg / tot_pos) * 100;

				// let bgcolor = "#ff0000";
				// if (tot_acc >= 95 && tot_acc <= 105) {
				//     bgcolor = "#7bd48d";
				// } else {
				//     bgcolor = "#ff0000";
				// }
				// $("#" + ou + "_totalPcAccounted").css("background-color", bgcolor);
				// $("#" + ou + "_totalPcAccounted").html(tot_acc.toFixed(1));
				updateData( tableData, reply.fetchedData.metaData.items[ reply.fetchedData.metaData.dimensions.pe[0] ].name, o_gu, oulvl );
				setLoading(false)
			});

            
			/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			/// ~~~~~~~~~~~~~~~~~~~~~~ SUCCESS/> ~~~~~~~~~~~~~~~~~~~~~~~~~~
			/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          }
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          setErr({ error: true, msg: 'Error fetching data: '+err.message });
        });
    } catch (er) {
      setErr({ error: true, msg: 'Error fetching data', ...er });
    }
  };

  const onUrlChange = base_url => {
    props.history.listen((location, action) => {
      let new_filter_params = queryString.parse(location.hash);
      if (
        new_filter_params.pe != '~' &&
        new_filter_params.pe != '' &&
        new_filter_params.pe != null
      ) {
        setPrd(new_filter_params.pe);
      }
      if (
        new_filter_params.ou != '~' &&
        new_filter_params.ou != '' &&
        new_filter_params.ou != null
      ) {
        setOun(new_filter_params.ou);
      }
      if (
        new_filter_params.level != '~' &&
        new_filter_params.level != '' &&
        new_filter_params.level != null
      ) {
        setOulvl(new_filter_params.level);
      }
      let new_url = filterUrlConstructor(
        new_filter_params.pe,
        new_filter_params.ou,
        new_filter_params.level,
        base_url
      );
      fetchAcc(new_url);
    });
  };

  useEffect(() => {
    fetchAcc(url);
    onUrlChange(endpoints[0].local_url);

    return () => {
      console.log(`Acc: aborting requests...`);
      abortRequests.abort();
    };
  }, []);

  let data = {};
  data.theads = [
    'Org. unit',
    'Item',
    'Opening SOH',
    '+ve adj',
    'Qty received',
    'Qty dispensed',
    '-ve adj',
    'Closing SOH',
    "Variance \n (Expected-Actual)",
    '% accounted for'
  ];
  data.rows = accdata;

  return (
    <div className={classes.root}>
      <Toolbar
        className={classes.gridchild}
        title={title}
        pe={prd}
        ou={oun}
        lvl={oulvl}
        filter_params={filter_params}
      />
      <div className={classes.content}>
        {err.error ? (
          <Alert severity="error">{err.msg}</Alert>
        ) : (
          <ALTable
            pageTitle={title}
            theads={data.theads}
            rows={data.rows}
            loading={loading.toString()}
		  />
        )}
      </div>
    </div>
  );
};

export default Accountability;
