import { Button, Modal, styled } from "@mui/material";
import React, { useState } from "react";
import { ReactComponent as ScheduleImage } from "../schedule-image.svg";
import axios from "axios";

export const ScheduleHelp = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [timeSheetFromBack, setTimeSheetFromBack] = useState({
    date: null,
    fullName: "",
    position: "",
  });
  const [timeSheetFromInput, setTimeSheetFromInput] = useState({
    firstMinutes: 0,
    firstSeconds: 0,
    secondMinutes: 0,
    secondSeconds: 0,
  });
  const getById = async (id = 1) => {
    try {
      const response = await axios.get(
        "http://10.10.10.51:8080/api/timesheets/66"
      );
      console.log(response.data);
      setTimeSheetFromBack({
        date: response.data.date,
        fullName: response.data.fullName,
        position: response.data.position,
      });
      setTimeSheetFromInput({
        firstMinutes: 0,
        firstSeconds: 0,
        secondMinutes: 0,
        secondSeconds: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateSchedule = async (
    id = 1,
    doctorId = 8,
    scheduleDate = "2023-11-01"
  ) => {
    try {
      console.log(timeSheetFromInput);

      const response = await axios.patch(
        `http://10.10.10.51:8080/api/timesheets?doctorId=${doctorId}&scheduleDate=${scheduleDate}`,
        [
          {
            newStartTime: `${timeSheetFromInput.firstMinutes}:${timeSheetFromInput.firstSeconds}`,
            newEndTime: `${timeSheetFromInput.secondMinutes}:${timeSheetFromInput.secondSeconds}`,
          },
        ]
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  const onChangeValue = (e) => {
    setTimeSheetFromInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div>
      <ScheduleImage
        onClick={() => {
          setIsOpenModal(true);
          getById();
        }}
      />
      <StyledModal open={isOpenModal}>
        <StyledContent>
          <p>Отделение: {timeSheetFromBack.position}</p>
          <p>Специалист: {timeSheetFromBack.fullName}</p>
          <p>Дата: {timeSheetFromBack.date}</p>
          <StyledWrapperForm>
            График:
            <StyledForm>
              <StyledInput
                type="number"
                placeholder="00ч"
                min={0}
                max={59}
                onChange={onChangeValue}
                name="firstMinutes"
                value={timeSheetFromInput.firstMinutes}
              />
              <StyledInput
                type="number"
                placeholder="00м"
                min={0}
                max={59}
                onChange={onChangeValue}
                name="firstSeconds"
                value={timeSheetFromInput.firstSeconds}
              />
              -
              <StyledInput
                type="number"
                placeholder="00ч"
                min={0}
                max={59}
                onChange={onChangeValue}
                name="secondMinutes"
                value={timeSheetFromInput.secondMinutes}
              />
              <StyledInput
                type="number"
                placeholder="00м"
                min={0}
                max={59}
                onChange={onChangeValue}
                name="secondSeconds"
                value={timeSheetFromInput.secondSeconds}
              />
            </StyledForm>
            <div>
              <Button variant="outlined" onClick={() => setIsOpenModal(false)}>
                Отменить
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  updateSchedule();
                  setIsOpenModal(false);
                }}
              >
                Сохранить
              </Button>
            </div>
          </StyledWrapperForm>
        </StyledContent>
      </StyledModal>
    </div>
  );
};

const StyledForm = styled("form")({
  display: "flex",
  gap: "5px",
});

const StyledWrapperForm = styled("div")({
  display: "flex",
  gap: "20px",
});

const StyledInput = styled("input")({
  width: "60px",
  padding: "5px",
  border: "1px solid black",
  borderRadius: "5px",
});

const StyledContent = styled("div")({
  backgroundColor: "#fff",
  padding: "40px",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});

const StyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  ":focus, :active": {
    border: "none",
  },
});
