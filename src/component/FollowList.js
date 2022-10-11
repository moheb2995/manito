import React, { useEffect, useState } from 'react'
import simpleImg from './SimpleImg.jpg'
import Slider from "react-slick";
import { API_KEY } from '../App';

const Posts = () => {
  const [data, setdata] = useState([])
  // const [followList, setfollowList] = useState([])
  const [loading, setloading] = useState(true)
  const [update, setupdate] = useState(true)
  const obj = { isFollowed: false }

  useEffect(()=>{
    fetch('https://api.moneytoo.ir/api/users/users_get_follow_suggestion_list',{
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({ API_KEY })
    }).then(res => res.json()).then(data => {
      setloading(false)
      setdata(data.Informations.map((i) => Object.assign(i,obj)))
    })

    // fetch('https://api.moneytoo.ir/api/users/users_get_follow_requests',{
    //   method: 'POST',
    //   headers: { 'Content-Type' : 'application/json'},
    //   body: JSON.stringify({ API_KEY })
    // }).then(res => res.json()).then(data => setfollowList(data))

  },[])

  const getID = (id) => data.findIndex((i) => i.ID == id)
  
  function follow(id){
    const p = getID(id)
    data[p].isFollowed = !data[p].isFollowed
    setdata(data);setupdate(!update)
  }
  function hidden(id){
    const p = getID(id)
    // data[p].hidden = true
    data.splice(p,1)
    setdata(data);setupdate(!update)
  }

  function Arrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "darkgrey", padding:"1px", WebkitBorderRadius:"500px" }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    className: "center",
    centerMode: true,
    slidesToScroll: 1,
    infinite: false,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 450,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />
  }
// console.log(data);
  if(loading) return <h1>loading</h1>

  return (
    <div className='text-center'>
      <h1 className=" text-3xl m-4">به مانیتو خوش آمدید</h1>
      <p className="">دیگران را دنبال کنید تاپست هایی که آنها به اشتراک می گذارند را ببینید</p>
      <div className="w-[98vw] px-10  ">
      <Slider {...settings}>
        {
          data.map(i => {
            return <div key={i.ID} className='p-4 '>
              <div className="m-2 p-4 w-[290px] h-[350px] mx-auto rounded-lg shadow-2xl">
                <div className="">
                  <div onClick={()=> hidden(i.ID)} className='text-right'>X</div>
                  <img 
                  className='h-20 m-auto -mt-4 border rounded-full '
                  src={`https://api.moneytoo.ir/api/users/users_get_image?API_Key=${API_KEY}&post_id=${i.ID}&image_id=${i.profile_image_t}`} 
                  onError={e => e.target.src = simpleImg}
                  alt='img'
                  />
                  <h3 className='font-bold '>{i.name}</h3>
                  <p className='h-6'>{i.lastname}</p>
                  <div className="flex h-20 m-4 justify-around">{
                    i.posts.map(i =>
                      <img 
                      className='h-20 w-auto m-1 '
                      // src={`https://api.moneytoo.ir/api/users/users_get_image?API_Key=${API_KEY}&post_id=${i.post_id}&image_id=${i.image_id}`}
                      onError={e => e.target.src = simpleImg}
                      src={simpleImg}
                      />
                    )
                  }</div>
                  <p className="mb-4">نماد</p>
                  {
                    i.isFollowed ?
                    <button onClick={()=> follow(i.ID)} className='bg-blue-500 text-white p-5 py-1 rounded opacity-70'>unFollow</button>
                    :
                    <button onClick={()=> follow(i.ID)} className='bg-blue-500 text-white p-5 py-1 rounded'>Follow</button>
                  }
                </div>
              </div>
            </div>
          })
        }
      </Slider>
      </div>
    </div>
  )
}

export default Posts