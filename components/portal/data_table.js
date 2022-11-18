import React from 'react'
import { useRef } from 'react'
import { convertTableToExcel, printElement } from '../../helpers/functions'

function Data_table({ children, id, heads, width = "auto", style = {},showPrint=true,showExcel=true,excelTitle="Sibaq 22 Data" }) {

  // Render the UI for your table

  const tableRef = useRef(null)
  return (
    <div>
      <div style={{ display: 'flex', position: 'sticky', top: '0',direction:'rtl', backgroundColor: 'white', opacity: '.7' }}>

        {showPrint &&<button
          style={{ backgroundColor: 'white', padding: '.4rem 1rem', borderRadius: '.4rem', margin: '1rem 1rem ', cursor: 'pointer' }}
          onClick={() => {printElement(id)} }
        >Print
        </button>}
        {showExcel &&<button
          style={{ backgroundColor: 'white', padding: '.4rem 1rem', borderRadius: '.4rem', margin: '1rem 1rem ', cursor: 'pointer' }}
          onClick={() => { convertTableToExcel(id, excelTitle)} }
        >Download excel
        </button>}
      </div>
      <table id={id} style={style} ref={tableRef} >
        <tbody>
          <tr>
            {heads.map((head, index) => (
              <th key={index}>{head}</th>
            ))}
          </tr>
          {children}
        </tbody>

      </table>
    </div>
  )
}

export default Data_table