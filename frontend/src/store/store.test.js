import configureStore from "redux-mock-store";
import moxios from "moxios";
import thunk from "redux-thunk";
import * as types from "./types";
import * as actions from "./actions";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const dbresp = [
  {
    _id: "5dc4081af04d2941644de949",
    versions: [
      {
        changed: "2019-11-07T12:03:36.315Z",
        _id: "5dc4081af04d2941644de94a",
        name: "Test name",
        description: "Test desc"
      }
    ],
    createdDate: "2019-11-07T12:03:38.935Z"
  }
];

describe("store", () => {
  describe("actions", () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it("getRecipes", async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: dbresp
        });
      });

      const expectedActions = [
        { type: types.GET_RECIPES_REQUEST },
        { type: types.GET_RECIPES_SUCCESS, payload: dbresp }
      ];

      const store = mockStore({ recipes: [] });
      await store.dispatch(actions.getRecipes());

      expect(store.getActions()).toEqual(expectedActions);
    });

    it("createRecipe", async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 201,
          response: dbresp
        });
      });

      const expectedActions = [
        { type: types.CREATE_RECIPE_REQUEST },
        { type: types.CREATE_RECIPE_SUCCESS, payload: dbresp }
      ];

      const store = mockStore({ recipes: [] });
      await store.dispatch(
        actions.createRecipe({
          name: "Test name",
          description: "Test desc"
        })
      );

      expect(store.getActions()).toEqual(expectedActions);
    });

    it("removeRecipe", async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: dbresp
        });
      });

      const expectedActions = [
        { type: types.REMOVE_RECIPE_REQUEST },
        { type: types.REMOVE_RECIPE_SUCCESS, payload: dbresp }
      ];

      const store = mockStore({ recipes: [] });
      await store.dispatch(actions.removeRecipe("5dc4081af04d2941644de949"));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it("modifyRecipe", async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: "new state" // TODO
        });
      });

      const expectedActions = [
        { type: types.MODIFY_RECIPE_REQUEST },
        { type: types.MODIFY_RECIPE_SUCCESS, payload: "new state" }
      ];

      const store = mockStore({ recipes: [] });
      await store.dispatch(
        actions.modifyRecipe({
          id: "5dc4081af04d2941644de949",
          name: "Test 2"
        })
      );

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
