/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import s from '../../styles/public_portal/timelin_comp.module.css'
import Select from 'react-select'
import { convertObjToSelectData, formatDate, removeSpacesAndSpecialChars, timeToAgo, toggleMonthAndDay } from '../../helpers/functions'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'

function timeline({ data, days, venues }) {
  const router = useRouter()
  const [tl_data, setTl_data] = useState(data)

  const programsOpts = data.map((item) => {
    return { value: item['code'], label: `${item['name']} - ${item['category']} - ${item['code']}` }
  })
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
    else setTl_data(data.filter((item) => item.venue?.toLowerCase() === e.value.toLowerCase()))
  }

  useEffect(() => {
    setTl_data(data)
  }, [data])
  useEffect(() => {
    console.log(days)
    console.log(data)
  }, [])
  
  return (
    <div className={s.container}>
      <div className={s.filterArea}>
        <div style={{ display: 'flex', flex: '1', width: '100%', maxWidth: '40rem' }}>
          <img className={s.filterIco} src="/assets/png/filter.png" alt="" width={20} />
          <Select onChange={(e) => handleDayChange(e)} isSearchable={false} options={convertObjToSelectData(days, 'day', 'day')} className={s.daySelect} placeholder='Day' >lskdf</Select>
          <Select onChange={(e) => handleVenueChange(e)} isSearchable={false} options={
            [
              { value: 'All', label: 'All' },
              ...convertObjToSelectData(venues, 'venue', 'venue')]
          } className={s.venSelect} placeholder='Venue'></Select>
        </div>


        <Select onChange={(e) => handleProgramChange(e)} placeholder='Program' options={programsOpts} className={s.prgrmSelect}>lskdf</Select>
      </div>
      <div className={s.scrollable}>
        <div className={s.timelineArea}>
          {days.map((day, i) => (
            <div className={s.daySchedule} key={i}>
              <div className={s.dayHead} id={removeSpacesAndSpecialChars(day.day)}>
                <h2>{day.day}:  {formatDate(day.date, false)}</h2>
              </div>
              <div className={s.dayTimelineBody}>
                <div className={s.tlStartLine}></div>
                {
                  tl_data.filter(prgrm => prgrm.date == day.date).map((program, i) => {
                    const venueType = venues.filter(ven => ven.name.toLowerCase() === program.venue.toLowerCase())[0]?.type
                    return (
                      <div className={s.card} key={i} id={program.code}>
                        <div>
                          <div className={s.tlNode}></div>
                          <div className={s.tlLine}></div>
                        </div>
                        <div className={s.content}>
                          <div className={s.timeAndVenue}>
                            <h3>{program.s_time} - {program.e_time}</h3>
                            <h4 className={s.venue} style={{ backgroundColor: venueType == 'non-stage' ? '#46223bb3' : '' }}>{program.venue}</h4>
                          </div>
                          <div className={s.subCard}>
                            <h4 className={s.prName}>{program.name}</h4>
                            <h4 className={s.prCat}>{program.category}</h4>
                            <p style={{ lineHeight: '0', marginTop: '3rem' }}>{program.date.replace(' 00:00:00','') }</p>
                            <p>{timeToAgo(program.date.replace(' 00:00:00','') + " " + program.s_time)}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })
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
