import logo from './logo.svg';
// npm i node-sass 설치함 , 기존 css 파일 scss 로 교체해야함
import './App2.scss';
// usestate 훅 사용
import {useState} from 'react';

// 로고와 메뉴를 누를 때마다 본문 내용이 바뀌게 만들기

// ========================== Nav ==========================
function Nav(props){
  const lis = [
    // <li><a href="#">html</a></li>,
    // <li><a href="#">css</a></li>,
    // <li><a href="#">js</a></li>
  ]

  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];

    lis.push(
    <li key={t.id}>
      <a href={'/read/'+t.id} id={t.id} onClick={event=>{
        event.preventDefault();
        // 문자여서 id 반응이 이상한데 숫자로 바꿔주기
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a>
    </li>
    )
  }
  return (
    <nav>
      <ol>
        {/* 동적배치 */}
        {lis}
      </ol>
    </nav>
  )
}

// ========================== Article ==========================
function Article(props){
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}

// ========================== Header ==========================
function Header(props){
  console.log('props', props);
  return (
    <header>
      <h1>
        <a href="/" onClick={function(event){
          event.preventDefault();
          props.onChangeMode();
        }}>{props.title}</a>
      </h1>
    </header>
  )
}

function App2() {
  // App함수가 다시 실행되지 않는이상 mode의 값을 header와 nav내에서 onChangeMode={(id) => {mode = 'READ'}} 형식으로 바꿔도 안된다
  // 일반 지역변수(한곳에서만 사용가능)인 mode를 상태로 업그레이드
  // const mode = 'WELCOME';
  // 1. const _mode = useState('WELCOME');

  // useState는 배열을 뜻하고 배열의 0번째 요소(welcome)는 상태의 값을 읽을때 쓰는 데이터
  // 1번째 데이터는 그 상태의 값을 변경할 때 사용하는 함수
  console.log('_mode', );

  // mode를 통해 _mode의 0번째를 읽을수있다
  // 2. const mode = _mode[0];
  // 1번째 원소인 setMode를 통해 mode의 값을 바꿀 수 있는 규칙이 존재
  // 3. const setMode = _mode[1];

  // 위 코드 1,2,3의 축약형이며 기본모양
  const [mode, setMode] = useState('WELCOME');

  const [id, setId] = useState(null);

  let content = null;

  // 순서중요
  const topics = [
    {id:1, title:'html', body:'html is ,,,'},
    {id:2, title:'css', body:'css is ,,,'},
    {id:3, title:'js', body:'js is ,,,'},
  ]

  if (mode === 'WELCOME'){
    content = <Article title="안녕하세요" body="기본 데이터입니다"></Article>
  } else if (mode === 'READ') {
    // topics 원소(id) 숫자만큼 반복
    let title, body = null;

    for (let i=0; i<topics.length; i++){
      // 디버깅
      console.log(topics[i].id, id);
      // topics id값이 id(setId)와 일치한다면
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    // content = <Article title="읽기" body="읽기 데이터입니다"></Article>
    content = <Article title={title} body={body}></Article>
  }

  return (
    <div className="App2">
      <Header title="State 예시" onChangeMode={function(){
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        // 값을 바꿀 때 setMode 사용
        setMode('READ');
        setId(_id)
      }}></Nav>
      {/* 컨텐트 변수를 출력되게 */}
      {content}
    </div>
  );
}

export default App2;
