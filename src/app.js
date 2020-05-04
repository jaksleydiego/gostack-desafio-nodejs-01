const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);

});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repositorie = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repositorie);
  return response.status(200).json(repositorie);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, techs, url } = request.body;
  const respositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
  if (respositorieIndex < 0) {
    return response.status(401).json({ "error": "escolha um repositório para fazer a atualização" });
  }

  repositorie = {
    title,
    techs,
    url
  }
  repositories[respositorieIndex] = repositorie;
  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const respositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (respositorieIndex < 0) {
    return response.status(401).json({ "error": "selecione um projeto" });
  }

  repositories.splice(respositorieIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const respositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (respositorieIndex < 0) {
    return response.status(401).json({ "error": "selecione um projeto" });
  }

  repositories[respositorieIndex].like = +1;

  return response.json(repositories[respositorieIndex].like);


});

module.exports = app;
