import React, { Component } from 'react';
import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import PostStatusFilter from '../post-status-filter'
import PostList from '../post-list'
import PostAddForm from '../post-add-form'
import styled from 'styled-components'
import nextId from "react-id-generator";

// import './app.css'


const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
`



export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                {label: 'Going to Learn React', important: false, like: false, id: nextId()},
                {label: 'Going to Learn Redux', important: false, like: false, id: nextId()},
                {label: 'JS LOVE', important: false, like: false, id: nextId()}      
            ],
            term: '',
            filter: 'all'
        };
        this.deleteItem = this.deleteItem.bind(this)
        this.addItem = this.addItem.bind(this)
        this.onToggleImportant = this.onToggleImportant.bind(this)
        this.onToggleLike = this.onToggleLike.bind(this)
        this.searchPost = this.searchPost.bind(this)
        this.onUpdateSearch = this.onUpdateSearch.bind(this)
        this.onFilterSelect = this.onFilterSelect.bind(this)
        
    }

    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id)
            
            const before = data.slice(0, index);
            const after = data.slice(index + 1);
            
            const newArr = [...before, ...after]

            return {
                data: newArr
            }
        })
    }

    addItem(body){
        const newItem = {
            label: body,
            important: false,
            id: nextId()
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem]
            return {
                data: newArr
            }
        })
    }
    

    onToggleImportant(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id)
            const old = data[index]
            const newItem = {...old, important: !old.important}
            
            const before = data.slice(0, index);
            const after = data.slice(index + 1);
            
            const newArr = [...before, newItem, ...after]
            return {
                data: newArr
            }
        })
    }

    onToggleLike(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id)
            const old = data[index]
            const newItem = {...old, like: !old.like}
            
            const before = data.slice(0, index);
            const after = data.slice(index + 1);
            
            const newArr = [...before, newItem, ...after]
            return {
                data: newArr
            }
        })
    }

    searchPost(items, term){
        if (term.length === 0){
            return items
        }
        
        return items.filter((item) => {
            return item.label.indexOf(term) > -1
        })
    }

    filterPost(items, filter){
        if(filter === 'like') {
            return items.filter(item => item.like)
        }else {
            return items
        }
    }

     onUpdateSearch(term) {
        this.setState({term})
    }

    onFilterSelect(filter) {
        this.setState({filter})
    }

    render() {
        const {data, term, filter} = this.state
        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;

        const visibilPosts = this.filterPost(this.searchPost(data, term), filter);

        return(
            <AppBlock>
                <AppHeader
                    liked={liked}
                    allPosts={allPosts}
                />
                <div className="search-panel d-flex">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />
                </div>
                <PostList 
                    posts={visibilPosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLike={this.onToggleLike}
                />
                <PostAddForm
                    onAdd={this.addItem}/>
            </AppBlock>
        )
    }

}

