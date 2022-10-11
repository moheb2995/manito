import React, { useState, useEffect } from 'react'
import FollowList from './component/FollowList'
import Navbar from './component/Navbar'
import Posts from './component/Posts'

export const API_KEY = '15386-SSZPyjcEGDMTDgvSUiEfrWYCKjracjSlQHHmNXQRySPZfrzudH'

const App = () => {
  const [postExist, setpostExist] = useState(1)
  const [data, setdata] = useState([])
  const [index, setindex] = useState(0)
  const [count, setcount] = useState(10)
  const [update, setupdate] = useState(true)
  const [page, setpage] = useState(1)  
  const obj = {comment_input: ''}

  useEffect(()=>{
    fetch('https://api.moneytoo.ir/api/users/users_home_posts',{
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({
        API_KEY,
        count,
        index,
      })
    })
    .then(res => res.json())
    .then(data => { 
      setdata(data.Informations.map(i => Object.assign(i,obj)))
      if(data.Informations.length !== 0){
        setpostExist(2)
      }
      else {
        setpostExist(3)
      }
    })

  },[update])

// console.log(data);
  return (
    <div className='m-4'>
      <Navbar />
      <hr className='drop-shadow' />
      {
        postExist === 1 ? 
        <h1>loading...</h1>
        :
        postExist === 2 ?
        <Posts data={data} setdata={setdata} setupdate={setupdate} update={update} />
        :
        <FollowList/>
      }
      <button onClick={()=>{
        setpage(page + 1)
        console.log(page);
        // setcount(count * page)
        setcount(count + 10)
        setupdate(!update)
      }}>نمایش پست های بیشتر</button>
    </div>
  )
}

export default App