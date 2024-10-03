import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs, Firestore, Timestamp, doc, deleteDoc, updateDoc, QuerySnapshot } from 'firebase/firestore';
import { Thought } from '../../types/thoughtType';

type ThoughtRecord = Record<string, Thought>;

type ExtraArgument = {
    db: Firestore;
};

const serializeFirestoreData = (data: any): any => {
    if (data instanceof Timestamp) {
        return data.toDate().toISOString();
    } else if (Array.isArray(data)) {
        return data.map(serializeFirestoreData);
    } else if (typeof data === 'object' && data !== null) {
        return Object.entries(data).reduce((acc, [key, value]) => {
            acc[key] = serializeFirestoreData(value);
            return acc;
        }, {} as Record<string, any>);
    }
    return data;
};

export const fetchThoughts = createAsyncThunk<ThoughtRecord, void, { extra: ExtraArgument }>(
    'thoughts/fetchThoughts',
    async (_, { extra }) => {

        const querySnapshot = await getDocs(collection(extra.db, 'thoughts'));
        const thoughts = querySnapshot.docs.reduce((acc, doc) => {
            const data = doc.data();
            const serializedData = serializeFirestoreData(data);
            acc[doc.id] = { id: doc.id, ...serializedData } as Thought;
            return acc;
        }, {} as ThoughtRecord);

        return thoughts;
    }
);

export const addThought = createAsyncThunk<Thought, Omit<Thought, 'id'>, { extra: ExtraArgument }>(
    'thoughts/addThought',
    async (thought, { extra }) => {
        const docRef = await addDoc(collection(extra.db, 'thoughts'), thought);
        return { id: docRef.id, ...thought };
    }
);

export const updateThought = createAsyncThunk<Thought, Thought, { extra: ExtraArgument }>(
    'thoughts/updateThought',
    async (thought: Thought, { extra }) => {
        const { id, ...thoughtData } = thought;
        await updateDoc(doc(extra.db, 'thoughts', id || ""), thoughtData);
        return thought;
    }
);

export const deleteThought = createAsyncThunk<string, string, { extra: ExtraArgument }>(
    'thoughts/deleteThought',
    async (id: string, { extra }) => {
        await deleteDoc(doc(extra.db, 'thoughts', id));
        return id;
    }
);
const initialState: Record<string, Thought> = {};
const thoughtsSlice = createSlice({
    name: 'thoughts',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchThoughts.fulfilled, (_, action) => {
                return action.payload;
            })
            .addCase(addThought.fulfilled, (state, action) => {
                if (action.payload.id) {
                    state[action.payload.id] = action.payload;
                }
            })
            .addCase(updateThought.fulfilled, (state, action) => {
                const { id } = action.payload;
                if (id) {
                    state[id] = action.payload;
                }
            })
            .addCase(deleteThought.fulfilled, (state, action) => {
                if (action.payload) {
                    delete state[action.payload];
                }
            });
    },
});


export default thoughtsSlice.reducer;