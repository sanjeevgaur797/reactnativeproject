import{CHECK,
    GETHOMEDATA,
    GETHOMEDATASUCCESS,
    GETHOMEDATAFAILED,
    GETPRODUCTBYCATEGORY,
    GETPRODUCTBYCATEGORYSUCCESS,
    GETPRODUCTBYCATEGORYFAILED,

    PRODUCTSDETAILBYID,
    PRODUCTSDETAILBYIDSUCCESS,
    PRODUCTSDETAILBYIDFAILED,
} from "../actions/ProductActions";



const initialState={ fetching:false,success:false,error:false};
export function GetHomeData(state=initialState, action){
    
    switch (action.type){
        case  GETHOMEDATA : {
            return Object.assign({},state,{fetching:true,success:false,error:false}
            );}
            case GETHOMEDATASUCCESS :{
                console.log(action.payload);
                return Object.assign({},state,{fetching:false,success:true,error:false},
                    {details:action.payload},
                );
            }
               
            case GETHOMEDATAFAILED :{
                console.log(action.payload);
                return Object.assign({},state,{fetching:false,success:false,error:true},
                    {details:action.payload},
                );
            }
            default :{
                return initialState;
            }
            }
        }
    
        export function GetProductByCategory(state=initialState, action){
    
            switch (action.type){
                case  GETPRODUCTBYCATEGORY : {
                    return Object.assign({},state,{fetching:true,success:false,error:false}
                    );}
                    case GETPRODUCTBYCATEGORYSUCCESS :{
                        console.log(action.payload);
                        return Object.assign({},state,{fetching:false,success:true,error:false},
                            {details:action.payload},
                        );
                    }
                       
                    case GETPRODUCTBYCATEGORYFAILED :{
                        console.log(action.payload);
                        return Object.assign({},state,{fetching:false,success:false,error:true},
                            {details:action.payload},
                        );
                    }
                    default :{
                        return initialState;
                    }
                    }
                }
            

                export function ProductsDetailById(state=initialState, action){
    
                    switch (action.type){
                        case  PRODUCTSDETAILBYID : {
                            return Object.assign({},state,{fetching:true,success:false,error:false}
                            );}
                            case PRODUCTSDETAILBYIDSUCCESS :{
                                console.log(action.payload);
                                return Object.assign({},state,{fetching:false,success:true,error:false},
                                    {details:action.payload},
                                );
                            }
                               
                            case PRODUCTSDETAILBYIDFAILED :{
                                console.log(action.payload);
                                return Object.assign({},state,{fetching:false,success:false,error:true},
                                    {details:action.payload},
                                );
                            }
                            default :{
                                return initialState;
                            }
                            }
                        }
                    
                
    





    export function check(state=initialState, action){
        
  console.log("recducer called check",action.payload)
    switch (action.type){
        case  CHECK : {
            return Object.assign({},state,{fetching:true,success:false,error:false}, {details:action.payload});
        }
            default :{
                return initialState;
            }
            }
        }
        
    