import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import api from '../api'

import styled from 'styled-components'

import 'react-table-6/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`
// styling for update button
const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`
// styling for delete button
const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateGrocery extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/groceries/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteGrocery extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do you want to delete the grocery ${this.props.id} permanently?`,
            )
        ) {
            api.deleteGroceryById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

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
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteGrocery id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateGrocery id={props.original._id} />
                        </span>
                    )
                },
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