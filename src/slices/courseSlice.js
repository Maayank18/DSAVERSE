// src/slices/courseSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  course: null,
  editCourse: false,
  paymentLoading: false,

  // progress / view state
  courseSectionData: [],
  courseEntireData: {},
  completedLectures: [],

  loading: false,
  error: null,
};

const ensureArray = (val) => {
  if (Array.isArray(val)) return val;
  if (val == null) return [];
  // if it's an object (e.g. {0: id, 1: id}) convert to values
  if (typeof val === "object") return Object.values(val).map((v) => String(v));
  // primitive => wrap
  return [String(val)];
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    // existing reducers
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setEditCourse: (state, action) => {
      state.editCourse = action.payload;
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload;
    },

    // reset original course-related bits
    resetCourseState: (state) => {
      state.step = 1;
      state.course = null;
      state.editCourse = false;
      state.paymentLoading = false;
      state.courseSectionData = [];
      state.courseEntireData = {};
      state.completedLectures = [];
      state.loading = false;
      state.error = null;
    },

    /* ---- progress / viewing reducers ---- */

    setCourseSectionData(state, action) {
      state.courseSectionData = action.payload ?? [];
    },
    setCourseEntireData(state, action) {
      state.courseEntireData = action.payload ?? {};
    },

    // replace completed lectures list (safe coercion)
    setCompletedLectures(state, action) {
      try {
        state.completedLectures = ensureArray(action.payload).map((id) => String(id));
      } catch (err) {
        console.warn("setCompletedLectures: failed to coerce payload to array", action.payload, err);
        state.completedLectures = [];
      }
    },

    // **defensive** update; will never throw if state.completedLectures is not iterable
    updateCompletedLectures(state, action) {
      // defensive coercion: ensure the state field is an array
      if (!Array.isArray(state.completedLectures)) {
        console.warn(
          "updateCompletedLectures: completedLectures had unexpected type:",
          typeof state.completedLectures,
          state.completedLectures
        );
        state.completedLectures = ensureArray(state.completedLectures);
      }

      const payload = action.payload;

      const normalize = (id) => (id == null ? null : String(id));
      const existingSet = new Set(state.completedLectures.map(normalize));

      if (Array.isArray(payload)) {
        payload.forEach((p) => {
          const id = normalize(p);
          if (id && !existingSet.has(id)) {
            state.completedLectures.push(id);
            existingSet.add(id);
          }
        });
      } else {
        const id = normalize(payload);
        if (id && !existingSet.has(id)) {
          state.completedLectures.push(id);
        }
      }
    },

    removeCompletedLecture(state, action) {
      const idToRemove = String(action.payload);
      state.completedLectures = ensureArray(state.completedLectures).filter((id) => String(id) !== idToRemove);
    },

    setLoading(state, action) {
      state.loading = !!action.payload;
    },
    setError(state, action) {
      state.error = action.payload ?? null;
    },
  },
});

export const {
  setStep,
  setCourse,
  setEditCourse,
  setPaymentLoading,
  resetCourseState,
  setCourseSectionData,
  setCourseEntireData,
  setCompletedLectures,
  updateCompletedLectures,
  removeCompletedLecture,
  setLoading,
  setError,
} = courseSlice.actions;

export default courseSlice.reducer;
