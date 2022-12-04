import React, { useState } from 'react'
import { AutoComplete, Input } from 'antd';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import { Layout, TopNews, World, Science } from '../components';

export const Home = () => {
  const [filter, setFilter] = useState({});
  const [options, setOptions] = useState([]);

  // search values
  const { Search } = Input;
  const onSearch = (value) => {
    setFilter(value);
    if (value !== '') {
      setOptions(prevState => {
        if (prevState.length > 2) {
            return [...prevState].slice(-1)
        } else {
          return [...prevState, {value: value}]
        }
      });
    }
  }

  // reset filter
  const handleSelect = () => setFilter({})

  return (
    <Layout>
      <div className='tab-container'>
        <Tab.Container
          defaultActiveKey="TopNews"
          id="news"
          mountOnEnter={true}
          onSelect={handleSelect}

        >
          <div className='tab-wrap'>
            <Row>
              <Col md={6}>
                <Nav variant="pills" >
                  <Nav.Item>
                    <Nav.Link eventKey="TopNews">Top News</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="World">World</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="Science">Science</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col md={6}>
                <AutoComplete
                  options={options}
                  filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                >
                  <Search placeholder="input search text" backfill={true} onSearch={onSearch} enterButton allowClear />
                </AutoComplete>
              </Col>
            </Row>
          </div>

          {/* TAB CONTENT */}
          <Tab.Content>
            <Tab.Pane eventKey="TopNews">
              <TopNews filter={filter} />
            </Tab.Pane>
            <Tab.Pane eventKey="World">
              <World filter={filter} />
            </Tab.Pane>
            <Tab.Pane eventKey="Science">
              <Science filter={filter} />
            </Tab.Pane>
          </Tab.Content>

        </Tab.Container>
      </div>
    </Layout>
  )
}
