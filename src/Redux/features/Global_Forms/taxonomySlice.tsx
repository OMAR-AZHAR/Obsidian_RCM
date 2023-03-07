import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  taxonomy_id: 0,
  taxonomy_code: "",
  taxo_description: "",
};
export const taxonomySlice = createSlice({
  name: "taxonomySlice",
  initialState,
  reducers: {
    //

    SetTaxonomyId: (state, action) => {
      state.taxonomy_id = action.payload;
    },
    SetTaxonomyCode: (state, action) => {
      state.taxonomy_code = action.payload;
    },
    SetTaxonomyDescription: (state, action) => {
      state.taxo_description = action.payload;
    },
  },
});
export const { SetTaxonomyId, SetTaxonomyCode, SetTaxonomyDescription } =
  taxonomySlice.actions;
export default taxonomySlice.reducer;
