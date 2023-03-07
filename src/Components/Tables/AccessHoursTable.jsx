import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function AccessHoursTable() {
  // const [totime, setTimeto] = useState();
  // const [tilltime, setTimetill] = useState();

  const date = new Date();
  const dateAsString = date.toString();
  const currentTimezone = dateAsString.match(/\(([^\)]+)\)$/)[1];
  const dispatch = useDispatch();
  const accesshourdata = useSelector((state) => state.AccessHoursLimit.accesshoursdata);
  // const [accesshour, setAccessHour] = useState(accesshourdata);
  const [TimeField, setTimeField] = useState('');

  function showTime(value, index, id, day) {
    console.log('Time Field value', value, 'Id is :', id, day);
    if (value != 'Restricted Hours') {
      setTimeField(TimeField.filter((item) => item != index));
    } else {
      setTimeField((olddata) => [...olddata, index]);
    }
  }

  // const [data123, setData123] = useState("");

  function dispatchData(index) {
    const accessh = accesshourdata.map((item, i) => {
      if (i === index) {
        return (item.AccType = 'noman');
      }
      item.map((it, is) => {
        console.log(it);
      });
      console.log(item.AccType);
      // index = state.findIndex((obj) => obj.id === action.payload.data.id);
      // return [
      //   ...state.slice(0, index),
      //   {
      //     ...state[index],
      //     id: action.payload.data.id,
      //     Day: action.payload.data.Day,
      //     //  age: action.payload.data.age
      //   },
      //   ...state.slice(index + 1),
      // ];
    });

    console.log('the data is', accessh);
  }

  return (
    <table className="table table-light table-hover table-striped table table-bordered caption-top px-0">
      <caption>{`All Times are displayed in ${currentTimezone}`}</caption>
      <thead>
        <tr>
          <th scope="col-md-2">Day</th>
          <th scope="col-md-2">Access Type</th>
          <th scope="col-md-2">Hours</th>
        </tr>
      </thead>
      <tbody className="table-group-divider px-0">
        {accesshourdata.map((items, i) => {
          return (
            <tr key={items.id}>
              <td scope="row">{items.Day}</td>
              <td>
                <select
                  // defaultValue={items[0].AccType}
                  className="form-select form-select-sm "
                  aria-label="Default select example"
                  onChange={(e) => {
                    showTime(e.target.value, i, items.id, items.Day);
                    // dispatchData("hello chai pelo", i);
                    dispatchData(i);
                  }}
                >
                  <option value="All Day">All Day</option>
                  <option value="Restricted Hours">Restricted Hours</option>
                  <option value="No Access">No Access</option>
                </select>
              </td>
              <td>
                {/* {items.Hours} */}
                {TimeField.includes(i) ? (
                  <div className={`col-md-12 d-flex px-0 col-sm-6`}>
                    <input
                      type="time"
                      id="timeto"
                      name="timeto"
                      className=" form-control-sm form-control"
                      onChange={(e) => dispatch(GettoTime(e.target.value))}
                    />
                    &nbsp;<b className="mt-2">to</b>&nbsp;{' '}
                    <input
                      type="time"
                      id="timetill"
                      name="timetill"
                      className="form-control form-control-sm"
                      onChange={(e) => dispatch(GettillTime(e.target.value))}
                    />
                  </div>
                ) : (
                  ''
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
