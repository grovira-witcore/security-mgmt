import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAppContext } from '../../context/AppContext.js';
import TextBox from '../../components/TextBox.js';
import { getWords } from '../../utils/get-words.js';

const UsersBodyAction1 = ReactRouterDOM.withRouter(function ({ data, updateData, validated }) {
  const { i18n, setError } = useAppContext();
  const words = getWords(i18n.code);


  React.useEffect(() => {
  }, []);

  return (
    <div>
      <div>
        <div className="d-flex flex-wrap">
          <div className="pt-2 col-lg-6 col-md-12 col-sm-12 col-12">
            <TextBox
              label={words.firstName}
              value={data.firstName}
              onChange={(value) => updateData('firstName', value)}
              validated={validated}
              required
            />
          </div>
          <div className="pt-2 col-lg-6 col-md-12 col-sm-12 col-12">
            <TextBox
              label={words.lastName}
              value={data.lastName}
              onChange={(value) => updateData('lastName', value)}
              validated={validated}
              required
            />
          </div>
          <div className="pt-2 col-lg-6 col-md-12 col-sm-12 col-12">
            <TextBox
              label={words.email}
              value={data.email}
              onChange={(value) => updateData('email', value)}
              validated={validated}
              regex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
              regexText={words.invalidEmail}
              required
            />
          </div>
          <div className="pt-2 col-lg-6 col-md-12 col-sm-12 col-12">
            <TextBox
              label={words.password}
              value={data.password}
              onChange={(value) => updateData('password', value)}
              validated={validated}
              required
            />
          </div>
          <div className="pt-2 col-lg-6 col-md-12 col-sm-12 col-12">
            <TextBox
              label={words.phone}
              value={data.phone}
              onChange={(value) => updateData('phone', value)}
              validated={validated}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
})

export default UsersBodyAction1;
