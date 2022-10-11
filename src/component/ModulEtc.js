import React, { useState } from 'react'
import { API_KEY } from '../App';

const ModulEtc = ({ setEtcModul, post_id }) => {
  const [test, settest] = useState()

  const report = async() =>{
    fetch('https://api.moneytoo.ir/api/users/users_report_post',{
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({ API_KEY, post_id })
    })
  }

  const delPost = async() =>{
    fetch('https://api.moneytoo.ir/api/users/users_delete_post',{
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({ API_KEY, post_id })
    }).then(res => res.json()).then(data => settest(data))
  }

  return (
    <>
      <div onClick={()=> setEtcModul(false)} className="backdrop"/>
      <div className="flex justify-center text-center ">
        <div className="bg-white z-30 rounded-lg fixed top-[40vh]  ">
          <button className="etc" onClick={ delPost }>حذف</button> <hr />
          <button className="etc">ویرایش</button> <hr />
          <button className="etc" onClick={ report }>گزارش</button> <hr />
          <button className="etc">کپی لینک پست</button> <hr />
        </div>
      </div>
    </>
  )
}

export default ModulEtc