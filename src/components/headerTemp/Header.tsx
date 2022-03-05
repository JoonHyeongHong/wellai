import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Row, Col, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LoginModal from './LoginModal';

type link = {
  to: string;
  text: string;
};

const links: link[] = [
  { to: '/course', text: '코스탐색' },
  { to: '/mypage/report', text: '마이페이지' },
];

const logoName = 'WellAi.';

const Header = () => {
  const navigate = useNavigate();
  const access = Cookies.get('access');

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSignOut = () => {
    Cookies.remove('access');
    Cookies.remove('refresh');
    navigate('/');
  };
  const onSearch = (e: React.FormEvent<HTMLInputElement>) => {
    navigate('/search', { state: e.currentTarget.value });
  };

  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  });
  return (
    <Wrapper scrollLocation={scrollPosition}>
      <Row justify="space-between" align="middle">
        <Col
          style={{
            fontSize: '40px',
            fontWeight: 'bold',
          }}
        >
          <Link to="/">{logoName}</Link>
        </Col>
        <Col>
          <Row>
            <Col
              style={{
                fontSize: '15px',
                fontWeight: 'bold',
                marginRight: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Link to={'/course'}>{'코스탐색'}</Link>
            </Col>
            {access ? (
              <Col
                style={{
                  fontSize: '15px',
                  fontWeight: 'bold',
                  marginRight: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Link to={'/mypage/report'}>{'마이페이지'}</Link>
              </Col>
            ) : null}

            <Col>
              <Input
                suffix={<SearchOutlined />}
                placeholder="검색"
                allowClear
                onPressEnter={onSearch}
                style={{ width: 170, borderRadius: '20px' }}
              />
            </Col>
            {!access ? (
              <>
                <Col
                  style={{
                    marginLeft: '30px',
                  }}
                >
                  <Button
                    type="primary"
                    style={{
                      width: '100px',
                      borderRadius: '5px',
                    }}
                    onClick={() => setIsModalVisible(true)}
                  >
                    로그인
                  </Button>
                </Col>
                <Col
                  style={{
                    marginLeft: '7px',
                  }}
                >
                  <Button
                    type="primary"
                    style={{
                      width: '100px',
                      borderRadius: '5px',
                    }}
                    onClick={() => navigate('/signup')}
                  >
                    회원가입
                  </Button>
                </Col>
              </>
            ) : (
              <Col
                style={{
                  marginLeft: '30px',
                }}
              >
                <Button
                  type="primary"
                  style={{
                    width: '100px',
                    borderRadius: '5px',
                  }}
                  onClick={handleSignOut}
                >
                  로그아웃
                </Button>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      <LoginModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </Wrapper>
  );
};

type WrapperProps = {
  scrollLocation: number;
};
const Wrapper = styled.div<WrapperProps>`
  padding: 10px 60px;
  width: 100vw;
  min-width: 1000px;
  height: 80px;
  color: #574240;
  border-bottom: ${({ scrollLocation }) => (scrollLocation > 1 ? '1px solid lightgray' : '')};
  position: fixed;
  background-color: ${({ scrollLocation }) => (scrollLocation > 1 ? 'white' : 'transparent')};
  transition: background 0.5s, border 0.5s;
  z-index: 999;
`;

export default Header;
