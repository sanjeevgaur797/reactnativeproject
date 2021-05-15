import { ServerData } from "../api/ServerData";

export const CHECK="CHECK";


export const GETHOMEDATA="GETHOMEDATA";
export const GETHOMEDATASUCCESS="GETHOMEDATASUCCESS";
export const GETHOMEDATAFAILED="GETHOMEDATAFAILED";

export const GETPRODUCTBYCATEGORY="GETPRODUCTBYCATEGORY";
export const GETPRODUCTBYCATEGORYSUCCESS="GETPRODUCTBYCATEGORYSUCCESS";
export const GETPRODUCTBYCATEGORYFAILED="GETPRODUCTBYCATEGORYFAILED";

export const PRODUCTSDETAILBYID="PRODUCTSDETAILBYID";
export const PRODUCTSDETAILBYIDSUCCESS="PRODUCTSDETAILBYIDSUCCESS";
export const PRODUCTSDETAILBYIDFAILED="PRODUCTSDETAILBYIDFAILED";



export function GetHomeData(action){
    return async dispatch=>{
     
       
        dispatch({   //fetching

type:GETHOMEDATA,
payload:{},
        });
        
        await ServerData.GetHomeData(action,(data)=>{
           
            dispatch({
                type:GETHOMEDATASUCCESS,
                payload:data,
            })
        },
            error=>{
                dispatch({
type:GETHOMEDATAFAILED,
payload:error,
                })
            }
        )
    }
}
export function GetProductByCategory(action){
    return async dispatch=>{
     
       
        dispatch({   //fetching

type:GETPRODUCTBYCATEGORY,
payload:{},
        });
        
        await ServerData.GetProductByCategory(action,(data)=>{
           
            dispatch({
                type:GETPRODUCTBYCATEGORYSUCCESS,
                payload:data,
            })
        },
            error=>{
                dispatch({
type:GETPRODUCTBYCATEGORYFAILED,
payload:error,
                })
            }
        )
    }
}

export function ProductsDetailById(action){
    return async dispatch=>{
     
       
        dispatch({   //fetching

type:PRODUCTSDETAILBYID,
payload:{},
        });
        
        await ServerData.ProductsDetailById(action,(data)=>{
           
            dispatch({
                type:PRODUCTSDETAILBYIDSUCCESS,
                payload:data,
            })
        },
            error=>{
                dispatch({
type:PRODUCTSDETAILBYIDFAILED,
payload:error,
                })
            }
        )
    }
}













export function check(action){
    console.log("action called check",action)
    return async dispatch=>{
dispatch({
    type:CHECK,
    payload:action
});
    };
}