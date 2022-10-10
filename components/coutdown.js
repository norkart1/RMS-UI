import styles from "../styles/component/comp_countdown.module.css";

export default function Countdown  ( ){

  var date1 = new Date();
  var targetDate = new Date("12/04/2022");
   
  var diff = targetDate.getTime() - date1.getTime();
  var weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
  var days = Math.floor(diff / (1000 * 3600 * 24) - weeks * 7);
  var hours = Math.floor(diff / (1000 * 3600) - days * 24 - weeks * 7 * 24);

  // let hoursLeft = Math.floor(hours - (days * 24) - (weeks * 7 * 24));
  weeks = weeks < 10 ? "0" + weeks : weeks;
  days = days < 10 ? "0" + days : days;
  hours = hours < 10 ? "0" + hours : hours;
  return(
  <section className={styles.coutdownSection}>
    <h2>SIBAQ 22 FINALE - 22 DEC </h2>
    <span className={styles.countSpans}>
      <div className={`${styles.spans} ${styles.weeks}`}>
        <h3>{weeks}</h3>
        <h2>WEEKS</h2>
      </div>
      <span className={styles.verticalLine}></span>
      <div className={`${styles.spans} ${styles.days}`}>
        <h3>{days}</h3>
        <h2> DAYS</h2>
      </div>
      <span className={styles.verticalLine}></span>
      <div className={`${styles.spans} ${styles.hours}`}>
        <h3>{hours}</h3>
        <h2>HOURS</h2>

      </div>
    </span>
  </section>
  )
}