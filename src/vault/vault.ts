const userVault = "aav-user";

const vault = {
    getUser: () =>{
        let uvs = localStorage.getItem(userVault);
        if(uvs){
            return JSON.parse(uvs);
        }
        return null;
    },
    saveUser:(userObj:any)=>{
        let uos = JSON.stringify(userObj);
        localStorage.setItem(userVault,uos);
    },
    reset:()=>{
        localStorage.clear();
    },
    randomId:()=>{
        return `id-${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}`;
    }
}

export default vault;

