import React from 'react'
import Donut from '../Donut/Donut'
import styles from './Graph.module.css'

// Return the proportional value of a respect to b
const getPercentage = (a, b) => {
  return a*100/b;
}

const format = (number) => {
  return new Intl.NumberFormat("de-DE").format(number);
}

const Graph = ({props}) => {
  const {
    number1,
    number2,
    numberColor1,
    numberColor2,
    title,
    titleColor,
    totalColor,
    strokeColor,
    posfix,
    values,
  } = props;

  const total = number1 + number2

  return (
    <div className={styles.GraphContainer}>
      <div className={styles.donutContainer}>
        <Donut 
          width={200}
          height={200}
          number1={number1}
          number2={number2}
          numberColor1={numberColor1}
          numberColor2={numberColor2}
          totalNumber={total}
          title={title}
          totalText={format(total) + posfix}
          titleColor={titleColor}
          totalColor={totalColor}
          donutWidth={10}
          strokeColor={strokeColor}
          values={values}
        />
      </div>
      <div className={styles.textContainer}>
        <p className={styles.leftPagraph} style={{color: numberColor2}} >Tablet</p>
        <p className={styles.rightPagraph} style={{color: numberColor1}} >Smartphone</p>
      </div>
      <div className={styles.textContainer}>
        <p className={styles.leftPagraph}>
          <b className={styles.percentage}>{getPercentage(number2, total)}%</b>
          {format(number2)}
        </p>
        <p className={styles.rightPagraph}>
          <b className={styles.percentage}>{getPercentage(number1, total)}%</b>
          {format(number1)}
        </p>
      </div>
    </div>
  )
}


export default Graph