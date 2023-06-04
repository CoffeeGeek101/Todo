import axios from "axios";

type status = string;

export interface task {
  title: string;
  status: status;
  description: string;
  category: string;
  priority: string;
}

export default class api {
  baseUrl = "http://localhost:8002/api";

  getTasks = async (Status: status) => {
    try {
      const res = await axios.get(`${this.baseUrl}/resource/Actions`, {
        params: {
          fields: ["title", "description"],
          filters: [["status", "=", Status]],
        },
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  createTask = async (payload: task) => {
    console.log(payload.category);
    try {
        const categorycheck = await axios.get(`${this.baseUrl}/resource/Category`,{
            params : {
                fields : JSON.stringify(["name"]),
                filters : JSON.stringify([["title", "=", payload.category]]),
            },
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            }
        });

        console.log(categorycheck.data.data);

        let categoryId = null;

        if(categorycheck.data.data.length === 0){
            const res = await axios.post(`${this.baseUrl}/resource/Category`,{
                title : payload.category
            },{
                headers : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json"
                }
            });
            categoryId = res.data.data.name;
            console.log(res.data)
            console.log(categoryId)
        }else{
          categoryId = categorycheck.data.data[0].name;
          console.log(categorycheck.data)
          console.log(categoryId)
        }

        // console.log(categoryId)

        const res = await axios.post(`${this.baseUrl}/resource/Actions`,{
            title : payload.title,
            description : payload.description,
            status : payload.status,
            priority : payload.priority,
            category : categoryId
        },{
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            }
        });
        console.log(res.statusText);
        // return res.statusText;
    }catch(err){
      console.log(err);
    }
  };
}
