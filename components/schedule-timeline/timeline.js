import React from 'react'
import s from '../../styles/public_portal/timelin_comp.module.css'
import Select from 'react-select'
import { convertObjToSelectData, formatDate, removeSpacesAndSpecialChars, timeToAgo, toggleMonthAndDay } from '../../helpers/functions'
import { useRouter } from 'next/router'
import { useState } from 'react'

function timeline({ data, days, venues }) {
  const router = useRouter()
  const [tl_data, setTl_data] = useState(data)

  const programsOpts = convertObjToSelectData(data, 'code', 'name')
  const handleDayChange = (e) => {
    const id = removeSpacesAndSpecialChars(e.value)
    router.push('#' + id)
  }
  const handleProgramChange = (e) => {
    const id = removeSpacesAndSpecialChars(e.value)
    router.push('#' + id)
  }
  const handleVenueChange = (e) => {
    if (e.value === 'All') setTl_data(data)
    else setTl_data(data.filter((item) => item.venue === e.value))
  }
  return (
    <div className={s.container}>
      <div className={s.filterArea}>
        <img className={s.filterIco} src="/assets/png/filter.png" alt="" width={20} />
        <Select onChange={(e) => handleDayChange(e)} options={convertObjToSelectData(days, 'day', 'day')} className={s.daySelect} placeholder='Day' >lskdf</Select>
        <Select onChange={(e) => handleVenueChange(e)} options={
          [
            { value: 'All', label: 'All' },
            ...convertObjToSelectData(venues, 'venue', 'venue')]
        } className={s.venSelect} placeholder='Venue'>lskdf</Select>
        <Select onChange={(e) => handleProgramChange(e)} placeholder='Program' options={programsOpts}>lskdf</Select>
      </div>
      <div className={s.scrollable}>
        <div className={s.timelineArea}>
          {days.map((day, i) => (
            <div className={s.daySchedule} key={i}>
              <div className={s.dayHead} id={removeSpacesAndSpecialChars(day.day)}>
                <h2>{day.day}:  {formatDate(day.date)}</h2>
              </div>
              <div className={s.dayTimelineBody}>
                <div className={s.tlStartLine}></div>
                {
                  tl_data.filter(prgrm => prgrm.date === day.date).map((program, i) => (
                    <div className={s.card} key={i} id={program.code}>
                      <div>
                        <div className={s.tlNode}></div>
                        <div className={s.tlLine}></div>
                      </div>
                      <div className={s.content}>
                        <div className={s.timeAndVenue}>
                          <h3>{program.s_time} - {program.e_time}</h3>
                          <h4 className={s.venue}>{program.venue}</h4>
                        </div>
                        <h4 className={s.prName}>{program.name}</h4>
                        <h4 className={s.prCat}>{program.category}</h4>
                        <p>{timeToAgo(toggleMonthAndDay(program.date) + " " + program.s_time)}</p>
                        <div className={s.line}></div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  )
}

export default timeline
