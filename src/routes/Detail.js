import { useParams } from "react-router-dom";
import styled from "styled-components";

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
    // 유저가 URL Parameter에 입력한 것을 가져오려면 사용
    let { id } = useParams();
    let shoeItemByNo = props.shoes.find(item => item.id === Number(id))
    return (
        !isNaN(id) ? 
        <div className="container">
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

export default Detail;