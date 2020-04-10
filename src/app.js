const express = require("express");
const cors = require("cors");

 const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const Arrayrepository = [];

//listagem dos repositorios
app.get("/repositories", (request, response) => {
    return response.json(Arrayrepository);
});

//criação dos repositorios
app.post("/repositories", (request, response) => {
    const {title, url, techs } = request.body;   //pegou dados do body
    
    const Objrepositories = { id:uuid(), title, url, techs, likes:0, }   //colocou em objeto
    
    Arrayrepository.push(Objrepositories);   //adicionou objto ao repositoio

    return response.json(Objrepositories);   
});



app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;                   //guarda id do paramento
  const {title, url, techs } = request.body;     //guarda dados do corto da requisição
  
   const indexrepo = Arrayrepository.findIndex(repo => repo.id == id);

   if(indexrepo < 0 )   //teste repositorio existe
     {
        return response.status(400).json({error: 'Repositories invalid' })
     }

     const ArmRepo = {   //monsta em um objeto os dados recuperados
           id,
           title,
           url,
           techs,
           likes: Arrayrepository[indexrepo].likes,  //deixa o mesmo numero de likes que existia
     }

     Arrayrepository[indexrepo] = ArmRepo;

     return response.json(ArmRepo);

});

app.delete("/repositories/:id", (request, response) => {
    // TODO
      const {id} = request.params;    //pegou o id do repositorio
      
      const findindexrepo = Arrayrepository.findIndex(repo => repo.id == id);  // busca o id no repositorio

      if( findindexrepo >= 0) {   // se existir repositorio remove
          Arrayrepository.splice(findindexrepo,1);  
        } 
      else {
         return response.status(400).json({error: 'Repository does not exists' });
        }
  
  return response.status(204).send();  //retorna success
    
  });

app.post("/repositories/:id/like", (request, response) => {
  // TODO
     const {id} = request.params;


     const indexrepo = Arrayrepository.findIndex(repo => repo.id == id);

     if( indexrepo < 0) { 
       return response.status(400).json({error: 'Repositories not Found'})
     }
      
        Arrayrepository[indexrepo].likes += 1;

       return response.json(Arrayrepository[indexrepo]);
});

module.exports = app;
