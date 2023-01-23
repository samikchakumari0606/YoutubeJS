//https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=[YOUR_API_KEY]'
//my_api=`AIzaSyAr2TUocNghuP3vkE1du-58vnfBoPIwPA4`
//api=`AIzaSyCGdS9BRP2bcGIx2Vxn6lKcHGGB9S_QcAs`
my_api=`AIzaSyBFvVtDXAGguqn3TE-k4Yznb-gknLRZlZg`
const search =async ()=>{
 // console.log("Hii")
   try{
    let query=document.getElementById("query").value;
    let res=await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${my_api}`);

    
    let data=await res.json();
    let actual_data=data.items;
    appendMovies(actual_data)

    console.log("data",data);
   }
   catch(err){
    console.log("err",err);
   }
    
}
//https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${my_api}


//for the default trending videos
async function trendingVideos(){
  try{
    let query=document.getElementById("query").value;
    let res=await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${my_api}&chart=mostPopular&regionCode=IN`)
    let data=await res.json();
    let actual_data=data.items;
    appendMovies(actual_data)

    console.log("data",data);
   }
   catch(err){
    console.log("err",err);
   }
  
}
trendingVideos();
//thumbnail
//channelTitle
//videoId
//title

const appendMovies=(data)=>{

  let second=document.getElementById("second");
  second.innerHTML=null;
  

  data.forEach(({snippet,id})=>{
   // console.log(el);
    const videoId=id.videoId;
    //console.log("videoId",videoId);
    const title=snippet.title;
    //console.log("title",title)
    const channel_Title=snippet.channelTitle;
  // console.log("channel",channel_Title);
    const thumbnails=snippet.thumbnails.high.url;
   // console.log("thumbnails",thumbnails);


   let div=document.createElement("div");
   let img=document.createElement("img");
   img.src=thumbnails;
   let title_html=document.createElement("h5");
   title_html.innerText=title;
   let channel_html=document.createElement("h6");
   channel_html.innerText=channel_Title;

   let data={
    videoId,
    snippet,

   };

   div.onclick=()=>{
    //console.log(title)
    storeClickedVideo(data)
   }

   div.append(img,title_html,channel_html);
   second.append(div);
})
}


function storeClickedVideo(data){
  //console.log(data)
  localStorage.setItem("clicked_item",JSON.stringify(data));
  window.location.href='video.html';
}

