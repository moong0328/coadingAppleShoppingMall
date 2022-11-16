import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import styled from "styled-components";

/*
    Context API 단점
    1. state 변경시 쓸데없는 컴포넌트까지 전부 재렌더링이 되고 
    2. useContext() 를 쓰고 있는 컴포넌트는 나중에 다른 파일에서
       재사용할 때 Context를 import 하는게 귀찮아질 수 있습니다.
    => Redux
*/
/*
    장점1. CSS 파일 오픈할 필요없이 JS 파일에서 바로 스타일넣을 수 있습니다.
    장점2. 여기 적은 스타일이 다른 JS 파일로 오염되지 않습니다. 원래 그냥 CSS파일은 오염됩니다.
    장점3. 페이지 로딩시간 단축됩니다.
*/
let YellowButton = styled.button`
    background: ${props => props.bg};
    color: ${props => props.bg === 'blue' ? 'white' : 'black'};
    padding: 10px;
`
let NewButton = styled.button(YellowButton)

const Detail = (props) => {

    let [count, setCount] = useState(0);
    /* useEffect 쓰는 이유
     * html 렌더링 후에 동작함.
     * 어려운 연산
     * 서버에서 데이터를 가져오는 작업
     * 타이머 장착
    */
    let [alert, setAlert] = useState(true);
    let [tab, setTab] = useState(0);
    let [fade2, setFade2] = useState('')

    useEffect(()=>{
        setFade2('end')
        return ()=>{
            setFade2('')
        }
    },[])
    
    useEffect(() => {
        let timer = setTimeout(()=>{ setAlert(false) }, 2000)
        return () => {
            // useEffect 동작 전 실행되는 곳
            // ex: timer example
            // Clean up Function
            // mount시 실행 안됨. unmount 시에는 실행 됨
            clearTimeout(timer)
        }
    }, [])

    // 유저가 URL Parameter에 입력한 것을 가져오려면 사용
    let { id } = useParams();
    let shoeItemByNo = props.shoes.find(item => item.id === Number(id))
    return (
        !isNaN(id) ? 
        <div className={'container start ' + fade2}>
            <button onClick={() => { setCount(count + 1) }}>Button</button>
            {
                alert === true
                ? <div className="alert alert-warning">
                    2초이내 구매시 할인
                </div>
                : null
            }
            <div className="row">
                <div className="col-md-6">
                    <img src={shoeItemByNo.image} width="100%" alt="detail..."/>
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{shoeItemByNo.title}</h4>
                    <p>{shoeItemByNo.contents}</p>
                    <p>{shoeItemByNo.price}원</p>
                    <button className="btn btn-danger">주문하기</button> 
                </div>
            </div>

            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={() => { setTab(0) }} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { setTab(1) }} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { setTab(2) }} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab={tab} />
        </div> 
        : <div className="container">
            <YellowButton bg="blue">잘못된 URL 입니다. </YellowButton>
            <NewButton bg="orange">★</NewButton>
        </div>
    )
}

/*
    단점1. JS 파일이 매우 복잡해집니다.
    그리고 이 컴포넌트가 styled 인지 아니면 일반 컴포넌트인지 구분도 어렵습니다.

    단점2. JS 파일 간 중복 디자인이 많이 필요하면 어쩌죠?
    다른 파일에서 스타일 넣은 것들 import 해와서 쓰면 됩니다.
    근데 그럼 CSS파일 쓰는거랑 차이가 없을 수도요

    단점3. CSS 담당하는 디자이너가 있다면 협업시 불편할텐데 
    그 사람이 styled-components 문법을 모른다면 
    그 사람이 CSS로 짠걸 styled-components 문법으로 다시 바꾸거나 그런 작업이 필요하겠군요.
    그래서 신기술같은거 도입시엔 언제나 미래를 생각해보아야합니다. 
*/

function TabContent({tab}){
    let [fade, setFade] = useState('')
    useEffect(() => {
        setTimeout(()=>{ setFade('end') }, 100)
        /*
            리액트 18버전 이상부터는 automatic batch 라는 기능이 생겼습니다.
            state 변경함수들이 연달아서 여러개 처리되어야한다면 
            state 변경함수를 다 처리하고 마지막에 한 번만 재렌더링됩니다. 
            그래서 'end' 로 변경하는거랑 ' ' 이걸로 변경하는거랑 약간 시간차를 뒀습니다.
            찾아보면 setTimeout 말고 flushSync() 이런거 써도 될 것 같기도 합니다. 
            automatic batching을 막아줍니다.
        */
        return ()=>{
            setFade('')
        }
    }, [tab])
    return (<div className={'start ' + fade}>
        { [ <div>내용0</div>, <div>내용1</div>, <div>내용2</div> ][tab] }
    </div>)
}

export default Detail;