import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from '@reduxjs/toolkit'
import { apiCallBegan } from './api'
import config from './config'
import _ from 'lodash'
import moment from 'moment-timezone'
const initialState = {
  loading: false,
  error: false,
  list: [],
  records: {},
  lastFetch: null,
}
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

const slice = createSlice({
  name: 'habits',
  initialState: initialState,
  reducers: {
    resetLastFetch: (habits, action) => {
      habits.lastFetch = null
    },
    resetHabits: (habits, action) => {
      Object.assign(habits, initialState)
    },
    errorLoadingHabits: (habits, action) => {
      habits.error = true
      habits.loading = false
      habits.lastFetch = Date.now()
    },
    habitsLoading: (habits, action) => {
      habits.loading = true
      habits.lastFetch = Date.now()
    },
    habitAdded: (habits, action) => {
      habits.list.push(action.payload)
    },
    habitRemoved: (habits, action) => {
      habits.list = habits.list.filter(
        (habit) => habit._id !== action.payload._id,
      )
      if (habits.records[action.payload._id])
        delete habits.records[action.payload._id]
    },
    habitUpdated: (habits, action) => {
      const index = habits.list.findIndex(
        (habit) => habit._id === action.payload._id,
      )
      habits.list[index] = action.payload
    },
    habitsReceived: (habits, action) => {
      habits.loading = false
      habits.error = false
      habits.lastFetch = Date.now()
      habits.list = action.payload
    },
    recordsReceived: (habits, action) => {
      habits.records = {}
      action.payload.forEach((record) => {
        if (record._habitId in habits.records)
          habits.records[record._habitId].push(
            _.pick(record, ['_id', 'completedAt']),
          )
        else
          habits.records[record._habitId] = [
            _.pick(record, ['_id', 'completedAt']),
          ]
      })
    },
    recordAdded: (habits, action) => {
      const record = action.payload
      if (record._habitId in habits.records)
        habits.records[record._habitId].push(
          _.pick(record, ['_id', 'completedAt']),
        )
      else
        habits.records[record._habitId] = [
          _.pick(record, ['_id', 'completedAt']),
        ]
      const habitId = habits.list.findIndex(
        (habit) => habit._id === record._habitId,
      )
      habits.list[habitId].previousRecord = record._id
    },
    recordRemoved: (habits, action) => {
      const record = action.payload
      habits.records[record._habitId] = habits.records[record._habitId].filter(
        (x) => x._id !== record._id,
      )
      const habitIndex = habits.list.findIndex(
        (habit) => habit._id === action.payload._habitId,
      )
      habits.list[habitIndex].previousRecord = null
    },
  },
})

//Action Types
const {
  habitAdded,
  habitRemoved,
  habitUpdated,
  habitsReceived,
  recordAdded,
  recordRemoved,
  recordsReceived,
  habitsLoading,
  errorLoadingHabits,
} = slice.actions
export const { resetHabits, resetLastFetch } = slice.actions
export default slice.reducer

//Action Creators
const url = '/habits'
export const loadHabits = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.habits
  if (lastFetch < Date.now() - 600000) {
    dispatch(
      apiCallBegan({
        baseURL: config.apiEndPoint,
        url,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('habit_auth_token')}`,
        },
        onStart: habitsLoading.type,
        onSuccess: habitsReceived.type,
        onError: errorLoadingHabits.type,
      }),
    )
  }
}

export const reloadHabit = (habit) => {
  return apiCallBegan({
    baseURL: config.apiEndPoint,
    url: `${url}/${habit._id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('habit_auth_token')}`,
    },
    onSuccess: habitUpdated.type,
  })
}

export const updateHabit = (habit) => {
  return apiCallBegan({
    baseURL: config.apiEndPoint,
    url: `${url}/${habit._id}`,
    method: 'put',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('habit_auth_token')}`,
    },
    data: _.pick(habit, ['name', 'color']),
    onSuccess: habitUpdated.type,
    onSuccessToast: 'Habit Updated',
  })
}
export const addHabit = (habit) => {
  return apiCallBegan({
    baseURL: config.apiEndPoint,
    url,
    method: 'post',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('habit_auth_token')}`,
    },
    data: _.pick(habit, ['name', 'color']),
    onSuccess: habitAdded.type,
    onSuccessToast: 'Habit Added',
  })
}
export const removeHabit = (habit) => {
  return apiCallBegan({
    baseURL: config.apiEndPoint,
    url: `${url}/${habit._id}`,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('habit_auth_token')}`,
    },
    onSuccess: habitRemoved.type,
    onSuccessToast: 'Habit Removed',
  })
}

