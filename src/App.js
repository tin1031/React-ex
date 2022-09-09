import logo from './logo.svg';
import './App.scss';

// ========================== Nav ==========================
function Nav(props){
  // 1-4. 변수값 topics를 받기 위해 첫번째 파라미터, 연결해주는 props 가 필요
  // 여기서 변수 lis 를 만들어 배열 [] 안에 li 태그를 각자 넣고 ol 안에 {lis}를 하면 동적으로 배치
  const lis = [
  // <li><a href="#">html</a></li>,
  // <li><a href="#">css</a></li>,
  // <li><a href="#">js</a></li>
  ]

  // 1-5. 여러 방법이 있으나 for문을 사용
  for(let i=0; i<props.topics.length; i++){
    // 토픽의 숫자만큼 반복하기 위해 아래 변수를 만들고
    let t = props.topics[i];
    // lis 변수에 li값을 push 넣어준다 
    lis.push(
    <li key={t.id}>
      {/* 2-3. 파라미터가 하나 뿐일땐 괄호 생략가능 */}
      {/* 온체인지모드는 id값을 필요로 해서 함수를 호출할 때 id 값을 주입해야하는데 a태그에 id={t.id}를 부여하는게 가장 쉽다 = 반복문으로 리스트 생성될 때 props 객체로 받아온 id값도 같이 생성하기에 */}
      <a href={'/read/'+t.id} id={t.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(event.target.id);
        // t.id로도 값을 받을 순 있는데 e.t~로 쓰면 바로 위에 있는 a태그의 id값을 나타낸다고 이해할수있다. 즉 타겟을 통해 목적이 되는 객체 값을 참고하게되는것
      }}>{t.title}</a>
    </li>
    )
    // 1-6. 이때 a 태그도 동적으로 바껴야하기에 객체 안에 주소를 넣는다
    // li key={t.id}를 넣으면 a태그에 고유한 값이 들어간다
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
  // 속성값을 props라 통상적으로 칭한다 (값이름은 상관없긴하나)
  console.log('props', props);
  return (
    <header>
      <h1>
        {/* 2-2. 여기서 사용하는 onClick문법은 똑같지않다*/}
        {/* event 객체를 첫 파라미터로 받으면 event가 가진 걸 여러 가지 할 수 있는데, 그 중 a태그의 기본 동작 이벤트가 일어나지 않게 방지 */}
        <a href="/" onClick={function(event){
          // 클릭해도 상단으로 돌아가거나 페이지 바뀌는 등 안됨
          event.preventDefault();

          // App()안에서 Header의 onChangeMode가 가진 함수를 props를 통해 가져오기
          props.onChangeMode();
        }}>{props.title}</a>
      </h1>
    </header>
  )
}

function App() {

  // 1-1. li의 목록을 편하게 바꾸고싶을때 여기서 변수를 만들어 배열 생성
  const topics = [
    // 1-2. id의 값이 겹치지 않아야한다(웹홈페이지 이동을 위해)
    {id:1, title:'html', body:'html is ,,,'},
    {id:2, title:'css', body:'css is ,,,'},
    {id:3, title:'js', body:'js is ,,,'},
  ]
  return (
    <div className="App">
      {/* 2-1. props의 값으로 함수를 넣어, 클릭할 때마다 함수를 호출해 이벤트 발생하기 */}
      <Header title="여니형 안뇽" onChangeMode={function(){
        alert('연이조아');
      }}></Header>
      {/* 1-3. topics="topics"로 넣으면 문자열이 돼 {}로 객체를 삽입 */}
      <Nav topics={topics} onChangeMode={(id)=>{
        alert(id);
      }}></Nav>
      <Article title="웰컴" body="헬로웹"></Article>
    </div>
  );
}

export default App;
