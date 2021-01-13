
export default {
  chief: [
    {
      name: "河长1",
      gender: "男",
      level: "水利局局长",
      duty_river: "宝象河",
      tel: "18868886888"
    },
    {
      name: "河长2",
      gender: "男",
      level: "水利局局长",
      duty_river: "宝象河",
      tel: "18868886888"
    },
    {
      name: "河长3",
      gender: "男",
      level: "水利局局长",
      duty_river: "宝象河",
      tel: "18868886888"
    },
    {
      name: "河长4",
      gender: "男",
      level: "水利局局长",
      duty_river: "宝象河",
      tel: "18868886888"
    },
    {
      name: "河长5",
      gender: "男",
      level: "水利局局长",
      duty_river: "宝象河",
      tel: "18868886888"
    }
  ],
  patrol:[
    {
      name: "河长1",
      river_segment: "宝象河",
      patrol_river_distance: "30",
      patrol_time_total: "30",
      event_number: "3"
    },
    {
      name: "河长1",
      river_segment: "古城河",
      patrol_river_distance: "20",
      patrol_time_total: "40",
      event_number: "1"
    },
    {
      name: "河长1",
      river_segment: "白鱼河",
      patrol_river_distance: "15",
      patrol_time_total: "4",
      event_number: "0"
    }
  ],
  task: [
    {
      task_name: "河面上有漂浮物",
      segment: "宝象河",
      name: "河长3",
      task_state: "已办结",
      note: "需联系相关人员进行现场打捞"
    },
    {
      task_name: "河里有大量杂草",
      segment: "宝象河",
      name: "河长5",
      task_state: "办理中",
      note: "杂草待清理"
    }
  ]
};




const header_fileds1 = [
  {
    text: "河长姓名",
    value: "name"
  },
  {
    text: "性别",
    value: "gender"
  },
  {
    text: "行政级别",
    value: "level"
  },
  {
    text: "负责河流",
    value: "duty_river"
  },
  {
    text: "电话",
    value: "tel"
  }
];
const header_fileds2 = [
  {
    text: "巡河人",
    value: "name"
  },
  {
    text: "河段名称",
    value: "river_segment"
  },
  {
    text: "累积巡河里程",
    value: "patrol_river_distance"
  },
  {
    text: "巡河累积时长",
    value: "patrol_time_total"
  },
  {
    text: "上报问题数量",
    value: "event_number"
  }
];
const header_fileds3 = [
  {
    text: "任务名称",
    value: "task_name"
  },
  {
    text: "河段",
    value: "segment"
  },
  {
    text: "巡河人",
    value: "name"
  },
  {
    text: "任务处置状态",
    value: "task_state"
  },
  {
    text: "任务处置描述",
    value: "note"
  }
];