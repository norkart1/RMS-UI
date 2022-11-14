import React from 'react'
import { useRef } from 'react'
import { printElement } from '../../helpers/functions'

function Data_table({ children, id, heads, width = "auto", style = {} }) {

  // Render the UI for your table

  const tableRef = useRef(null)
  return (
    <div>
      <div style={{ display: 'flex', position: 'sticky', top: '0', backgroundColor: 'white', opacity: '.7' }}>

        <button
          style={{ backgroundColor: 'white', padding: '.4rem 1rem', borderRadius: '.4rem', margin: '1rem 1rem 1rem auto', cursor: 'pointer' }}
          onClick={() => {printElement(id)} }
        >Print
        </button>
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