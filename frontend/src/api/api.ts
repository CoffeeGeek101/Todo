import axios from "axios";

export interface task {
  title ?: string;
  status ?: string;
  description ?: string;
  category ?: string;
  priority ?: string;
  name ?: string;
}

export default class api {
  baseUrl = "http://localhost:8002/api";

  fetchCategoryTitle = async (categoryId : any) => {
    try {
      const res = await axios.get(`${this.baseUrl}/resource/Category/${categoryId}`, {
        params: {
          fields: JSON.stringify(["title"]),
        },
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
      // console.log(res.data.data.title)
      return res.data.data.title;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  getTasks = async () => {
    try {
      const res = await axios.get(`${this.baseUrl}/resource/Actions`, {
        params: {
          fields: JSON.stringify(["title", "description", "priority", "category", "status", "name"]),
        },
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
  
      const tasks = res.data.data.map(async (task : task) => {
        const categoryTitle = await this.fetchCategoryTitle(task.category); 
        return {
          ...task,
          category: categoryTitle, 
        };
      });
  
      const resolvedTasks = await Promise.all(tasks);
  
      return resolvedTasks;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  createTask = async (payload: task) => {
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
        }else{
          categoryId = categorycheck.data.data[0].name;
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

  updateTask = async (payload: task) => {
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
        }else{
          categoryId = categorycheck.data.data[0].name;
        }

        const res = await axios.put(`${this.baseUrl}/resource/Actions/${payload.name}`,{
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
    }catch(err){
      console.log(err);
    }
  }
}
