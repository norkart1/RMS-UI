import React from 'react'
 
function Data_table({ children, id, heads, width="auto", style = {}}) {

  // Render the UI for your table
  return (
    <table id={id} style={style} >
      <tbody>
        <tr>
          {heads.map((head, index) => (
            <th key={index}>{head}</th>
          ))}
        </tr>
        {children}
      </tbody>

    </table>
  )
}

export default Data_table