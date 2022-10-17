import React, { useEffect, useState } from 'react'
import { FcLike } from 'react-icons/fc';
import { BsHeart } from 'react-icons/bs';
import { API_KEY } from '../App';

const ModulComment = ({ setcommentModul, setReplyComment_id, loadingComment, name, lastname, commentList }) => {
  
  const commentReplyList = async(comment_id) =>{
    fetch('https://api.moneytoo.ir/api/users/users_get_comment_reply_list',{
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({ API_KEY, comment_id, count:6, index:0 })
    }).then(res => res.json()).then(data => console.log(data))
  }

  function unLikecomment(comment_id){
    fetch('https://api.moneytoo.ir/api/users/users_unlike_comment',{
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({ API_KEY, comment_id })
    }).then(res => res.json()).then(data => console.log(data))
    // showComment()
  }
  function likecomment(comment_id){
    fetch('https://api.moneytoo.ir/api/users/users_like_comment',{
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({ API_KEY, comment_id })
    }).then(res => res.json()).then(data => console.log(data))
    // showComment()
  }

  function unLikereply(comment_id){
    
  }
  function likereply(comment_id){
    
  }
  if(loadingComment) return 'loading'
  return (
    <>
      <div className='backdrop' onClick={()=>{setcommentModul(false)}}/>
      <div className="flex justify-center text-center ">
        
        <div className="bg-white p-20 z-30 rounded-lg fixed top-[0vh]  ">
        <img src="" alt="ssssssssss" />
        <h3 className='font-bold '>{name}</h3>
        <p className='h-6'>{lastname}</p>

        {
          commentList.map(i => {
            
            return <div className={commentList.length === 0 ?'hidden':''}>
              {/* <button onClick={()=> commentReplyList(i.comment_id)}>tttttttt</button> */}
              <div className="">
                <img src="" alt="" />
                <h3 className="">{i.comment_username} </h3>
                <p className="">{i.comment_text} </p>
                {
                  i.comment_is_liked == 1 ? 
                  <button onClick={()=> unLikecomment(i.comment_id)}><FcLike/></button>
                  :
                  <button onClick={()=> likecomment(i.comment_id)}><BsHeart/></button>
                }
              </div>
              <div className={i.reply.reply_text == "" ? "hidden" : ''}>
                <img src="" alt="" />
                <h3 className="">{i.reply.reply_username} </h3>
                <p className="">{i.reply.reply_text} </p>
                {
                  i.reply.reply_is_liked == 1 ? 
                  <button className='' onClick={()=> unLikereply(i.comment_id)}><FcLike/></button>
                  :
                  <button className={i.reply.reply_text == null ? "hidden" :''} onClick={()=> likereply(i.comment_id)}><BsHeart/></button>
                }
              </div>
            </div>
          })
        } 
        </div>
      </div>
    </>
  )
}
export default ModulComment