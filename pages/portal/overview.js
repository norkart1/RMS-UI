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
  const [columnDefs, setColumnDefs] = useState([
    { field: 'programCode', filter: true },
    { field: 'programName', filter: true },
    { field: 'chestNO', headerName: 'Chest Number', filter: true },
    { field: 'candidate.name', headerName: 'Candidate', filter: true },
    { field: 'candidate.category.name', headerName: 'Category', filter: true, width: 'fit-content' },
    { field: 'topic', filter: true },
    { field: 'link', filter: true },
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    enableRowGroup: true,
  }));

  const cellClickedListener = useCallback(event => {
    // 
  }, []);

  useEffect(() => {
    baseApi.get(`coordinator/candidate-programs`)
      .then(data => {
        setRowData(data.data.data)
      })
  }, []);

  return (
    <Portal_Layout activeTabName='overview' activeChildTabName='' userType='institute'>
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
          animateRows={true}

        />
      </div>
    </Portal_Layout>
  );
}

export default DisplayCandidates;