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
    return response.status(400).json({ "error": "repository that does not exist" });
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
    return response.status(400).json({ "error": "repository that does not exist" });
  }

  repositories.splice(respositorieIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  console.log(id);
  const respositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (respositorieIndex < 0) {
    return response.status(400).json({ "error": "repository that does not exist" });
  }

  repositories[respositorieIndex].likes++;

  return response.json(repositories[respositorieIndex].likes);


});

module.exports = app;
