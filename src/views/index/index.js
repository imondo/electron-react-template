import React, { Component } from 'react';
import { Input, Button } from 'antd';
import ListItem from './List';
import './index.less';

const Search = Input.Search;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      val: '',
      list: [],
      searchList: []
    }
  }
  getValue = (e) => {
    this.setState({ val: e.target.value });
  }  
  handleSearch = value => {
    if (value) {
      let { list } = this.state;
      let data = list.filter(v => v.includes(value));
      this.setState({ searchList: data });
    } else {
      this.setState({ searchList: [] });
    }
  }  
  handleAdd = () => {
    let { val } = this.state;
    if (val) {
      let { list } = this.state;
      this.setState({ list });
      this.refs.searchInput.input.input.value = '';
    }
  }
  handleRemove = index => {
    let { list } = this.state;
    list.splice(index, 1);
    this.setState({ list });
  }
  handleEdit = data => {
    let list = data.reduce((arr, v) => {
      arr.push(v.val);
      return arr;
    }, []);
    this.setState({ list });
  }
  render() {
    let { list, searchList } = this.state;
    let data = searchList.length ? searchList : list;
    console.log(data);
    return (
      <div className="index-cover">
        <h3>electron简单任务列表</h3>
        <div>
          <Search
            ref="searchInput"
            placeholder="请输入任务"
            onChange={this.getValue}
            onSearch={this.handleSearch}
          />
          <Button className="btn-add" type="primary" onClick={this.handleAdd}>新建</Button>
        </div>
        <ListItem 
          data={ data } 
          handleRemove={this.handleRemove.bind(this)}
          handleEdit={this.handleEdit.bind(this)} />
      </div>
    );
  }
}

export default App;
