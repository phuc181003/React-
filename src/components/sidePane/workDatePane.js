import React, { Component } from 'react'
import { DateInput } from 'semantic-ui-calendar-react'
import { connect } from 'react-redux'
import { setWorkDate, setWorkDateData } from '../../redux/workDates/workDateAction'
import firebase from '..//../firebase'
class WorkDatePane extends Component {
    state = {
        workDatesRef: firebase.database().ref('workdates'),
    }
    componentDidMount() {
        // Tạo một đối tượng Date đại diện cho thời điểm hiện tại
        const now = new Date();

        // Lấy ngày trong tháng và tháng hiện tại
        const dayOfMonth = now.getDate(); // Lấy ngày trong tháng (1-31)
        const month = now.getMonth() + 1; // Lấy tháng (0-11), cộng thêm 1 để chuyển sang tháng thực tế (1-12)

        // Định dạng lại ngày và tháng để luôn có 2 chữ số
        const formattedDay = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
        const formattedMonth = month < 10 ? '0' + month : month;

        // Lấy năm hiện tại
        const year = now.getFullYear();

        // Tạo chuỗi ngày tháng năm trong định dạng "dd-mm-yyyy"
        const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;

        // Gọi hàm xử lý sự kiện thay đổi ngày làm việc với giá trị ngày hiện tại
        this.handleWorkDateChange(null, { name: '', value: formattedDate });
    }
    handleWorkDateChange = (event, { name, value }) => {
        // để cập nhật ngày làm việc trong Redux store.
        this.props.setWorkDate(value);
        this.state.workDatesRef
            // sắp xếp kết quả truy vấn dựa trên giá trị của nút con có tên là 'date' trong mỗi đối tượng.
            .orderByChild('date')
            // để chỉ định rằng bạn muốn tìm các đối tượng có giá trị của nút con 'date' bằng với giá trị value được truyền vào hàm.
            .equalTo(value)
            // phương thức once để thực hiện truy vấn một lần duy nhất và trả về một snapshot của kết quả truy vấn
            .once('value')
            .then((snapshot) => {
                if (snapshot.val()) {
                    const data = snapshot.val();
                    const key = Object.keys(data)[0];
                    this.props.setWorkDateData(data[key])
                } else {
                    this.props.setWorkDateData(null)
                }
            })
        console.log(value);
    }
    render() {
        return (
            <DateInput name="date" inline placeholder='date'
                value={this.props.workDate} onChange={this.handleWorkDateChange}>
            </DateInput>
        )
    }
}


const mapStateToProps = ({ workDates: { workDate } }) => ({
    workDate: workDate
})

const mapDispatchToProps = (dispatch) => ({
    setWorkDate: (workDate) => dispatch(setWorkDate(workDate)),
    setWorkDateData: (data) => dispatch(setWorkDateData(data))

})

export default connect(mapStateToProps, mapDispatchToProps)(WorkDatePane)