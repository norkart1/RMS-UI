import React from 'react'
 
function Data_table({ children, id, heads, }) {

  // Render the UI for your table
  return (
    <table id={id}>
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