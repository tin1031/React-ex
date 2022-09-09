import logo from './logo.svg';
import './App.scss';
import {useState} from 'react';

// UPDATEA

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

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={event=>{
        event.preventDefault();

        const title = event.target.title.value;
        const body = event.target.body.value;

        props.onCreate(title, body);

      }}>
        <p><input type="text" name="title" placeholder="title"/></p>
        <p><textarea name="body" placeholder="body"></textarea></p>
        <p><input type="submit" value="create" ></input></p>
      </form>
    </article>
  )
}

// 10. 리액트에서 props라 하는 데이터는 사용자가 컴포넌트로 전달하는 일종의 명령이다. 그러므로 밑에 value에서 값을 바꾼다해서 전체가 바뀌진 않는다 => props를 state로 바꿔야한다.. (외부에서 내부로 전달하는 값이기에)

// 기본 구성은 create와 같다
function Update (props) {
  const [ptitle, setPtitle] = useState(props.title);
  const [pbody, setPbody] = useState(props.body);
  return (
    <article>
      <h2>Update</h2>
      <form onSubmit={event=>{
        event.preventDefault();

        const title = event.target.title.value;
        const body = event.target.body.value;

        // 6. 그대로 복붙해서 props 빼먹지말것
        // 클릭했을때 onCreate해주던것을 update로 바꾸고 컴퍼넌트 사용할 때도 바꾸기 (if문으로)
        props.onUpdate(title, body);

      }}>
        {/* 9. props 의 값을 input태그안에 넣는다 vlaue={props.title} 형식으로 <임시*/}
        {/* 근데 여기서 수정하려고 하면 글이 고정돼서 안된다*/}
        {/* 11. useState로 바꿨다면 변수 대신 넣기, 그러나 아직 정적 */}
        {/* onChange 추가 < html은 클릭하면 값이 한번 바뀌는데 리액트는 값을 입력할 때마다 작동한다*/}
        <p><input type="text" name="title" placeholder="title" value={ptitle} onChange={event => {
          // 이벤트를 찾아나서면 어떻게 값이 나오는가?
          console.log(event.target.value);
          // 최근에 변경된 값을 새로운 state 값으로 바꾸기 > 키보드로 입력할 때마다 settitle값을 지정
          // 그때마다 타이틀 값이 바뀌고 컴포넌트가 랜더링되면서 새값이 value로 들어오고... 반복
          setPtitle(event.target.value);
        }}/></p>
        <p><textarea name="body" placeholder="body" value={pbody} onChange={event => {
          setPbody(event.target.value);
        }}></textarea></p>
        <p><input type="submit" value="Update" ></input></p>
      </form>
    </article>
  )
}

function App4() {
  console.log('_mode', );
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4)

  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ,,,'},
    {id:2, title:'css', body:'css is ,,,'},
    {id:3, title:'js', body:'js is ,,,'},
  ])

  let content = null;

  // 1. 맥락에 따라 노출되는 ui를 만들기 위해 새 변수를 작성
  // mode가 READ일 때만 나오게 하기 위해 if문에서 작성
  let contextControl = null;

  if (mode === 'WELCOME'){
    content = <Article title="안녕하세요" body="기본 데이터입니다"></Article>
  } else if (mode === 'READ') {
    let title, body = null;

    for (let i=0; i<topics.length; i++){
      // console.log(topics[i].id, id);

      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    // 2.
    // 4. 업데이트 클릭하면 고유한 아이디 주소가 있을 거기에 id 변환
    // url은 바뀌지 않아도 형식은 지키기
    contextControl = 
    // 2-1. delete를 만들 땐 버튼을 만들어야하는데 리액트는 변수 안에 하나의 태그만 있어야한다. 그렇기에 빈태그를 추가해 li태그를 넣는다
    <>
    <li>
      <a href={"/update/"+id} onClick={event => {
        event.preventDefault();
        // 5. 모드가 업데이트로 이동되게 > update 코드 if문에 추가
        setMode('UPDATE');
      }}>Update</a>
    </li>
    <li>
      <input type="button" value="Delete" onClick={()=>{
        // 여기 newTopics는 오리지널 데이터 topics가 아니다
        const newTopics = []
        for(let i=0; i<topics.length; i++){
          // 2-2. 토픽 아이디와 현재 아이디가 다르면
          // !== > 앞과 뒤에 있는 코드가 다를때 실행된다
          if(topics[i].id !== id){
            newTopics.push(topics[i]);
            // 새 토픽을 푸쉬
          }
        }
        setTopics(newTopics)
        setMode('WELCOME')
      }}/>
    </li>
    </>
  } else if(mode === 'CREATE'){
    content = <Create onCreate={(_title, _body) => {
      const newTopic = {id:nextId, title:_title, body:_body}
      const newTopics = [...topics]

      newTopics.push(newTopic);

      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  } else if (mode === 'UPDATE') {
    // update 컴포넌트 구현
    // 8. 위에 read 일때 title과 body값을 알아낸걸 사용
    // props를 통해 title, body 값이 각각 흘러나오게 한다 => title={title}...
    let title, body = null;

    for (let i=0; i<topics.length; i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    // 7. title, body값을 받는 함수 생성
    // 업데이트는 수정이기에 form에 기존의 내용이 담겨 있어야한다. 그러므로 기본적으로 title과 body의 값을 가져야함
    content = <Update title={title} body={body} onUpdate={(_title, _body) => {
      // 마지막 > 수정한 값 불러오기
      console.log(_title, _body);
      const newTopics = [...topics]
      const updatedTopic = {id:id, title:_title, body:_body}

      // id가 일치하는 값 찾기
      for(let i=0; i<newTopics.length; i++){
        // 위 토픽의 n번째의 아이디와 현재 아이디가 같다면
        if(newTopics[i].id === id){
          newTopics[i] = updatedTopic;
          break;
          // 반복문 끄기
        }
      }

      setTopics(newTopics);
      // 수정후 상세페이지 이동
      setMode('READ');
    }}></Update>
  }

  return (
    <div className="App2">
      <Header title="State 예시" onChangeMode={function(){
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id)
      }}></Nav>
      {content}
      {/* 생성과 업데이트 구분을 위해 리스트로 변환 */}
      {/* 업데이트는 상세에서 보이고 메인화면에선 안보이는게 세련됨 */}
      <ul>
        <li>
          <a href="/create" onClick={event => {
            event.preventDefault();
            setMode('CREATE');
          }}>Create</a>
        </li>
        {/* 0, 3. 갖다붙이기 */}
        {contextControl}
      </ul>
    </div>
  );
}

export default App4;
