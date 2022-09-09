import logo from './logo.svg';
import './App2.scss';
import {useState} from 'react';

// 내가 쓴 글자 출력되게하기

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
      {/* form태그에 onSubmit 프롭 제공해야 자바실행이 쉬움 */}
      <form onSubmit={event=>{
        event.preventDefault();
        // 1. 외부에서 value값을 가져와야함
        // 2. 이벤트 타겟이면 이게 발생한 태그 form 을 찾는다
        // 3. name이 title인걸 찾고 value를 가져온다
        const title = event.target.title.value;
        const body = event.target.body.value;
        // 이렇게 값을 가져오면 사용자에게 값을 공급 props 해야한다
        props.onCreate(title, body);

        // 실행되면 App3의 create mode에서 onCreate가 가리키는 함수가 실행됨
      }}>
        {/* p태그로 감싸면 한줄씩 넘어감 */}
        <p><input type="text" name="title" placeholder="title"/></p>
        <p><textarea name="body" placeholder="body"></textarea></p>
        <p><input type="submit" value="create" ></input></p>
      </form>
    </article>
  )
}

function App3() {
  console.log('_mode', );
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);

  // 7. topics의 id값은 별도로 관리
  // 이걸 통해 다음 원소의 id값을 알아낼수있다
  const [nextId, setNextId] = useState(4)
  let content = null;

  // 5. 새로운 변수를 추가해 li 인터페이스를 추가시키기 => 상태로 승격
  // 읽기topics와 쓰기setTopics로 나눈다
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ,,,'},
    {id:2, title:'css', body:'css is ,,,'},
    {id:3, title:'js', body:'js is ,,,'},
  ])

  if (mode === 'WELCOME'){
    content = <Article title="안녕하세요" body="기본 데이터입니다"></Article>
  } else if (mode === 'READ') {
    let title, body = null;

    for (let i=0; i<topics.length; i++){
      console.log(topics[i].id, id);

      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
  } else if(mode === 'CREATE'){
    // 0. 사용자가 버튼을 눌렀을때 함수 실행 및 ui 바껴야함
    content = <Create onCreate={(_title, _body) => {
      // 6. 객체를 새로 만들기
      // title:은 객체(topics)의 프로퍼티 이름이고 :title은 파라미터로부터 온 이름
      const newTopic = {id:nextId, title:_title, body:_body}

      // 7.
      const newTopics = [...topics]
      // 이와 같은 방식이 되면 오리지널과 새로 들어온 newTopic이 같이 있게된다
      // 오리지널에 새걸 투입
      newTopics.push(newTopic);

      // 6-1. ...을 쓰면 value값을 복제한 새로운 v가 newTopic가 된다
      // 6-2. newTopic = {...value} => setTopic(newTopic)  == 배열일 경우 [...]
      setTopics(newTopics)

      // 수정 후 상세페이지 이동
      setMode('READ');
      // 추가했을 때 다음 아이디로 지정
      setId(nextId);
      // 다음글을 추가할때 기존의 넥스트아이디에 1을 더한다
      setNextId(nextId+1);
    }}></Create>
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
      {/* 버튼 누르면 mode가 create로 바뀌고 ui 변경 */}
      <a href="/create" onClick={event => {
        event.preventDefault();
        setMode('CREATE');
      }}>Create</a>
    </div>
  );
}

export default App3;
