// A mock function to mimic making an async request for data
export const fetchUsers = async () => {
    const response = await fetch("http://localhost:3001/api/users", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    const result: { data: any } = await response.json();
  
    return result;
  };

export const updateUser = async (id:string, firstName:string, lastName:string, email:string) => {
    const response = await fetch("http://localhost:3001/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, firstName, lastName, email }),
    });
    const result: { data: any } = await response.json();
  
    return result;
  };

export const deleteUser = async (id:string) => {
    const response = await fetch("http://localhost:3001/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const result: { data: any } = await response.json();
  
    return result;
  };

export const createUser = async (firstName:string, lastName:string, email:string) => {
    const response = await fetch("http://localhost:3001/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email }),
    });
    const result: { data: any } = await response.json();
  
    return result;
  };
  