const recordsURL = '/records'
export const loadRecords = () => {
  return apiCallBegan({
    baseURL: config.apiEndPoint,
    url: recordsURL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('habit_auth_token')}`,
    },
    onSuccess: recordsReceived.type,
  })
}

export const addRecordNow = (habitId) => {
  return apiCallBegan({
    baseURL: config.apiEndPoint,
    url: recordsURL,
    method: 'post',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('habit_auth_token')}`,
    },
    data: { _habitId: habitId },
    onSuccess: recordAdded.type,
    onSuccessToast: 'Record Added',
  })
}
export const addRecordPast = (habitId, timestamp) => {
  return apiCallBegan({
    baseURL: config.apiEndPoint,
    url: recordsURL,
    method: 'post',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('habit_auth_token')}`,
    },
    data: { _habitId: habitId, completedAt: timestamp },
    onSuccess: recordAdded.type,
    onSuccessToast: 'Record Added',
  })
}
export const removeRecord = (recordId) => {
  return apiCallBegan({
    baseURL: config.apiEndPoint,
    url: `${recordsURL}/${recordId}`,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('habit_auth_token')}`,
    },
    onSuccess: recordRemoved.type,
    onSuccessToast: 'Record Removed',
  })
}

//Selectors

export const getHabits = createSelector(
  (store) => store.entities.habits.list,
  (list) => list,
)

export const getHabitById = (_habitId) => (store) => {
  const habitIndex = store.entities.habits.list.findIndex(
    (habit) => habit._id === _habitId,
  )
  if (habitIndex !== -1) {
    return store.entities.habits.list[habitIndex]
  } else {
    return null
  }
}
export const getLoading = (store) => {
  return store.entities.habits.loading
}
export const getError = (store) => {
  return store.entities.habits.error
}
export const getPreviousRecord = (_habitId) => (store) => {
  const index = store.entities.habits.list.findIndex(
    (habit) => habit._id === _habitId,
  )

  if (index === -1) return null
  if (!store.entities.habits.list[index].previousRecord) return null
  return store.entities.habits.list[index].previousRecord
}

export const getRecordsByHabit = (startDay, endDay = null) => (store) => {
  const momentStartDay = moment(startDay)
  if (!endDay) endDay = moment(startDay).add(1, 'days').format('YYYY-MM-DD')
  const momentEndDay = moment(endDay)

  const { records } = store.entities.habits

  const recordObject = {}
  for (const _habitId in records) {
    records[_habitId].forEach((record) => {
      const momentRecord = moment(record.completedAt).tz(timeZone)

      if (momentRecord.isBetween(momentStartDay, momentEndDay)) {
        if (!recordObject[_habitId]) recordObject[_habitId] = []
        recordObject[_habitId].push(record)
      }
    })
  }
  return recordObject
}

const selectGetHabitRecords = createSelector(
  (store) => store.entities.habits.records,
  (_, _habitId) => _habitId,
  (_, __, day) => day,
  (records, _habitId, day) => {
    if (records[_habitId]) {
      if (!day) {
        return records[_habitId]
      } else {
        return records[_habitId].filter((record) => {
          const completedTime = moment(record.completedAt)
            .tz(timeZone)
            .format('YYYY-MM-DD')
          if (completedTime === day) {
            return true
          } else {
            return false
          }
        })
      }
    }

    return []
  },
)
export const getHabitRecords = (_habitId, day = null) => (store) =>
  selectGetHabitRecords(store, _habitId, day)

