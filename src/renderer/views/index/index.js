import React, { Component } from 'react';
import { Input, Button } from 'antd';
import ListItem from './List';
import './index.less';

import { HandleTask } from './../../db/controller';

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

  async componentWillMount() {
    let list = await HandleTask.query();
    this.setState({list}); 
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
      list.unshift(val);
      HandleTask.add({title: val, time: new Date()});
      this.setState({ list, searchList: [] });
      this.refs.searchInput.input.input.value = '';
    }
  }
  handleRemove = index => {
    let { list } = this.state;
    HandleTask.delete(list[index]);
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
    return (
      <div className="index-cover">
        <h2>Electron简单列表</h2>
        <div>
          <Search
            ref="searchInput"
            placeholder="请输入任务"
            onChange={this.getValue}
            onSearch={this.handleSearch}
            onPressEnter={this.handleSearch}
          />
          <Button className="btn-add" type="primary" icon="plus" onClick={this.handleAdd} />
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
