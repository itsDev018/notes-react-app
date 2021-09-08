import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateNote extends Component{

  state = {
    users: [],
    userSelected: '',
    title: '',
    description: '',
    date: new Date(),
    editing: false,
    _id: ''
  }

  async componentDidMount() {
    const res = await axios.get('http://localhost:4000/api/users/get-users');
    this.setState({
      users: res.data.map(user => user.username),
      userSelected: res.data[0].username
    });
    if(this.props.match.params.id) {
      const res = await axios.get('http://localhost:4000/api/notes/get-note/' + this.props.match.params.id);

      this.setState({
        title: res.data.title,
        content: res.data.content,
        date: new Date(res.data.date),
        author: res.data.content,
        editing: true,
        _id: this.props.match.params.id
      });
    }
  }

  handleOnSubmit = async e => {
    e.preventDefault();
    const newNote = {
      title: this.state.title,
      content: this.state.description,
      date: this.state.date,
      author: this.state.userSelected
    };
    if(this.state.editing) {
      await axios.put('http://localhost:4000/api/notes/update-note/' + this.state._id, newNote);
    } else {
      await axios.post('http://localhost:4000/api/notes/create-note', newNote);
    }
    window.location.href = '/';
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleOnChangeDate = date => {
    this.setState({date})
  }

  render(){
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">

          <h4>Create Note</h4>

          <form onSubmit={this.handleOnSubmit}>
            <div className="form-group">
              <select className="form-control" name="userSelected"
                      onChange={this.handleOnChange}>
                {
                  this.state.users.map(user =>
                  <option key={user} value={user}>
                    {user}
                  </option>)
                }
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" className="form-control" placeholder="Title" name="title"
                     onChange={this.handleOnChange} value={this.state.title} id="title" required />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea className="form-control" placeholder="Description" name="description"
                        onChange={this.handleOnChange}value={this.state.content} id="description" required ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <DatePicker className="form-control" selected={this.state.date}
                          onChange={this.handleOnChangeDate} id="date"/>
            </div>

            <button type="submit" className="btn btn-primary">Save</button>
          </form>

        </div>
      </div>
    )
  }
}
