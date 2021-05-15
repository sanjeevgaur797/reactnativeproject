import {Base_url} from "./ServerConfig"
import Server from "./callServer"
export  const ServerData = {

    GetHomeData:async(body,success)=>{
    
        await Server.request("GET",`${Base_url}app/home`,"",(result)=>{
    //   console.log("result in action",result)
      
    success(result);
      })
    },

    GetProductByCategory:async(body,success)=>{
    
      await Server.request("GET",`${Base_url}app/productbycategory?category=${body}`,"",(result)=>{
  //   console.log("result in action",result)
    
  success(result);
    })
  },
  ProductsDetailById:async(body,success)=>{
    
      await Server.request("GET",`${Base_url}app/productbyid?id=${body}`,"",(result)=>{
  //   console.log("result in action",result)
    
  success(result);
    })
  },
  CheckLogin:async(body,success)=>{
    
    await Server.request("POST",`${Base_url}app/check/login`,body,(result)=>{
//   console.log("result in action",result)
  
success(result);
  })
},
registerUser:async(body,success)=>{
    
  await Server.request("POST",`${Base_url}app/register`,body,(result)=>{
//   console.log("result in action",result)

success(result);
})
},
    
}