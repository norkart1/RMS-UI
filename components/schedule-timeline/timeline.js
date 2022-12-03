/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import s from '../../styles/public_portal/timelin_comp.module.css'
import Select from 'react-select'
import { convert24hourTo12hour, convertObjToSelectData, formatDate, orderInChronologicalOrder, removeSpacesAndSpecialChars, timeToAgo, toggleMonthAndDay } from '../../helpers/functions'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'

function timeline({ data, days, venues }) {
  const router = useRouter()
  const [tl_data, setTl_data] = useState(data)

  const categories = [
    { value: "BIDĀYAH", label: "BIDĀYAH" },
    { value: "ŪLĀ", label: "ŪLĀ" },
    { value: "THĀNIYAH", label: "THĀNIYAH" },
    { value: "THĀNAWIYYAH", label: "THĀNAWIYYAH" },
    { value: "ᾹLIYAH", label: "ᾹLIYAH" },
    { value: "KULLIYAH ", label: "KULLIYAH " },
    { value: 'BIDAYA', label: 'N - BIDAYA' },
    { value: 'ULA', label: 'N - ULA' },
    { value: 'THANIYA', label: 'N - THANIYA' },
    { value: 'THANAWIYYA', label: 'N - THANAWIYYA' },
    { value: 'ALIYA', label: 'N - ALIYA' },
    { value: 'KULLIYYA', label: 'N - KULLIYYA' },
  ]

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

  const handleCatChange = (e) => {
    if (e.value === 'All') setTl_data(data)
    else setTl_data(data.filter((item) => item.category?.toLowerCase() === e.value.toLowerCase()))
  }

  useEffect(() => {
    setTl_data(orderInChronologicalOrder(data))
  }, [data])
  useEffect(() => {
  }, [])



  return (
    <div className={s.container}>
      <div className={s.filterArea}>
        <div style={{ display: 'flex', flex: '1', width: '100%' }}>
          <img className={s.filterIco} src="/assets/png/filter.png" alt="" width={20} />
          <Select onChange={(e) => handleDayChange(e)} isSearchable={false} options={convertObjToSelectData(days, 'day', 'day')} className={s.daySelect} placeholder='Day' >lskdf</Select>
          <Select onChange={(e) => handleVenueChange(e)} isSearchable={false} options={
            [
              { value: 'All', label: 'All' },
              ...convertObjToSelectData(venues, 'venue', 'venue')]
          } className={s.venSelect} placeholder='Venue'></Select>
          <Select onChange={(e) => handleCatChange(e)} isSearchable={false} options={[
            { value: 'All', label: 'All' },
            ...categories
          ]} className={s.venSelect} placeholder='Category'></Select>
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
                            <h3>{convert24hourTo12hour(program.s_time)} - {convert24hourTo12hour(program.e_time)}</h3>
                            <h4 className={s.venue} style={{ backgroundColor: venueType == 'non-stage' ? '#46223bb3' : '' }}>{program.venue}</h4>
                          </div>
                          <div className={s.subCard}>
                            <h4 className={s.prName}>{program.name}</h4>
                            <h4 className={s.prCat}>{program.code[0] == 'N' ? 'NIICS '+ program.category: program.category}</h4>
                            <p style={{ lineHeight: '0', marginTop: '3rem' }}>{formatDate(program.date.replace(' 00:00:00', ''))}</p>
                            <p>{timeToAgo(program.date.replace(' 00:00:00', '') + " " + program.s_time)}</p>
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
