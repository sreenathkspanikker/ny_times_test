/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { topNewsAction, filterAction } from '../../redux';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'antd';

export const TopNews = ({ filter }) => {
    const [current, setCurrent] = useState(1);
    const [pageData, setPagedata] = useState([]);
    const [listData, setListData] = useState([]);
    const [isFilter, setFilter] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // get redux store
    const data = {
        topNews: useSelector(state => state.topNews?.data?.data),
        filterData: useSelector(state => state.filterData?.data?.data),
    }

    useEffect(() => {
        if (listData?.length > 0) {
            onChange(current, 10)
        }
    }, [listData])

    useEffect(() => {
        dispatch(topNewsAction())
    }, [dispatch]);

    useEffect(() => {
        if (data?.filterData?.response?.docs !== undefined && isFilter) {
            setListData(data?.filterData?.response?.docs);
        } else {
            setListData(data?.topNews?.results)
        }
    }, [data, isFilter])

    useEffect(() => {
        if (filter?.length > 0) {
            setFilter(true);
            dispatch(filterAction(filter))
        } else {
            setFilter(false);
            setListData(data.topNews);
        }
    }, [filter])

    // pagination onchange
    const onChange = (page, total) => {
        setCurrent(page);
        const res = listData?.slice((current - 1) * total, current * total);
        setPagedata(res)
    };

    // navigate to detail
    const handleClick = (e) => {
        navigate(`/details/:${`${`topNews`}-${e}`}`);
    }

    return (
        <div className='news-list top-news-list'>
            {pageData?.length > 0 ? (
                <>
                    <Row>
                        {pageData?.map((items, idx) => {
                            if (items?.multimedia !== null) {
                                return (
                                    <Col sm={6} md={4} key={idx}>
                                        <Card >
                                            <Card.Img
                                                variant="top"
                                                src={isFilter ? `https://www.nytimes.com/${items?.multimedia[0]?.url}` : items?.multimedia[0]?.url}
                                            />
                                            <Card.Body>
                                                <Card.Title>{items.title}</Card.Title>
                                                <Card.Text>
                                                    {items.abstract}
                                                </Card.Text>
                                                <Button onClick={(e) => handleClick(idx)} variant="primary">Readmore</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            }
                        })}
                    </Row>

                    <Pagination responsive={true} current={current} onChange={onChange} total={listData?.length} />
                </>
            ) : <h3>No data found</h3>}
        </div>
    )
}
