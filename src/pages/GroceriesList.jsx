import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import api from '../api'

import styled from 'styled-components'

import 'react-table-6/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

class GroceriesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            groceries: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllGroceries().then(groceries => {
            this.setState({
                groceries: groceries.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { groceries, isLoading } = this.state
        console.log('TCL: GroceriesList -> render -> groceries', groceries)

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: 'Quantity',
                accessor: 'quantity',
                filterable: true,
            },
            {
                Header: 'Unit',
                accessor: 'unit',
                filterable: false,
            },
            {
                Header: 'Price',
                accessor: 'price',
                filterable: true,
                Cell: props => <span>₦{props.value}</span>,
            },
        ]

        let showTable = true
        if (!groceries.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={groceries}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default GroceriesList