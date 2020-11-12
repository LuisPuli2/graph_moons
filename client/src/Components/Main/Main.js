import React, { useState, useEffect} from 'react'
import Graph from '../Graph/Graph'
import styles from './Main.module.css'

const ENDPOINT = "http://localhost:4001/";

const getGraphs = (data) => {
  let graphs = []

  data.forEach(element => {
    graphs.push(
      <Graph props={element}/>
    )
  });

  return graphs
}

const Main = () => {
  const [data, setData] = useState([]);
  const [graphs, setGraphs] = useState(null);

  useEffect(() => {
    fetch(ENDPOINT)
      .then(res => res.json())
      .then(
        (result) => {
          setData(result);
        },
        (error) => {
          console.log(error)
        }
      )
  }, [])

  useEffect(() => {
    setGraphs(getGraphs(data))
  }, [data])

  return (
    <div className={styles.MainContainer}>
      {graphs}
    </div>
  )
}


export default Main; 