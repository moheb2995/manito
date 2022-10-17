import React, { useId, useState, useEffect } from 'react'
import { FcLike } from 'react-icons/fc';
import { BsHeart } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { BsBookmark } from 'react-icons/bs';
import ModulComment from './ModulComment'
import ModulEtc from './ModulEtc'
import ModulSend from './ModulSend'
import { API_KEY } from '../App';

const Posts = ({ data, setdata, setupdate, update }) => {
  const [likeres, setlikeres] = useState()
  const [updateInput, setupdateInput] = useState(false)
  const [etcModul, setEtcModul] = useState(false)
  const [sendModul, setsendModul] = useState(false)
  const [commentModul, setcommentModul] = useState(false)
  const [commentList, setcommentList] = useState([])
  const [loadingComment, setloadingComment]= useState(true)
  const [ReplyComment_id, setReplyComment_id]= useState('')
  
  const id = useId()

  // console.log(commentList);
  // useEffect(() => {
  //   fetch('https://api.moneytoo.ir/api/users/users_get_my_bookmark_list',{
  //     method: 'POST',
  //     headers: { 'Content-Type' : 'application/json'},
  //     body: JSON.stringify({ API_KEY })
  //   }).then(res => res.json()).then(data => setlikeres(data))
  // }, [])

  const getID = (id) => data.findIndex((i) => i.post_id == id)
  
  const like = async(post_id) =>{
    fetch('https://api.moneytoo.ir/api/users/users_like_post',{
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({ API_KEY, post_id })
    }).then(res => res.json()).then(data => setlikeres(data))
    setupdate(!update)
  }
  const unLike = async(post_id) =>{
    fetch('https://api.moneytoo.ir/api/users/users_unlike_post',{
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({ API_KEY, post_id })
    }).then(res => res.json()).then(data => setlikeres(data))
    setupdate(!update)
  }

  const plusBookmark = async(post_id, bookmark_id) =>{
    fetch('https://api.moneytoo.ir/api/users/users_save_post_as_bookmarked',{
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({ API_KEY, post_id, bookmark_id })
    }).then(res => res.json()).then(data => setlikeres(data))
    setupdate(!update)
  }
  const delBookmark = async(post_id, bookmark_id) =>{
    fetch('https://api.moneytoo.ir/api/users/users_delete_post_from_bookmarked',{
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({ API_KEY, post_id, bookmark_id })
    }).then(res => res.json()).then(data => setlikeres(data))
    fetch('https://api.moneytoo.ir/api/users/users_delete_post_from_bookmarked',{
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({ API_KEY, post_id })
    }).then(res => res.json()).then(data => setlikeres(data))
    setupdate(!update)
  }

  function howLongAgo(time){
    const date = new Date().getTime() - new Date(time).getTime()
    let days = Math.floor(date / (1000 * 60 * 60 * 24))
    let h = Math.floor((date % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    let min = Math.floor((date % (1000 * 60 * 60)) / (1000 * 60))

    if(min == 0) return <h6 className=''>هم اکنون</h6> 
    else if (min < 60 && h == 0 && days == 0) return <h6 className=""> {min} دقیقه قبل</h6>
    else if (h < 24 && days == 0) return <h6 className="">{h} ساعت قبل</h6>
    else return <h6 className="">{days} روز قبل</h6>
  }
  function onChangeInputs(e,id){
    const p = getID(id)
    data[p].comment_input = e.target.value
    setdata(data);setupdateInput(!updateInput)
  }

  const sendComment = async(post_id, comment_input, ) =>{
    console.log(1,comment_input);
    fetch('https://api.moneytoo.ir/api/users/users_send_comment',{
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({ API_KEY, post_id, comment_input, Reply_to_comment_id: id })
    }).then(res => res.json()).then(data => setlikeres(data))
    console.log(2,comment_input);

    const p = getID(post_id)
    data[p].comment_input = ''
    setdata(data);setupdateInput(!updateInput)
    setupdate(!update)
    console.log(3,comment_input);

  }

// *******
  function showComment(post_id){
    fetch('https://api.moneytoo.ir/api/users/users_get_post_comments_list',{
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({ API_KEY, post_id, count:6, index:0 })
    }).then(res => res.json()).then(data => {setcommentList(data.Informations); setloadingComment(false)})
  }
// *******
  const post = data.map(i => {
    return <div className='z-10'>
      {/* <button onClick={()=> commentReplyList(i.comment_id)}>comment</button> */}

      <img src="" alt="ssssssssss" />
      <h3 className='font-bold '>{i.name}</h3>
      <p className='h-6'>{i.lastname}</p>
      <button className="" onClick={()=> setEtcModul(true)}>...</button>

      <img src="" alt="" />
      <div className="">
        {
          i.is_liked == 1 ? 
          <button onClick={()=> unLike(i.post_id)}><FcLike/></button>
          :
          <button onClick={()=> like(i.post_id)}><BsHeart/></button>
        }
        {
          i.is_bookmarked !== "False"? 
          <button onClick={()=> delBookmark(i.post_id, i.bookmark_id)}><BsFillBookmarkFill/></button>
          :
          <button onClick={()=> plusBookmark(i.post_id, i.bookmark_id)}><BsBookmark/></button>
        }
        <button onClick={()=> setcommentModul(true)}><FaRegComment/></button>
        <button onClick={()=> setsendModul(true)}><FiSend/></button>
        
      </div>
      <h4 className={i.like_count === 0 ? "hidden" : ''}>{i.like_count} Likes</h4>
      <h3 className="">{i.username} </h3>
      <p className="">{i.caption} </p>
      <h4 className="">{i.comment_text} </h4>
      <button className={i.comment_count == 0 ? "hidden": ''} onClick={()=> {showComment(i.post_id); setcommentModul(true)}}>مشاهده همه کامنت ها ({i.comment_count})</button>

      <div className="">
        <img src="" alt="" />
        <input className="" value={i.comment_input} onChange={(e) => onChangeInputs(e, i.post_id)} />
        <button 
          className=''
          disabled={i.comment_input === '' ? true : false} 
          onClick={()=> sendComment(i.post_id, i.comment_input)}
        >ارسال</button>
      </div>
      <div dir='rtl' className="">{howLongAgo(i.insert_time)}</div>

      {etcModul ? <ModulEtc setEtcModul={setEtcModul} post_id={i.post_id} /> : ''}
      {sendModul ? <ModulSend setsendModul={setsendModul} /> : ''}
      {commentModul ? <ModulComment setcommentModul={setcommentModul} setReplyComment_id={setReplyComment_id} showComment={showComment} name={i.name} loadingComment={loadingComment} lastname={i.lastname} commentList={commentList} /> : ''}


    </div>
  })

  return <div>{post}</div>
}

export default Posts