import { Task } from './models';
import { showErrMsg } from './../../main/messages';

export const HandleTask =  {
  query: () => {
    return new Promise((resolve, reject) => {
      Task.find((err, data) => {
        if (err) {
          showErrMsg(err);
          return;
        }
        let list = data.reduce((arr, v) => {
          let { id, title, time } = v;
          arr.push(title);
          return arr;
        }, []);
        resolve(list);
      })
    })    
  },
  add: (val) => {
    const task = new Task(val);
    task.save((err) => {
      if (err) {
        showErrMsg(err);
        return;
      }
      console.log('保存成功！');
      showErrMsg('保存成功！');
    })
  },
  delete: (val) => {
    Task.remove({title: val}, err => {
      if (err) {
        showErrMsg(err);
        return;
      }
      console.log('remove!');
    });
  }
}