import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class GroceriesInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            quantity: '',
            unit: '',
            price: '',
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputQuantity = async event => {
        const quantity = event.target.validity.valid
            ? event.target.value
            : this.state.quantity

        this.setState({ quantity })
    }

    handleChangeInputUnit = async event => {
        const unit = event.target.value
        this.setState({ unit })
    }

    handleChangeInputPrice = async event => {
        const price = event.target.value
        this.setState({ price })
    }

    handleIncludeGrocery = async () => {
        const { name, quantity, unit, price } = this.state
        // const arrayUnit = unit.split('/')
        const payload = { name, quantity, unit, price }

        await api.insertGrocery(payload).then(res => {
            window.alert(`Grocery inserted successfully`)
            this.setState({
                name: '',
                quantity: '',
                unit: '',
                price: '',
            })
        })
    }

    render() {
        const { name, quantity, unit, price } = this.state
        return (
            <Wrapper>
                <Title>Create Grocery</Title>

                <Label>Name: </Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={this.handleChangeInputName}
                />

                <Label>Quantity: </Label>
                <InputText
                    type="number"
                    step="0.1"
                    lang="en-US"
                    min="0"
                    max="10"
                    pattern="[0-9]+([,\.][0-9]+)?"
                    value={quantity}
                    onChange={this.handleChangeInputQuantity}
                />

                <Label>Unit: </Label>
                <InputText
                    type="text"
                    value={unit}
                    onChange={this.handleChangeInputUnit}
                />

                <Label>Price: </Label>
                <InputText
                    type="text"
                    value={price}
                    onChange={this.handleChangeInputPrice}
                />

                <Button onClick={this.handleIncludeGrocery}>Add Grocery</Button>
                <CancelButton href={'/groceries/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default GroceriesInsert