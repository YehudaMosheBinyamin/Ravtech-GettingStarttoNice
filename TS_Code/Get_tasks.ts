import { PostAgentProfileRequest } from 'aws-sdk/clients/codeguruprofiler';
import { string0To255 } from 'aws-sdk/clients/customerprofiles';
import { stringList } from 'aws-sdk/clients/datapipeline';
import axios from 'axios';
interface Post{
    userId:number;
    id:number;
    title:string;
    body:string;
}
interface User{
    id:number;
    name:string;
    email:string;
}
class ActualUser{
    static readonly typeIdentifier = 'User'; // Static property
    public id:number;
    public name:string;
    public email:string;
   /**  constructor(public id:number,
    public name:string,
    public email:string){}*/
    constructor(params:{"id":number,"name":string,"email":string}){
      this.id = params['id'];
      this.name = params['name'];
    this.email = params['email'];
    }
}
class UserPost{
    userName:string;
    userEmail:string;
    postTitle:string;
    postBody:string;
    constructor(    userName:string,
    userEmail:string,
    postTitle:string,
    postBody:string)
    {
        this.userName =userName;
    this.userEmail = userEmail;
    this.postTitle = postTitle;
    this.postBody = postBody;
    }
    getPostInfo():string{
        return `Post by ${this.userName}: Title: ${this.postTitle} Body: ${this.postBody.substring(0,10)}`;
    }
}

class ApiClient<T>{
    constructor(private baseUrl:string){}
     async getData(Ctor:new (...args:any[])=>T,id:number,endpoint:string):Promise<T>{
        try{
         const response = await axios.get(this.baseUrl+endpoint+"/"+id);
        let obj:T= new Ctor(response.data);
         return obj;
        }
        catch(error:any){
            console.error('שגיאה בקבלת הנתונים:', error); 
            throw error; 
        }
    }
}
class BlogPost implements Post{
     public  id:number;
     public userId:number;
     public title:string;
    public body:string;
      /** 
      constructor(     userId:number,
      id:number,
      title:string,
      body:string){
      this.userId = userId;
     this.id =id;
     this.title = title;
      this.body = body;
      }
      */
      constructor(params:{"id":number,"userId":number,"title":string,"email":string,"body":string}){
      this.id = params['id'];
      this.userId = params['userId']
      this.title = params['title'];
    this.body = params['body'];
    }
      public getSummary():string{
        return `${this.body.substring(0,10)}...`;
      }
}

class DataFetcher<T extends Post>{
    private url: string;
    constructor(api:string){
        this.url = api;
    }
    async fetchItem(Ctor:{ new (userId:number,
      id:number,
      title:string,
      body:string):T},id:number):Promise<T>{
        try{
         const response = await axios.get(this.url+id);
        let obj:T= new Ctor(id,id,
"Post"+id,
    response.data["title"]);
         return obj;
        }
        catch(error:any){
            console.error('שגיאה בקבלת הנתונים:', error); 
            throw error; 
        }
    }
}
async function fetchUserAndPost(postId:number):Promise<UserPost>{
   let post:ApiClient<Post> = new ApiClient<Post>("https://jsonplaceholder.typicode.com");
   let userAPI:ApiClient<User> = new ApiClient<User>("https://jsonplaceholder.typicode.com");
   let dataPost:Post = await post.getData(BlogPost,postId,'/posts');
   let user:User = await userAPI.getData(ActualUser, postId,'/users');
   let userPost:UserPost = new UserPost(user.name, user.email, dataPost.title,
    dataPost.body);
   return userPost;

}
/** 
let df:DataFetcher<BlogPost> = new DataFetcher<BlogPost>('https://jsonplaceholder.typicode.com/posts/');
df.fetchItem(BlogPost,1).then((res :BlogPost)=>{console.log(res.getSummary());}).catch((err:any)=>{console.log(err);});

//sunt aut f...
*/
fetchUserAndPost(1) 
    .then((info) => console.log(info.getPostInfo())) 
    .catch((error) => console.error("Error:", error.message)); 


//Post by Leanne Graham: Title: sunt aut facere repellat provident occaecati excepturi optio reprehenderit Body: quia et su