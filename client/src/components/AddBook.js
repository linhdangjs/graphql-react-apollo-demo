import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo'
import { getBooksQuery, getAuthorsQuery, addBookMutation } from '../queries/queries';

class AddBook extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            genre: '',
            authorId: ''
        };
    }
    displayAuthors = () => {
        var data = this.props.getAuthorsQuery;
        if(data.loading) {
            return (<option disabled>Loading Authors...</option>)
        } else {
            return (
                data.authors.map(author => {
                    return (
                        <option key={author.id} value={author.id}>{author.name}</option>
                    )
                })
            )
        }
    }
    submitForm = (e) => {
        e.preventDefault();
        const { name, genre, authorId } = this.state;
        if( name !== '' && genre !== '' && authorId !== ''){
            this.props.addBookMutation({
                variables: {
                    ...this.state
                },
                refetchQueries: [{
                    query: getBooksQuery
                }]
            });
        }
        
    }
    render(){
        return(
            <form id="add-book" onSubmit={this.submitForm}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={ (e) => this.setState({ name: e.target.value }) } />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={ (e) => this.setState({ genre: e.target.value }) } />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={ (e) => this.setState({ authorId: e.target.value }) } >
                        <option disabled>Select author</option>
                        {this.displayAuthors()}
                    </select>
                </div>
                <button>+</button>
            </form>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);