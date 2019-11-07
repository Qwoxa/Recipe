const request = require("supertest");
const faker = require("faker");
const app = require("../../../server/app");
const mongoose = require("mongoose");

describe("Recipes routes", () => {
  const missingDataErr = {
    message: "Missing name or description",
    statusCode: 400
  };

  const notFoundError = {
    message: "Recipe is not found",
    statusCode: 404
  };

  const invalidIdError = {
    message: "Invalid id",
    statusCode: 400
  };

  let name, description;

  beforeEach(async () => {
    name = faker.name.title();
    description = faker.lorem.sentence();

    if (mongoose.connection.collections.recipes) {
      await mongoose.connection.collections.recipes.deleteMany({});
    }
  });

  describe("POST /api/recipes", () => {
    it("Replies with recipe when created", async () => {
      const response = await request(app)
        .post("/api/recipes")
        .send({ name, description });

      expect(response.status).toBe(201);
      expect(response.body.versions[0].name).toBe(name);
      expect(response.body.versions[0].description).toBe(description);
    });

    it("Throws an error if name or description is not specified", async () => {
      const response1 = await request(app)
        .post("/api/recipes")
        .send({ name });

      const response2 = await request(app)
        .post("/api/recipes")
        .send({ description });

      expect(response1.status).toBe(400);
      expect(response1.body.error).toEqual(missingDataErr);

      expect(response2.status).toBe(400);
      expect(response2.body.error).toEqual(missingDataErr);
    });
  });

  describe("GET /api/recipes", () => {
    it("Responds with empty array if the collection is empty", async () => {
      const response = await request(app).get("/api/recipes");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(0);
    });

    it("Responds with recipes if the collection is not empty", async () => {
      await request(app)
        .post("/api/recipes")
        .send({ name, description });

      const response = await request(app).get("/api/recipes");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);

      const recipe = response.body[0];
      expect(recipe.versions[0].name).toBe(name);
      expect(recipe.versions[0].description).toBe(description);
    });
  });

  describe("PATCH /api/recipes/:id", () => {
    it("Throws an error if the id is invalid", async () => {
      const response = await request(app)
        .patch("/api/recipes/randomid")
        .send({ name, description });

      expect(response.status).toBe(400);
      expect(response.body.error).toEqual(invalidIdError);
    });

    it("Throws an error if the id is not found", async () => {
      const response = await request(app)
        .patch("/api/recipes/5dc4082b1d693a418ebbbfb8")
        .send({ name, description });

      expect(response.status).toBe(404);
      expect(response.body.error).toEqual(notFoundError);
    });

    it("Handle changing name and description", async () => {
      const createdItem = await request(app)
        .post("/api/recipes")
        .send({ name, description });

      const newName = faker.name.title();
      const newDesc = faker.lorem.sentence();

      const response = await request(app)
        .patch(`/api/recipes/${createdItem.body._id}`)
        .send({ name: newName, description: newDesc });

      const versions = response.body.versions;
      expect(versions).toHaveLength(2);

      expect(versions[0].description).not.toBe(versions[1].description);
      expect(versions[0].name).not.toBe(versions[1].name);

      expect(versions[0].description).toBe(newDesc);
      expect(versions[0].name).toBe(newName);
    });

    it("Handle changing only name (duplicate desc from previous)", async () => {
      const createdItem = await request(app)
        .post("/api/recipes")
        .send({ name, description });

      const newName = faker.name.title();

      const response = await request(app)
        .patch(`/api/recipes/${createdItem.body._id}`)
        .send({ name: newName });

      const versions = response.body.versions;
      expect(versions).toHaveLength(2);

      // Description are the same
      expect(versions[0].description).toBe(versions[1].description);
      // Name has changed
      expect(versions[0].name).not.toBe(versions[1].name);
      expect(versions[0].name).toBe(newName);
    });

    it("Handle changing only desc (duplicate name from previous)", async () => {
      const createdItem = await request(app)
        .post("/api/recipes")
        .send({ name, description });

      const newDesc = faker.lorem.sentence();

      const response = await request(app)
        .patch(`/api/recipes/${createdItem.body._id}`)
        .send({ description: newDesc });

      const versions = response.body.versions;
      expect(versions).toHaveLength(2);

      // Description are the same
      expect(versions[0].name).toBe(versions[1].name);
      // Name has changed
      expect(versions[0].description).not.toBe(versions[1].description);
      expect(versions[0].description).toBe(newDesc);
    });
  });

  describe("DELETE /api/recipes/:id", () => {
    it("Throws an error if the id is invalid", async () => {
      const response = await request(app).delete("/api/recipes/randomid");

      expect(response.status).toBe(400);
      expect(response.body.error).toEqual(invalidIdError);
    });

    it("Throws an error if the id is not found", async () => {
      const response = await request(app).delete(
        "/api/recipes/5dc4082b1d693a418ebbbfb8"
      );

      expect(response.status).toBe(404);
      expect(response.body.error).toEqual(notFoundError);
    });

    it("Deletes the recipe", async () => {
      const createdItem = await request(app)
        .post("/api/recipes")
        .send({ name, description });

      const response = await request(app).delete(
        `/api/recipes/${createdItem.body._id}`
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual(createdItem.body);
    });
  });
});
