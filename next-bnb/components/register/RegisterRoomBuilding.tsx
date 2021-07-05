import React, { useMemo } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import palette from "../../styles/palette";
import Selector from "../common/Selector";
import { largeBuildingTypeList } from "../../lib/staticData";
import { useSelector } from "../../store";
import { registerRoomAcitons } from "../../store/registerRoom";

const Container = styled.div`
  padding: 62px 30px 100px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }

  .register-room-building-selector-wrapper {
    width: 320px;
    margin-bottom: 32px;
  }
`;

const disabledLargeBuildingTypeOptions = ["하나를 선택해주세요"];

const RegisterRoomBuilding: React.FC = () => {
  const dispatch = useDispatch();
  const largeBuildingType = useSelector(
    (state) => state.registerRoom.largeBuildingType,
  );

  // eslint-disable-next-line consistent-return
  const detailBuildingOptions = useMemo(() => {
    // eslint-disable-next-line default-case
    switch (largeBuildingType) {
      case "아파트": {
        const { apartmentBuildingTypelist } = require("../../lib/staticData");
        dispatch(
          registerRoomAcitons.setBuildingType(apartmentBuildingTypelist[0]),
        );
        return apartmentBuildingTypelist;
      }
      case "주택": {
        const { hostBuildingTypeList } = require("../../lib/staticData");
        dispatch(registerRoomAcitons.setBuildingType(hostBuildingTypeList[0]));
        return hostBuildingTypeList;
      }
    }
  }, []);

  const onChangeLargetBuildingType = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch(registerRoomAcitons.setLargeBuildingType(event.target.value));
  };
  return (
    <Container>
      <h2>등록할 숙소 종류는 무엇인가요</h2>
      <h3>1단계</h3>
      <div className="register-room-building-selector-wrapper">
        <Selector
          type="register"
          value={largeBuildingType || undefined}
          defaultValue="하나를 선택해주세요"
          disabledOptions={disabledLargeBuildingTypeOptions}
          label="우선범위를 줄여볼까요?"
          options={largeBuildingTypeList}
          onChange={onChangeLargetBuildingType}
        />
      </div>
    </Container>
  );
};

export default RegisterRoomBuilding;
