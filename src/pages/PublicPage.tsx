// import { Spin, Alert, Row, Col, Button, Divider, Menu } from 'antd';
// import { shallowEqual } from 'react-redux';
import styled from 'styled-components';
// import { useAppSelector, useAppDispatch } from '../hooks/useStoreHooks';
// import * as testActions from '../features/test';
import { Header } from 'components/headerTemp';
import { MyPageLayout } from 'components';

const PublicPage = () => {
  // const dispatch = useAppDispatch();
  // const { value } = useAppSelector((state) => state.test, shallowEqual);

  return (
    <Wrapper>
      <Header />
      <MyPageLayout />
    </Wrapper>
  );
};

export default PublicPage;

const Wrapper = styled.div``;
