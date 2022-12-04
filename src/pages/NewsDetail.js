import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { Layout } from '../components'
import { Button, Image } from 'react-bootstrap';

export const NewsDetail = (props) => {
  const [details, setDetils] = useState([]);
  const navigate = useNavigate();
  let { slug } = useParams();

  const data = {
    topNews: useSelector(state => state.topNews?.data?.data?.results),
    worldNews: useSelector(state => state.worldNews?.data?.data?.results),
    scienceNews: useSelector(state => state.scienceNews?.data?.data?.results),
  }

  useEffect(() => {
    const slugFilter = slug.split('-');
    console.log('data', data);
    
    switch (slugFilter[0]) {
      case ':topNews':
        data?.topNews?.map((data, idx) => {
          if (idx === parseInt(slugFilter[1])) {
            setDetils(data)
          }
        })
        break;
      case ':worldNews':
        data?.worldNews?.map((data, idx) => {
          if (idx === parseInt(slugFilter[1])) {
            setDetils(data)
          }
        })
        break;
      case ':scienceNews':
        data?.scienceNews?.map((data, idx) => {
          if (idx === parseInt(slugFilter[1])) {
            setDetils(data)
          }
        })
        break;
    
      default:
        break;
    }

  }, [])

  return (
    <Layout className='news-details'>
      <div className='news-detail-item'>
        <Button variant="primary" onClick={() => navigate(-1)}>Back</Button>
        <h1>{details?.title}</h1>
        {details?.multimedia?.length > 0 && <Image src={details?.multimedia[0]?.url} fluid />}
        <p><small>{details?.published_date}</small>{details?.abstract}</p>
      </div>
    </Layout>
  )
}
