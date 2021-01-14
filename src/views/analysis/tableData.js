header_fileds : [
    {
        text: "河长",
        value: "name"
    },
    {
      text: "应巡次数",
      value: "must_patrol_number"
    },
    {
      text: "巡河总次数",
      value: "patrol_total_number"
    },
    {
        text: "巡河完成率",
        value: "patrol_complete_rate"
    },
    {
      text: "已办任务数",
      value: "done_task_number"
    },
    {
      text: "待办任务处置数",
      value: "todo_task_number"
    },
    {
      text: "任务处理完成率",
      value: "task_complete_rate"
    },
    {
      text: "累积巡河里程(km)",
      value: "patrol_river_distance"
    },
    {
      text: "巡河累积时长(小时)",
      value: "patrol_time_total"
    },
    {
      text: "上报问题数量",
      value: "event_number"
    }
  ]
export default [
    {
        name: "河长1",
        must_patrol_number: 100,
        patrol_total_number: 120,
        patrol_complete_rate: "120%",
        done_task_number: 50,
        todo_task_number: 10,
        task_complete_rate: "80%",
        patrol_river_distance: 200,
        patrol_time_total: 100,
        event_number: 30
    },
    {
        name: "河长2",
        must_patrol_number: 100,
        patrol_total_number: 80,
        patrol_complete_rate: "80%",
        done_task_number: 40,
        todo_task_number: 40,
        task_complete_rate: "50%",
        patrol_river_distance: 300,
        patrol_time_total: 120,
        event_number: 20
    },
    {
        name: "河长3",
        must_patrol_number: 100,
        patrol_total_number: 50,
        patrol_complete_rate: "50%",
        done_task_number: 70,
        todo_task_number: 30,
        task_complete_rate: "70%",
        patrol_river_distance: 400,
        patrol_time_total: 200,
        event_number: 5
    },
    {
        name: "河长4",
        must_patrol_number: 100,
        patrol_total_number: 90,
        patrol_complete_rate: "90%",
        done_task_number: 30,
        todo_task_number: 10,
        task_complete_rate: "75%",
        patrol_river_distance: 100,
        patrol_time_total: 60,
        event_number: 15
    }
];