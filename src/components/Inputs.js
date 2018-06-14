import React from 'react'
import PropTypes from 'prop-types'

const Inputs = ({onChangeFilter}) => (
    <div className="filters">
        <input type="text"
               placeholder="Name"
               name="name"
               onChange={e => onChangeFilter({name: e.target.value})}/>
        <input type="text"
               placeholder="Email"
               name="email"
               onChange={e => onChangeFilter({email: e.target.value})}/>
        <input type="text"
               placeholder="Address"
               name="address"
               onChange={e => onChangeFilter({address: e.target.value})}/>
    </div>
);

Inputs.propTypes = {
    onChangeFilter: PropTypes.func.isRequired
};

export default Inputs