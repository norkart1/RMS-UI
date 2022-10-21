import styles from "../styles/component/comp_countdown.module.css";
import { useEffect, useState } from "react";

export default function Countdown() {

  var targetDate = new Date("12/04/2022");
  useEffect(() => {
    setInterval(() => {
      var date1 = new Date();
      var diff = targetDate.getTime() - date1.getTime();
      // var weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
      var days = Math.floor(diff / (1000 * 3600 * 24));
      var hours = Math.floor(diff / (1000 * 3600) - days * 24);
      var minutes = Math.floor(diff / (1000 * 60) - hours * 60 - days * 24 * 60);
      var seconds = Math.floor(diff / (1000) - minutes * 60 - hours * 60 * 60 - days * 24 * 60 * 60);

      // weeks = weeks < 10 ? "0" + weeks : weeks;
      days = days < 10 ? "0" + days : days;
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      // setWeeks(weeks);
      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }, 1000);
  }, []);


  // const [weeks, setWeeks] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);



  return (

    <section className={styles.coutdownSection}>
      <h2>SIBAQ 22 FINALE - 04 DEC </h2>
      <span className={styles.countSpans}>

        <div className={`${styles.spans} ${styles.days}`}>
          <h3>{days}</h3>
          <h2> DAYS</h2>
        </div>
        <span className={styles.verticalLine}></span>
        <div className={`${styles.spans} ${styles.hours}`}>
          <h3>{hours}</h3>
          <h2>HOURS</h2>

        </div>
        <span className={styles.verticalLine}></span>
        <div className={`${styles.spans} ${styles.hours}`}>
          <h3>{minutes}</h3>
          <h2>MINUTES</h2>

        </div>
        <span className={styles.verticalLine}></span>
        <div className={`${styles.spans} ${styles.hours}`}>
          <h3>{seconds}</h3>
          <h2>SECONDS</h2>

        </div>
      </span>
    </section>
  )
}
