import './App.css';
import { useState } from "react";
import { Navbar, Container, Nav, Row, Col, Button, Stack} from 'react-bootstrap';
import shoeData from './data';
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import Detail from './routes/Detail'

function App() {

  let [shoes, setShoes] = useState(shoeData)
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">A Shoe</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => {
              navigate('/')
            }}>Home</Nav.Link>
            <Nav.Link onClick={() => {
              navigate('/detail')
            }}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
        <div className="main-bg"></div>

      <Routes>
        <Route path="/" element={
          <>
            <Container>
              <Row>
                <Stack direction="horizontal" gap={3}>
                  <div className="bg-light border ms-auto">
                    <Button variant="dark" onClick={() => {
                      let copyShoeData = [...shoes]
                      copyShoeData.sort((a, b) => {
                        if(a.title < b.title) return -1;
                        if(a.title > b.title) return 1;
                        else return 0;
                      })
                      setShoes(copyShoeData);
                    }}>이름순</Button>
                  </div>
                </Stack>
              </Row>
              <Row>
                {
                  shoes.map((item) => {
                    return (
                      <Shoes item={item} key={item.id}></Shoes>
                    )
                  })
                }
              </Row>
            </Container>
          </>
        } />
        <Route path="/detail/:id" element={<Detail shoes={shoes}/>} />
        <Route path="/*" element={<div>Error Page</div>}></Route>

        {/* Nested Routes
          * 여러 유사한 페이지가 필요 할 때
        */}
        <Route path="/about" element={<About></About>}>
          <Route path="member" element={<div>Member Info</div>}/>
          <Route path="location" element={<div>Location Info</div>}/>
        </Route>

        <Route path="/event" element={<Event></Event>}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>}/>
          <Route path="two" element={<div>생일기념 쿠폰받기</div>}/>
        </Route>
      </Routes>
    </div>
  );
}

const Shoes = (props) => {
  return ( 
    <Col md="4">
      <img src={props.item.image} width="80%" alt="shoeImage"/>
      <h4>{props.item.title}</h4>
      <p>{props.item.content}</p>
      <p>{props.item.price}</p>
    </Col>
  )
}

const About = (props) => {
  return (
    <div>
      <h4>About...</h4>
      {/* <Outlet></Outlet>
        * Nested Routes 구조로 이루어진 Route Component 자리      
      */}
      <Outlet></Outlet>
    </div>
  )
}

const Event = (props) => {
  return (
    <div>
      <h4>Today Event</h4>
      <Outlet></Outlet>
    </div>
  )
}
export default App;
