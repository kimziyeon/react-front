import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useStore } from './store';
import React, { useEffect, useRef, useState } from 'react';

function App() {

  const elInput = useRef();

  const { data, getData, status, postData, deleteData, putData } = useStore();

  const [alter, setAlter] = useState('')
  useEffect(() => { getData() }, [])
  console.log(data);
  if (!status) return <>Loading..</>
  // request.post('/',{id:Date.now(),name:"김"})
  // .then(res=>{
  //   console.log(res.data)
  // })

  // request.delete('/0')
  // .then(res=>{
  //   console.log(res.data)
  // })

  //   request.put('/', {id: 0 ,name :"ㅁㅁㅁㅁㅁㅁㅁ"})
  // .then(res=>{
  //   console.log(res.data)
  // })


  const onUpdateHandler = (obj) => {
    elInput.current.value = obj.name;
    setAlter(obj);
  }


  const onSaveHandler = () => {
    if (elInput.current.value === "") return;

    let params = null;

    if (alter.id != '' && alter.id != undefined) {
      params = { id: alter.id, name: elInput.current.value }
      putData(params)
    }
    else {
      params = { id: (new Date).getTime(), name: elInput.current.value }
      postData(params)
    }
    elInput.current.value = "";
    setAlter('')
  }


  const onDeleteHandler = (id) => {
    if (id !== "") deleteData(id) //id값이 있다면 id를 deleteData로 보냄
  }



  return (
    <div className="App">
      <article>
        <input type='text' ref={elInput} />
        {/* <button onClick={()=>{postData(elInput.current.value)}}>저장</button> */}
        <button onClick={() => { onSaveHandler() }}>저장</button>
      </article>

      <article>
        {
          data.map((obj) => (
            <>
              <p>{obj.name}</p>
              {/* <button onClick={()=>{deleteData(obj.id)}}>삭제</button>
                <button onClick={()=>{putData(obj.id,elInput.current.value)}}>수정</button> */}
              <button onClick={() => { onDeleteHandler(obj.id) }}>삭제</button>
              <button onClick={() => { onUpdateHandler(obj) }}>수정</button>
            </>
          ))
        }
      </article>



    </div>
  );
}

export default App;