const selectGetHabitRecordsForLastYear = createSelector(
  (store) => store.entities.habits.records,
  (_, _habitId) => _habitId,
  (records, _habitId) => {
    const returnArray = []
    for (let i = 364; i >= 0; i--) {
      const selectedDate = moment()
        .tz(timeZone)
        .add(-i, 'days')
        .format('YYYY-MM-DD')
      if (!records[_habitId]) {
        returnArray.push({ value: selectedDate, amount: 0 })
      } else {
        const recordsOnSelectedDate = records[_habitId].filter(
          (record) =>
            moment(record.completedAt).tz(timeZone).format('YYYY-MM-DD') ===
            selectedDate,
        ).length
        returnArray.push({ value: selectedDate, amount: recordsOnSelectedDate })
      }
    }
    return returnArray
  },
)
export const getHabitRecordsForLastYear = (_habitId) => (store) =>
  selectGetHabitRecordsForLastYear(store, _habitId)

const selectGetHabitRecordsForLastMonth = createSelector(
  (store) => store.entities.habits.records,
  (_, _habitId) => _habitId,
  (records, _habitId) => {
    const returnArray = []
    for (let i = 30; i >= 0; i--) {
      const selectedDate = moment()
        .tz(timeZone)
        .add(-i, 'days')
        .format('YYYY-MM-DD')
      if (!records[_habitId]) {
        returnArray.push({ value: selectedDate, amount: 0 })
      } else {
        const recordsOnSelectedDate = records[_habitId].filter(
          (record) =>
            moment(record.completedAt).tz(timeZone).format('YYYY-MM-DD') ===
            selectedDate,
        ).length
        returnArray.push({ value: selectedDate, amount: recordsOnSelectedDate })
      }
    }
    return returnArray
  },
)
export const getHabitRecordsForLastMonth = (_habitId) => (store) =>
  selectGetHabitRecordsForLastMonth(store, _habitId)

const selectGetHabitRecordsForLastWeek = createSelector(
  (store) => store.entities.habits.records,
  (_, _habitId) => _habitId,
  (records, _habitId) => {
    const returnArray = []
    for (let i = 6; i >= 0; i--) {
      const selectedDate = moment()
        .tz(timeZone)
        .add(-i, 'days')
        .format('YYYY-MM-DD')
      if (!records[_habitId]) {
        returnArray.push({ value: selectedDate, amount: 0 })
      } else {
        const recordsOnSelectedDate = records[_habitId].filter(
          (record) =>
            moment(record.completedAt).tz(timeZone).format('YYYY-MM-DD') ===
            selectedDate,
        ).length
        returnArray.push({ value: selectedDate, amount: recordsOnSelectedDate })
      }
    }
    return returnArray
  },
)
export const getHabitRecordsForLastWeek = (_habitId) => (store) =>
  selectGetHabitRecordsForLastWeek(store, _habitId)

const selectGetRecordDayTimeMap = createSelector(
  (store) => store.entities.habits.records,
  (_, day) => day,
  (records, day) => {
    const includedRecords = {}
    const timeMap = []
    for (const _habitId in records) {
      records[_habitId].forEach((record) => {
        if (
          moment(record.completedAt).tz(timeZone).format('YYYY-MM-DD') === day
        ) {
          includedRecords[record._id] = { ...record, _habitId }
          let recordHour = moment(record.completedAt).tz(timeZone).format('HH')
          let timeMapIndex = timeMap.findIndex(
            (time) => time.id === Number(recordHour),
          )
          if (timeMapIndex !== -1) {
            timeMap[timeMapIndex].records.push({
              _id: record._id,
              completedAt: record.completedAt,
              _habitId: _habitId,
            })
          } else {
            const recordArray = []
            recordArray.push({
              _id: record._id,
              completedAt: record.completedAt,
              _habitId: _habitId,
            })
            timeMap.push({ id: Number(recordHour), records: recordArray })
          }
        }
      })
    }
    timeMap.sort((a, b) => {
      if (a.id > b.id) return 1
      if (b.id > a.id) return -1
      return 0
    })
    timeMap.forEach((timeObject) => {
      timeObject.records.sort((a, b) => {
        if (a.completedAt > b.completedAt) return 1
        if (b.completedAt > a.completedAt) return -1
        return 0
      })
    })

    return [timeMap, includedRecords]
  },
)
export const getRecordDayTimeMap = (day) => (store) =>
  selectGetRecordDayTimeMap(store, day)

