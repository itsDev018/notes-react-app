import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component{

  state = {
    users: [],
    username: ''
  }

  async componentDidMount(){
    this.getUsers();
  }

  getUsers = async () => {
    const res = await axios.get('http://localhost:4000/api/users/get-users');
    this.setState({users: res.data});
  }

  handleOnChange = e => {
    this.setState({
      username: e.target.value
    });
  }

  handleOnSubmit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:4000/api/users/create-user', {username: this.state.username});
    this.getUsers();
    this.setState({username: ''});
  }

  deleteUser = async (id) => {
    await axios.delete('http://localhost:4000/api/users/delete-user/' + id);
    this.getUsers();
  }

  render(){
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h3>Create a new user</h3>
            <form onSubmit={this.handleOnSubmit}>
              <div className="form-group">
                <input type="text" className="form-control"
                       value={this.state.username}
                       onChange={this.handleOnChange} required/>
              </div>
              <button type="submit" className="form-control btn btn-primary">Save</button>
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <ul className="list-group">
            {
              this.state.users.map(user =>
                <li className="list-group-item list-group-item-action"
                    key={user._id}
                    onDoubleClick={() => this.deleteUser(user._id)}
                 >
                  {user.username}
                </li>)
            }
          </ul>
        </div>
      </div>
    )
  }
}
