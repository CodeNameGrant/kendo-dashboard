import React, { useState, useEffect } from "react";
import { ComboBox, DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { NumericTextBox } from '@progress/kendo-react-inputs';

const frequencies = [
  { id: "WEEKLY", text: "Weekly" },
  { id: "FORT_NIGHTLY", text: "Fortnightly" },
  { id: "FOUR_WEEKLY", text: "Four Weekly" },
];
const weekNumbers = [1, 2, 3, 4, 5, 6, 7];

export default function TaskForm({ task }) {
  const [frequency, setFrequency] = useState(null);
  const [selectedDays, setSelectedDays] = useState([])
  const [timesPerWeek, setTimesPerWeeks] = useState(1)

  useEffect(() => {
    setSelectedDays([]);
    setTimesPerWeeks(1);
  }, [frequency])

  const selectDayHandler = (selectedDay) => {
    switch (frequency.id) {
      case 'WEEKLY':
        // Get the first weekday of the cycle and use it to determine the days of the other weekdays
        const fristDay = selectedDay % 7 === 0 ? 7 : selectedDay % 7;
        const weekdays = [fristDay, fristDay + 7, fristDay + 14, fristDay + 21]

        if (selectedDays.includes(selectedDay)) {
          // Remove weekdays if the selected day is already selected
          setSelectedDays((prevState) => prevState.filter(day => !weekdays.includes(day)))
        } else {
          setSelectedDays((prevState) => [...prevState, ...weekdays])
        }
        break;

      case 'FORT_NIGHTLY':
        const fortnightAway = selectedDay < 15 ? selectedDay + 14 : selectedDay - 14;
        setSelectedDays([selectedDay, fortnightAway])
        break;

      case 'FOUR_WEEKLY':
        setSelectedDays([selectedDay])
        break;

      default:
        break;
    }
  }

  return (
    <React.Fragment>
      <div>
        <ComboBox data={frequencies} id={"id"} textField={"text"} value={frequency} onChange={(e) => setFrequency(e.target.value)} />
        {frequency && frequency.id === 'WEEKLY' && (
          <><span>X </span><NumericTextBox
            format="n0"
            min={1}
            max={7}
            value={timesPerWeek}
            onChange={(e) => setTimesPerWeeks(e.target.value)}
          /></>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "20px repeat(7, 60px)",
          gridTemplateRows: "20px repeat(4, 40px)",
          rowGap: "5px",
          columnGap: "15px",
          marginTop: '50px'
        }}
      >
        <span></span>
        <strong>Mon</strong>
        <strong>Tues</strong>
        <strong>Wed</strong>
        <strong>Thu</strong>
        <strong>Fri</strong>
        <strong>Sat</strong>
        <strong>Sun</strong>

        <WeekRow week={1} firstDay={1} disabled={frequency === null} selectedDays={selectedDays} selectDay={selectDayHandler} />
        <WeekRow week={2} firstDay={8} disabled={frequency === null} selectedDays={selectedDays} selectDay={selectDayHandler} />
        <WeekRow week={3} firstDay={15} disabled={frequency === null} selectedDays={selectedDays} selectDay={selectDayHandler} />
        <WeekRow week={4} firstDay={22} disabled={frequency === null} selectedDays={selectedDays} selectDay={selectDayHandler} />
      </div>
    </React.Fragment>

  )
}

const WeekRow = ({ week, firstDay, disabled, selectedDays, selectDay }) => {
  let buttonRow = [];
  for (let i = firstDay; i < firstDay + 7; i++) {
    buttonRow.push(
      <Button key={i} togglable={true} disabled={disabled} selected={selectedDays.includes(i)} onClick={() => selectDay(i)}>
        {i}
      </Button>
    );
  }

  return (
    <>
      <strong>{week}</strong>
      {buttonRow}
    </>
  );
};