const selectGetStreaks = createSelector(
  (store) => store.entities.habits.records,
  (_, _habitId) => _habitId,
  (records, _habitId) => {
    const streaks = { longestStreak: 0, currentStreak: 0 }

    if (records[_habitId]) {
      const sortableRecords = [...records[_habitId]]
      let longestStreak = 0
      let currentStreak = 0
      let lastCompleted = null
      sortableRecords.sort((a, b) => {
        if (a.completedAt < b.completedAt) return -1
        if (a.completedAt > b.completedAt) return 1
        return 0
      })

      sortableRecords.forEach((record) => {
        if (!lastCompleted) {
          lastCompleted = record.completedAt
          currentStreak = 1
        } else {
          if (
            moment(lastCompleted).tz(timeZone).format('YYYY-MM-DD') ===
            moment(record.completedAt)
              .tz(timeZone)
              .add(-1, 'days')
              .format('YYYY-MM-DD')
          ) {
            currentStreak += 1
          } else if (
            moment(lastCompleted)
              .tz(timeZone)
              .isBefore(
                moment(record.completedAt)
                  .tz(timeZone)
                  .add(-1, 'days')
                  .format('YYYY-MM-DD'),
              )
          ) {
            currentStreak = 1
          }
          lastCompleted = record.completedAt
        }
        if (currentStreak > longestStreak) longestStreak = currentStreak
      })

      if (
        moment(sortableRecords[sortableRecords.length - 1].completedAt)
          .tz(timeZone)
          .format('YYYY-MM-DD') !==
          moment().tz(timeZone).format('YYYY-MM-DD') &&
        moment(sortableRecords[sortableRecords.length - 1].completedAt)
          .tz(timeZone)
          .format('YYYY-MM-DD') !==
          moment().tz(timeZone).add(-1, 'days').format('YYYY-MM-DD')
      ) {
        currentStreak = 0
      }
      streaks.currentStreak = currentStreak
      streaks.longestStreak = longestStreak
    }

    return streaks
  },
)
export const getStreaks = (_habitId) => (store) =>
  selectGetStreaks(store, _habitId)

const selectGetBasicStats = createSelector(
  (store) => store.entities.habits.records,
  (_, _habitId) => _habitId,
  (records, _habitId) => {
    const basicStats = {
      lastMonthCount: 0,
      lastWeekCount: 0,
      lastYearCount: 0,
      lastMonthAvg: 0,
      lastWeekAvg: 0,
      lastYearAvg: 0,
    }

    if (records[_habitId]) {
      const sortedRecords = [...records[_habitId]]
      sortedRecords.sort((a, b) => {
        if (a.completedAt < b.completedAt) return -1
        if (a.completedAt > b.completedAt) return 1
        return 0
      })

      const lastMonthCount = sortedRecords.filter((record) => {
        if (
          moment(record.completedAt)
            .tz(timeZone)
            .isBetween(
              moment(moment().format('YYYY-MM-DD'))
                .tz(timeZone)
                .add(-30, 'days'),
              moment().tz(timeZone),
            )
        )
          return true
        return false
      }).length
      const lastYearCount = sortedRecords.filter((record) => {
        if (
          moment(record.completedAt)
            .tz(timeZone)
            .isBetween(
              moment(moment().format('YYYY-MM-DD'))
                .tz(timeZone)
                .add(-365, 'days'),
              moment().tz(timeZone),
            )
        )
          return true
        return false
      }).length
      const lastWeekCount = sortedRecords.filter((record) => {
        if (
          moment(record.completedAt)
            .tz(timeZone)
            .isBetween(
              moment(moment().format('YYYY-MM-DD'))
                .tz(timeZone)
                .add(-6, 'days'),
              moment().tz(timeZone),
            )
        )
          return true
        return false
      }).length

      if (lastMonthCount !== 0) {
        basicStats.lastMonthCount = lastMonthCount
        basicStats.lastMonthAvg = Math.round((lastMonthCount / 30) * 100) / 100
      }
      if (lastWeekCount !== 0) {
        basicStats.lastWeekCount = lastWeekCount
        basicStats.lastWeekAvg = Math.round((lastWeekCount / 7) * 100) / 100
      }
      if (lastYearCount !== 0) {
        basicStats.lastYearCount = lastYearCount
        basicStats.lastYearAvg = Math.round((lastYearCount / 365) * 100) / 100
      }
    }

    return basicStats
  },
)

export const getBasicStats = (_habitId) => (store) =>
  selectGetBasicStats(store, _habitId)
