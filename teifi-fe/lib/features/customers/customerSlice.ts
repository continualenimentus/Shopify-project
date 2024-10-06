import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createUser, fetchUsers, updateUser, deleteUser } from "./customerAPI";


export interface CustomerSliceState {
  users: [];
  status: "idle" | "loading" | "failed";
}

const initialState: CustomerSliceState = {
  users: [],
  status: "idle",
};

export const customerSlice = createAppSlice({
  name: "customer",
  initialState,
  reducers: (create) => ({
    createNewUser: create.asyncThunk(
        async ({ firstName, lastName, email }: { firstName: string, lastName: string, email: string }): Promise<any> => {
            const response = await createUser(firstName, lastName, email);
            return response.data;
        },
        {
            pending: (state) => {
            state.status = "loading";
            },
            fulfilled: (state, action) => {
            state.status = "idle";
            state.users = action.payload;
            },
            rejected: (state) => {
            state.status = "failed";
            },
        },
    ),
    getUsers: create.asyncThunk(
        async () => {
            const response = await fetchUsers();
            return response.data;
        },
        {
            pending: (state) => {
            state.status = "loading";
            },
            fulfilled: (state, action) => {
            state.status = "idle";
            state.users = action.payload;
            },
            rejected: (state) => {
            state.status = "failed";
            },
        },
    ),
    updateCurrentUser: create.asyncThunk(
        async ({ id, firstName, lastName, email }: { id: string, firstName: string, lastName: string, email: string }) => {
            const response = await updateUser(id, firstName, lastName, email);
            return response.data;
        },
        {
            pending: (state) => {
            state.status = "loading";
            },
            fulfilled: (state, action) => {
            state.status = "idle";
            // TODO will check this one 
            state.users = action.payload;
            },
            rejected: (state) => {
            state.status = "failed";
            },
        },
    ),
    deleteCurrentUser: create.asyncThunk(
        async (id: string) => {
            const response = await deleteUser(id);
            return response.data;
        },
        {
            pending: (state) => {
            state.status = "loading";
            },
            fulfilled: (state, action) => {
            state.status = "idle";
            state.users = action.payload;
            },
            rejected: (state) => {
            state.status = "failed";
            },
        },
    ),
  }),
  selectors: {
    selectUsers: (users) => users.users,
  },
});

// Action creators are generated for each case reducer function.
export const { createNewUser, getUsers, updateCurrentUser, deleteCurrentUser } =
  customerSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectUsers } = customerSlice.selectors;