import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from 'axios';

const chart = ({data1, temperature, setTemperature, tempArray, setTempArray, icon, setIcon, coord, dataset, setDatasets, datasetLine, setDatasetLine, datasetPie, setDatasetPie}) => {
    
    
    const [url, setUrl] = useState('')

    const [next, setNext] = useState(0)
    //const [temp, setTemp] = useState([])
    /* const [datasetLine, setDatasetLine] = useState({
      labels:[],
      datasets:[]
    })
    const [datasetPie, setDatasetPie] = useState({
      labels:[],
      datasets:[]
    }) */
    

    const handleNext = () => {
      setNext(next+1)
    }
    const handleBack = () => {
      console.log(next)
      setNext(next-1)
    }
    useEffect(() => {
        setUrl(`https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&appid=d95c353ff7b97c4333dda1a8c3c999e7`)
    }, [coord])
    useEffect(() => {
      axios({
        method: 'get',  
        url: url })
        .then((res) => {
          console.log(res.data)
          setTemperature([res.data.main.temp - 273.15])
          setTempArray([...tempArray,res.data.main.temp - 273.15])
          setIcon([...icon,res.data.weather[0]])
        })
        .catch((err) => {
          console.log(err);
        });
      },[url])
    
    ChartJS.register(
      CategoryScale,
      LinearScale,
      RadialLinearScale,
      ArcElement,
      BarElement,
      Title,
      LinearScale,
      PointElement,
      LineElement,
      Tooltip,
      Legend
    );

   const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart Temperature ºC',
        },
      },
    };

    useEffect(()=> { 
      if(temperature != 0 ){
        if(data1.length != dataset.datasets.length){
          setDatasets({labels:['Ciudades'], datasets: [...dataset.datasets,
            {
              lat: data1[data1.length-1].lat,
              lon: data1[data1.length-1].lon,            
              label: `${data1[data1.length-1].name} - ${data1[data1.length-1].country}`, 
              data:  temperature,
              backgroundColor: `rgba(${Math.random() * (255 - 0) + 0}, ${Math.random() * (255 - 0) + 0}, ${Math.random() * (255 - 0) + 0}, 0.5)`,
            },
          ],})
        }
      }    
      if(temperature != 0 ){
        //const labels = data1.map((item) => item.name + '-' + item.country);
        setDatasetLine({labels:data1.map((item) => item.name + '-' + item.country), datasets: [
          {
            lat: data1[data1.length-1].lat,
            lon: data1[data1.length-1].lon,
            label: 'Temperaturas ºC',
            data: tempArray,
            borderColor: `rgba(${Math.random() * (255 - 0) + 0}, ${Math.random() * (255 - 0) + 0}, ${Math.random() * (255 - 0) + 0})`,
            backgroundColor: `rgba(${Math.random() * (255 - 0) + 0}, ${Math.random() * (255 - 0) + 0}, ${Math.random() * (255 - 0) + 0}, 0.5)`,
          },         
      ],})
    }
      if(temperature != 0){      
        let backgroundArray = []
        data1.map(() => {
          backgroundArray.push(`rgba(${Math.random() * (255 - 0) + 0}, ${Math.random() * (255 - 0) + 0}, ${Math.random() * (255 - 0) + 0}, 0.5)`)
        }) 
        //const labels = data1.map((item) => item.name + '-' + item.country);
        setDatasetPie({labels:data1.map((item) => item.name + '-' + item.country), datasets: [
          {
            lat: data1[data1.length-1].lat,
            lon: data1[data1.length-1].lon,
            label: 'Temperaturas ºC',
            data: tempArray,
            borderColor: `rgba(${Math.random() * (255 - 0) + 0}, ${Math.random() * (255 - 0) + 0}, ${Math.random() * (255 - 0) + 0})`,
            backgroundColor: backgroundArray,
          },         
      ],})
    }
    
      
    },[temperature,tempArray])



  return (
    <div >
      {next == 0 ? <Bar style={{width:'500px'}} options={options} data={dataset} /> : next == 1 ? <Line style={{width:'500px'}} options={options} data={datasetLine} /> : next == 2 ? <Pie options={options} data={datasetPie}/> : null}
      {next >= 1 ?<button className='btn-back' onClick={handleBack}>Anterior grafica</button>:null}
      {next == 2 ? null : <button className='btn-next' onClick={handleNext}>Siguiente grafica</button> }
      
    </div>
  )
}

export default chart;
