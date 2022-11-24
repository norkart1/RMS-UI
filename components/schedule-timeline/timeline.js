import React from 'react'
import s from '../../styles/public_portal/timelin_comp.module.css'
import Select from 'react-select'

function timeline({ data }) {
  return (
    <div className={s.container}>
      <div className={s.filterArea}>
        <img className={s.filterIco} src="/assets/png/filter.png" alt="" width={20} />
        <Select className={s.daySelect} placeholder='Day' >lskdf</Select>
        <Select className={s.venSelect} placeholder='Venue'>lskdf</Select>
        <Select placeholder='Program'>lskdf</Select>
      </div>
      <div className={s.scrollable}>
        <div className={s.dateArea}></div>
        <div className={s.timelineArea}>
        </div>
      </div>

    </div>
  )
}

export default timeline
