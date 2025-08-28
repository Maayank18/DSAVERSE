import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  courseSectionData: [],
  courseEntireData: {},
  completedLectures: {},   // ✅ keyed by courseId -> array of lectureIds (strings)
  totalNoOfLectures: 0,
}

const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload || []
    },
    setEntireCourseData: (state, action) => {
      state.courseEntireData = action.payload || {}
    },
    setTotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload || 0
    },

    setCompletedLectures: (state, action) => {
      // defensive: action.payload might be undefined or not the expected shape
      const payload = action.payload || {};
      const { courseId, lectures } = payload;

      // if courseId is missing, do nothing
      if (!courseId) {
        return;
      }

      state.completedLectures[courseId] = Array.isArray(lectures)
        ? lectures.map((id) => String(id))
        : [];
    },

    updateCompletedLectures: (state, action) => {
      const { courseId, lectureId } = action.payload
      if (!Array.isArray(state.completedLectures[courseId])) {
        state.completedLectures[courseId] = []
      }
      state.completedLectures[courseId].push(String(lectureId))
    },

    toggleLectureCompletion: (state, action) => {
      const { courseId, subSecId } = action.payload
      if (!Array.isArray(state.completedLectures[courseId])) {
        state.completedLectures[courseId] = []
      }
      const id = String(subSecId)
      if (state.completedLectures[courseId].includes(id)) {
        state.completedLectures[courseId] =
          state.completedLectures[courseId].filter((lecId) => lecId !== id)
      } else {
        state.completedLectures[courseId].push(id)
      }
    },
  },
})

export const {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  setCompletedLectures,
  updateCompletedLectures,
  toggleLectureCompletion,
} = viewCourseSlice.actions

export default viewCourseSlice.reducer
