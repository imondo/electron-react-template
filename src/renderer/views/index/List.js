import React, { Component } from 'react';
import { List, Icon, Input } from 'antd';

import { HandleTask } from './../../db/controller';

class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      editList: {}
    };
  }
  deleteItem = index => {
    this.props.handleRemove(index);
  }
  editItem = index => {
    let { dataSource } = this.state;
    let data = dataSource.map((v, i) => {
      if (i === index) {
        v.isEdit = true;
      }
      return v;
    });
    this.setState({dataSource: data});
  }
  setEditValue = e => {
    let { value, dataset: { index } } = e.target;
    let { editList } = this.state;
    editList[index] = value;
    this.setState({editList});
  }
  saveItem = index => {
    let { dataSource, editList } = this.state;
    let data = dataSource.map((v, i) => {
      if (i === Number(index)) {
        v.isEdit = false;
        v.val = editList[index];
        delete editList[index];
      }
      return v;
    });
    this.setState({ editList });
    this.props.handleEdit(data);
  }
  componentWillReceiveProps(nextProps) {
    let { data } = nextProps;
    let dataSource = data.map(v => {
      let obj = {
        val: v,
        isEdit: false
      }
      return obj;
    });
    this.setState({ dataSource });
  }
  render() {
    let { dataSource } = this.state;

    return (      
      <List
        className="list-cover"
        dataSource={dataSource}
        renderItem={(item, index) => {
          const actions = [
            <Icon type="edit" theme="outlined"  onClick={this.editItem.bind(this, index)}/>,
            <Icon type="delete" theme="outlined" onClick={this.deleteItem.bind(this, index)}/>
          ];

          const saveActions = [
            <Icon type="check" theme="outlined" onClick={this.saveItem.bind(this, index)}/>,
            <Icon type="delete" theme="outlined" onClick={this.deleteItem.bind(this, index)}/>
          ];

          if (item.isEdit) {
            return (
              <List.Item actions = {saveActions}>
                <Input 
                  type="text" 
                  defaultValue={item.val} 
                  data-index={index} 
                  onChange={this.setEditValue}/>
              </List.Item>
            );
          } else {
            return <List.Item actions = {actions}>{item.val}</List.Item>;
          }
          
        }}
      />
    );
  }
} 

export default ListItem;