import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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


const GroceriesUpdate = (props) => {
    const { id } = useParams()
    const [name, setName] = useState("test")
    const [quantity, setQuantity] = useState()
    const [unit, setUnit] = useState()
    const [price, setPrice] = useState()

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        const grocery = api.getGroceryById(id).then((res) => {
            console.log("Component did mount")

            setName(res.data.data.name)
            setQuantity(res.data.data.quantity)
            setUnit(res.data.data.unit)
            setPrice(res.data.data.price)
        })

        return () => {
            console.log("Component will unmount")
        };
    }, []);

    const handleChangeInputName = async event => {
        const name = event.target.value
        setName(name)
        console.log(name)
    }
    
    const handleChangeInputQuantity = event => {
        const qty = event.target.validity.valid
            ? event.target.value
            : quantity
        setQuantity(qty)
    }
    
    const handleChangeInputUnit = event => {
        const unit = event.target.value
        setUnit(unit)
    }
    
    const handleChangeInputPrice = event => {
        const price = event.target.value
        setPrice(price)
    }
    
    const handleUpdateGrocery = async () => {
        // const { id, name, quantity, unit, price } = this.state
        const payload = { name, quantity, unit, price }
    
        await api.updateGroceryById(id, payload).then(res => {
            window.alert(`Grocery updated successfully`)
            
            setName('')
            setQuantity('')
            setUnit('')
            setPrice('')
        })
    }
    
    return (
        <Wrapper>
            <Title>Update Grocery</Title>

            <Label>Name: </Label>
            <InputText
                type="text"
                value={name}
                onChange={handleChangeInputName}
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
                onChange={handleChangeInputQuantity}
            />

            <Label>Unit: </Label>
            <InputText
                type="text"
                value={unit}
                onChange={handleChangeInputUnit}
            />

            <Label>Price: </Label>
            <InputText
                type="text"
                value={price}
                onChange={handleChangeInputPrice}
            />

            <Button onClick={handleUpdateGrocery}>Update Grocery</Button>
            <CancelButton href={'/groceries/list'}>Cancel</CancelButton>
        </Wrapper>
    )
}


export default GroceriesUpdate