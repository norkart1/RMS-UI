import Portal_Layout from '../../components/portal/portal_Layout';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import baseApi from '../../api/baseApi';
import Input from '../../components/portal/inputTheme'

import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';


const DisplayCandidates = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  const options = [
    { id: 1, name: 'option 1' },
    { id: 2, name: 'option 2' },
    { id: 3, name: 'option 3' },
    { id: 4, name: 'option 4' },
  ]

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "instituteShortName",
      headerName: "Institute",
      filter: true,
    },
    { field: "programCode", filter: true },
    { field: "programName", filter: true },
    { field: "chestNO", headerName: "Chest Number", filter: true },
    { field: "candidateName", headerName: "Candidate", filter: true },
    {
      field: "categoryName",
      headerName: "Category",
      filter: true,
      width: "fit-content",
    },
    // { field: "topic", filter: true },
    // { field: "link", filter: true },
    { field: "postion", headerName: "Position", filter: true },
    { field: "grade", headerName: "Grade", filter: true },
    { field: "point", headerName: "Point", filter: true },
    { field: "finalResultEntered", headerName: "Mark Entered", filter: true },
    {field: "private-published", headerName: "Result Published", filter: true},
    { field: "finalResultPublished", headerName: "Result Announced", filter: true },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    enableRowGroup: true,
  }));                                       

  // Example of consuming Grid Event
  const cellClickedListener = useCallback(event => {
    // 
  }, []);

  // Example load data from sever
  useEffect(() => {
    baseApi.get(`user/final-result/overview/all?sessionID=${localStorage.getItem('sessionID')}`)
      .then(data => {
        setRowData(data.data.data)
        // 
      })
  }, []);
   

  return (
    <Portal_Layout activeTabName='overview' activeChildTabName='' userType='controller'>
      <h1>Overview</h1>
      <span data-theme='hr'></span>
      {/* <Input type='dropdown' dropdownOpts={options} /> */}
      <div className="ag-theme-alpine" style={{ width: '100%', height: '85vh' }}>

        <AgGridReact
          rowGroupPanelShow='always'
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted

        // onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        />
      </div>
    </Portal_Layout>
  );
}

export default DisplayCandidates;