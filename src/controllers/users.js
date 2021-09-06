const path = require('path');
const fs = require('fs');
const { v4: uuid4 } = require('uuid');

let usersList;
const pathUsers = path.join(__dirname, '../database/users.json');

if(fs.existsSync(pathUsers)){
    usersList = JSON.parse(fs.readFileSync(pathUsers, {encoding:'utf-8'}));
}else{
    fs.writeFileSync( pathUsers, JSON.stringify([]) );
    usersList = JSON.parse(fs.readFileSync(pathUsers, {encoding:'utf-8'}));
}

const usersController = {
    list: (req, res)=>{
        res.status(200).json({
            info: {
                status: 200,
                length: usersList.length,
                path: `/api/users/`
            },
            users: usersList
        });
    },
    user: (req, res)=>{

        const data = usersList.find( resp => resp.id === req.params.id);
        if(!data){
            res.status(200).json({
                info: {
                    status: 200,
                    length: 0,
                    path: `/api/users/${req.params.id}`
                },
                users: {}
            });
            return;    
        }
        res.status(200).json({
            info: {
                status: 200,
                length: 1,
                path: `/api/users/${req.params.id}`
            },
            users: data
        });
    }
    ,
    store: (req, res)=>{

        const user = {
            id: uuid4(),
            date: new Date().toISOString(),
            ...req.body
        }
        usersList.push( user );
        fs.writeFileSync( pathUsers, JSON.stringify( usersList, null, 2 ));

        res.status(200).json({
            info: {
                status: 200,
                length: usersList.length,
                path: `/api/users/create`
            },
            users: user
        });
    },
    edit: (req, res)=>{

        const data = usersList.find( resp => resp.id === req.params.id );
        
        if(!data){
            res.status(200).json({
                info: {
                    status: 200,
                    length: 0,
                    path: `/api/users/update/${req.params.id}`
                },
                users: {}
            });
            return;
        }

        data.nombre = req.body.nombre;
        data.edad = req.body.edad;
        data.email = req.body.email;
        data.update = new Date().toISOString();

        fs.writeFileSync( pathUsers, JSON.stringify(usersList, null , 2));

        res.status(200).json({
            info: {
                status: 200,
                length: usersList.length,
                path: `/api/users/update/${req.params.id}`
            },
            users: data
        });

    },
    destroy: (req, res)=>{
        const pos = usersList.findIndex(resp => resp.id === req.params.id );
        if(pos < 0){
            res.status(200).json({
                info: {
                    status: 200,
                    length: 0,
                    path: `/api/users/delete/${req.params.id}`
                },
                users: {}    
            });
            return;
        }

        
        const data = usersList.splice(pos,1);
        fs.writeFileSync(pathUsers, JSON.stringify( usersList, null , 2 ));
        
        res.json({
            info: {
                status: 200,
                length: usersList.length,
                path: `/api/users/delete/${req.params.id}`
            },
            users: data
         });
    }
} 

module.exports = usersController;