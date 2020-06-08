import React, { useContext, useState, useEffect, createContext } from 'react';
export const StockedDataContext = createContext();

function StockedDataProvider(props) {
  const [dx, setDx] = useState([]);
  const [org_units, setorg_units] = useState([]);
  const [orgid, setorgid] = useState(['loading']);
  const [rows, setrows] = useState([]);
  const [ouNames, setOuNames] = useState([]);
  const [allrows, setallRows] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [rawData, setrawData] = useState(['loading']);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    generatedata();
  }, [orgid]);

  useEffect(() => {
    manipulateRows();
  }, [rows]);

  

  const fetchData = async () => {
    const response = await fetch('https://json.link/rGt88Ev4v4.json');
    const data = await response.json();
    setrawData(await data);
    setDx(await data.metaData.dimensions.dx);
    console.log('This here is the raw data', await data);
    setorg_units(await data.metaData.dimensions.ou);
    setrows(await data.rows.sort());
    console.log(await data.rows.sort());
    setorgid(await data.metaData.dimensions.ou);
    console.log(await data.metaData.items['U7iDcDvVGzd'].name);
  };

  const manipulateRows = () => {
    let myAllRows = [];
    rows.map(row => {
      myAllRows = [...myAllRows, row];

    });

    setallRows(myAllRows);
  };

  const generatedata = () => {
    let myData = [];
    setOuNames(
      org_units.map(org_unit => {
        return findou(org_unit);
      })
    );
  };
  const findou = ouid => {
    const orgunitname = rawData.metaData.items[ouid].name;
    const foundous = allrows.find(allrow => allrow[1] === ouid);
    return orgunitname;
  };

  return (
    <StockedDataContext.Provider
      value={{ allrows, dx, orgid, tableData, org_units, rawData }}>
      {props.children}
    </StockedDataContext.Provider>
  );
}

export default StockedDataProvider;
